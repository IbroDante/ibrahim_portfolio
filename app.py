from __future__ import annotations

import os
import threading
import time
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, send_from_directory

from brevo_service import (
    BrevoConfigError,
    BrevoDeliveryError,
    ContactValidationError,
    get_brevo_settings,
    send_contact_email,
    validate_contact_payload,
)

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
STATIC_IMAGES_DIR = BASE_DIR / "static" / "images"
REACT_BUILD_DIR = BASE_DIR / "frontend" / "dist"
CV_FILENAME = "IBRAHIM-BALOGUN_myON.pdf"

RATE_LIMIT_WINDOW_SECONDS = 600
RATE_LIMIT_MAX_REQUESTS = 5


class InMemoryRateLimiter:
    def __init__(self, max_requests: int = RATE_LIMIT_MAX_REQUESTS, window_seconds: int = RATE_LIMIT_WINDOW_SECONDS) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, list[float]] = defaultdict(list)
        self._lock = threading.Lock()

    def is_allowed(self, key: str) -> bool:
        now = time.monotonic()
        cutoff = now - self.window_seconds
        with self._lock:
            recent = [ts for ts in self._hits[key] if ts > cutoff]
            if len(recent) >= self.max_requests:
                self._hits[key] = recent
                return False
            recent.append(now)
            self._hits[key] = recent
            return True

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()


def create_app() -> Flask:
    # Pure API + React bundle host: no Jinja template folder or HTML templates
    app = Flask(__name__, static_folder=None, template_folder=None)
    app.config["DISABLE_RATE_LIMIT"] = False
    rate_limiter = InMemoryRateLimiter()
    app.extensions["contact_rate_limiter"] = rate_limiter

    def _client_ip() -> str:
        forwarded_for = request.headers.get("X-Forwarded-For", "")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        return request.remote_addr or "unknown"

    @app.after_request
    def add_api_cors_headers(response: Response) -> Response:
        if request.path.startswith("/api/"):
            allowed_origins = os.getenv("CORS_ORIGINS", "*")
            response.headers["Access-Control-Allow-Origin"] = allowed_origins
            response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

    def _serve_react_app() -> Response | tuple[Response, int]:
        index_path = REACT_BUILD_DIR / "index.html"
        if index_path.exists():
            return send_from_directory(str(REACT_BUILD_DIR), "index.html")
        return (
            jsonify(
                {
                    "ok": False,
                    "error": "React bundle not built yet. Run: npm --prefix frontend install && npm --prefix frontend run build",
                }
            ),
            503,
        )

    @app.get("/api/health")
    def health() -> Response:
        settings = get_brevo_settings()
        return jsonify(
            {
                "ok": True,
                "service": "ibrahim-portfolio-api",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "frontend_built": (REACT_BUILD_DIR / "index.html").exists(),
                "brevo": {
                    "configured": settings.is_configured,
                    "sender_email": settings.sender_email,
                    "recipient_email": settings.recipient_email,
                },
            }
        )

    @app.get("/api/contact/status")
    def contact_status() -> Response:
        settings = get_brevo_settings()
        return jsonify(
            {
                "ok": True,
                "configured": settings.is_configured,
                "sender_email": settings.sender_email,
                "recipient_email": settings.recipient_email,
            }
        )

    @app.route("/api/contact", methods=["OPTIONS"])
    def contact_options() -> tuple[str, int]:
        return "", 204

    @app.post("/api/contact")
    def submit_contact() -> tuple[Response, int]:
        if not app.config.get("DISABLE_RATE_LIMIT", False):
            if not rate_limiter.is_allowed(_client_ip()):
                return (
                    jsonify(
                        {
                            "ok": False,
                            "code": "RATE_LIMITED",
                            "error": "Too many messages sent in a short period. Please wait a few minutes and try again.",
                        }
                    ),
                    429,
                )

        payload = request.get_json(silent=True)
        try:
            submission = validate_contact_payload(payload)
            settings = get_brevo_settings()
            result = send_contact_email(submission, settings=settings)
        except ContactValidationError as exc:
            return (
                jsonify(
                    {
                        "ok": False,
                        "code": exc.code,
                        "field": exc.field,
                        "error": exc.message,
                    }
                ),
                400,
            )
        except BrevoConfigError as exc:
            settings = get_brevo_settings()
            return (
                jsonify(
                    {
                        "ok": False,
                        "code": exc.code,
                        "error": exc.message,
                        "recipient_email": settings.recipient_email,
                        "sender_email": settings.sender_email,
                    }
                ),
                503,
            )
        except BrevoDeliveryError as exc:
            return (
                jsonify(
                    {
                        "ok": False,
                        "code": exc.code,
                        "error": exc.message,
                    }
                ),
                exc.status_code,
            )

        return (
            jsonify(
                {
                    "ok": True,
                    "message": f"Thank you, {submission.name}! Your message has been delivered to {result['delivered_to']}.",
                    "message_id": result["message_id"],
                    "delivered_to": result["delivered_to"],
                    "sent_via": result["sent_via"],
                }
            ),
            200,
        )

    @app.route("/api/<path:_subpath>", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
    def api_not_found(_subpath: str) -> tuple[Response, int]:
        return jsonify({"ok": False, "code": "NOT_FOUND", "error": "API endpoint not found."}), 404

    @app.get("/cv")
    @app.get("/resume")
    def download_cv() -> Response:
        as_attachment = request.args.get("download") == "1"
        return send_from_directory(
            str(STATIC_IMAGES_DIR),
            CV_FILENAME,
            as_attachment=as_attachment,
            download_name="Ibrahim-Balogun-CV.pdf",
            mimetype="application/pdf",
        )

    @app.get("/static/images/<path:filename>")
    def legacy_images(filename: str) -> Response:
        return send_from_directory(str(STATIC_IMAGES_DIR), filename)

    @app.get("/")
    def root() -> Response | tuple[Response, int]:
        return _serve_react_app()

    @app.get("/<path:path>")
    def spa_or_bundle_asset(path: str) -> Response | tuple[Response, int]:
        bundle_root = REACT_BUILD_DIR.resolve()
        candidate = (bundle_root / path).resolve()
        if candidate.is_file() and bundle_root in candidate.parents:
            return send_from_directory(str(bundle_root), path)
        return _serve_react_app()

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    debug = os.getenv("FLASK_ENV") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
