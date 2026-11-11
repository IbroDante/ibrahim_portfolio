from __future__ import annotations

from unittest.mock import MagicMock, patch

import pytest
import requests

from app import create_app
from brevo_service import build_brevo_payload, get_brevo_settings, validate_contact_payload


@pytest.fixture
def client(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("BREVO_API_KEY", "xkeysib-test-secret-key")
    monkeypatch.setenv("BREVO_SENDER_EMAIL", "mololuwa.ibrahim@gmail.com")
    monkeypatch.setenv("CONTACT_RECIPIENT_EMAIL", "ibroman02@yahoo.com")

    flask_app = create_app()
    flask_app.config["TESTING"] = True
    flask_app.config["DISABLE_RATE_LIMIT"] = True
    with flask_app.test_client() as test_client:
        yield test_client, flask_app


def test_health_endpoint_does_not_leak_api_key(client):
    test_client, _ = client
    resp = test_client.get("/api/health")
    assert resp.status_code == 200
    body = resp.get_json()
    assert body["ok"] is True
    assert body["brevo"]["configured"] is True
    assert body["brevo"]["sender_email"] == "mololuwa.ibrahim@gmail.com"
    assert body["brevo"]["recipient_email"] == "ibroman02@yahoo.com"
    assert "xkeysib-test-secret-key" not in resp.get_data(as_text=True)


def test_contact_status_reflects_missing_key(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.delenv("BREVO_API_KEY", raising=False)
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    with flask_app.test_client() as test_client:
        resp = test_client.get("/api/contact/status")
        assert resp.status_code == 200
        data = resp.get_json()
        assert data["configured"] is False
        assert data["sender_email"] == "mololuwa.ibrahim@gmail.com"
        assert data["recipient_email"] == "ibroman02@yahoo.com"


def test_build_brevo_payload_routes_sender_and_recipient_correctly(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("BREVO_API_KEY", "xkeysib-test")
    monkeypatch.setenv("BREVO_SENDER_EMAIL", "mololuwa.ibrahim@gmail.com")
    monkeypatch.setenv("CONTACT_RECIPIENT_EMAIL", "ibroman02@yahoo.com")

    submission = validate_contact_payload(
        {
            "name": "Ada Lovelace",
            "email": "ada@example.com",
            "phone": "+234 800 000 0000",
            "subject": "Web App Build",
            "message": "Hello <script>alert(1)</script> Ibrahim, let's build a Flask & React platform.",
        }
    )
    settings = get_brevo_settings()
    payload = build_brevo_payload(submission, settings)

    assert payload["sender"]["email"] == "mololuwa.ibrahim@gmail.com"
    assert payload["to"] == [{"email": "ibroman02@yahoo.com", "name": "Ibrahim Balogun"}]
    assert payload["replyTo"] == {"email": "ada@example.com", "name": "Ada Lovelace"}
    assert "&lt;script&gt;alert(1)&lt;/script&gt;" in payload["htmlContent"]
    assert "<script>" not in payload["htmlContent"]


def test_contact_submit_success_calls_brevo_api(client):
    test_client, _ = client
    mock_response = MagicMock()
    mock_response.status_code = 201
    mock_response.content = b'{"messageId":"<msg-123@brevo.com>"}'
    mock_response.json.return_value = {"messageId": "<msg-123@brevo.com>"}

    with patch("brevo_service.requests.post", return_value=mock_response) as mock_post:
        resp = test_client.post(
            "/api/contact",
            json={
                "name": "Chidi Okonkwo",
                "email": "chidi@company.ng",
                "phone": "+2348012345678",
                "subject": "Full-Stack Consulting",
                "message": "Hi Ibrahim, we need a Flask and React system for our organization.",
                "website": "",
            },
        )

    assert resp.status_code == 200
    body = resp.get_json()
    assert body["ok"] is True
    assert body["message_id"] == "<msg-123@brevo.com>"
    assert body["delivered_to"] == "ibroman02@yahoo.com"
    assert body["sent_via"] == "mololuwa.ibrahim@gmail.com"

    mock_post.assert_called_once()
    call_kwargs = mock_post.call_args.kwargs
    assert call_kwargs["headers"]["api-key"] == "xkeysib-test-secret-key"
    assert call_kwargs["json"]["sender"]["email"] == "mololuwa.ibrahim@gmail.com"
    assert call_kwargs["json"]["to"][0]["email"] == "ibroman02@yahoo.com"
    assert call_kwargs["json"]["replyTo"]["email"] == "chidi@company.ng"


def test_contact_validation_errors(client):
    test_client, _ = client
    resp = test_client.post(
        "/api/contact",
        json={"name": "A", "email": "not-an-email", "message": "short"},
    )
    assert resp.status_code == 400
    assert resp.get_json()["ok"] is False


def test_contact_honeypot_blocks_spam(client):
    test_client, _ = client
    with patch("brevo_service.requests.post") as mock_post:
        resp = test_client.post(
            "/api/contact",
            json={
                "name": "Spam Bot",
                "email": "bot@spam.example",
                "message": "Buy cheap backlinks right now please!",
                "website": "https://spam.example",
            },
        )
    assert resp.status_code == 400
    assert resp.get_json()["code"] == "SPAM_DETECTED"
    mock_post.assert_not_called()


def test_contact_missing_brevo_key_returns_503(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.delenv("BREVO_API_KEY", raising=False)
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    flask_app.config["DISABLE_RATE_LIMIT"] = True

    with flask_app.test_client() as test_client:
        resp = test_client.post(
            "/api/contact",
            json={
                "name": "Tunde Bakare",
                "email": "tunde@example.com",
                "message": "Interested in collaborating on a Python web platform.",
            },
        )
    assert resp.status_code == 503
    body = resp.get_json()
    assert body["ok"] is False
    assert body["code"] == "BREVO_NOT_CONFIGURED"
    assert body["recipient_email"] == "ibroman02@yahoo.com"


def test_contact_brevo_network_error_returns_502(client):
    test_client, _ = client
    with patch("brevo_service.requests.post", side_effect=requests.ConnectionError("boom")):
        resp = test_client.post(
            "/api/contact",
            json={
                "name": "Zainab Musa",
                "email": "zainab@example.com",
                "message": "Hello Ibrahim, checking your availability for an API integration.",
            },
        )
    assert resp.status_code == 502
    assert resp.get_json()["code"] == "BREVO_NETWORK_ERROR"


def test_contact_rate_limiting(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("BREVO_API_KEY", "xkeysib-test-secret-key")
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    flask_app.config["DISABLE_RATE_LIMIT"] = False
    flask_app.extensions["contact_rate_limiter"].reset()

    mock_response = MagicMock()
    mock_response.status_code = 201
    mock_response.content = b'{"messageId":"<msg-ok>"}'
    mock_response.json.return_value = {"messageId": "<msg-ok>"}

    payload = {
        "name": "Test User",
        "email": "user@example.com",
        "message": "Testing rate limiting behavior cleanly across calls.",
    }
    with flask_app.test_client() as test_client, patch("brevo_service.requests.post", return_value=mock_response):
        for _ in range(5):
            r = test_client.post("/api/contact", json=payload)
            assert r.status_code == 200
        blocked = test_client.post("/api/contact", json=payload)
        assert blocked.status_code == 429
        assert blocked.get_json()["code"] == "RATE_LIMITED"


def test_cv_route_serves_pdf(client):
    test_client, _ = client
    resp = test_client.get("/cv")
    assert resp.status_code == 200
    assert resp.mimetype == "application/pdf"
    assert resp.data.startswith(b"%PDF")


def test_unknown_api_route_returns_json_404(client):
    test_client, _ = client
    resp = test_client.get("/api/nonexistent")
    assert resp.status_code == 404
    assert resp.get_json()["ok"] is False


def test_spa_and_built_assets_served_by_flask(client):
    import re

    test_client, _ = client
    for path in ("/", "/index.html", "/contact.html", "/about.html"):
        resp = test_client.get(path)
        assert resp.status_code == 200
        html = resp.get_data(as_text=True)
        assert '<div id="root"></div>' in html

    home_html = test_client.get("/").get_data(as_text=True)
    asset_urls = re.findall(r'(/assets/[^"\']+)', home_html)
    assert len(asset_urls) >= 2
    for url in asset_urls:
        asset_resp = test_client.get(url)
        assert asset_resp.status_code == 200

    cv_resp = test_client.get("/Ibrahim-Balogun-CV.pdf")
    assert cv_resp.status_code == 200
    assert cv_resp.data.startswith(b"%PDF")


def test_bundled_images_are_served(client):
    """Portfolio images live at stable /images/* URLs inside the React build."""
    test_client, _ = client

    for name in (
        "mypix.jpg",
        "pix.png",
        "insaaf.png",
        "intime.png",
        "edupix.png",
        "help.jpeg",
        "office.jpeg",
        "taxi.png",
        "osun.jpeg",
    ):
        resp = test_client.get(f"/images/{name}")
        assert resp.status_code == 200, f"missing bundled image: {name}"
        assert len(resp.data) > 1000


def test_runtime_config_is_served(client):
    """The static-site build must be able to discover the Flask API at runtime."""
    test_client, _ = client
    resp = test_client.get("/config.js")
    assert resp.status_code == 200
    body = resp.get_data(as_text=True)
    assert "__PORTFOLIO_CONFIG__" in body
    assert "apiBaseUrl" in body


def test_api_cors_headers_present(client):
    test_client, _ = client
    resp = test_client.get("/api/health", headers={"Origin": "https://example.com"})
    assert resp.status_code == 200
    assert resp.headers.get("Access-Control-Allow-Origin") is not None
    assert "POST" in resp.headers.get("Access-Control-Allow-Methods", "")


def test_contact_options_preflight(client):
    test_client, _ = client
    resp = test_client.options(
        "/api/contact",
        headers={
            "Origin": "https://ibrahimportfolio-v0bt.onrender.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )
    assert resp.status_code in (200, 204)
    assert resp.headers.get("Access-Control-Allow-Origin") is not None
    assert "Content-Type" in resp.headers.get("Access-Control-Allow-Headers", "")


