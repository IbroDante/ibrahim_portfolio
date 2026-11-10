from __future__ import annotations

import html
import os
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any

import requests

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"
DEFAULT_SENDER_EMAIL = "mololuwa.ibrahim@gmail.com"
DEFAULT_SENDER_NAME = "Ibrahim Balogun Portfolio"
DEFAULT_RECIPIENT_EMAIL = "ibroman02@yahoo.com"
DEFAULT_RECIPIENT_NAME = "Ibrahim Balogun"

EMAIL_REGEX = re.compile(r"^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$")
HEADER_BREAK_REGEX = re.compile(r"[\r\n]+")


class ContactValidationError(ValueError):
    """Raised when contact form input fails validation."""

    def __init__(self, message: str, field: str | None = None, code: str = "VALIDATION_ERROR") -> None:
        super().__init__(message)
        self.message = message
        self.field = field
        self.code = code


class BrevoConfigError(RuntimeError):
    """Raised when Brevo API credentials or sender/recipient settings are missing."""

    def __init__(self, message: str, code: str = "BREVO_NOT_CONFIGURED") -> None:
        super().__init__(message)
        self.message = message
        self.code = code


class BrevoDeliveryError(RuntimeError):
    """Raised when Brevo rejects or fails to process a transactional email request."""

    def __init__(self, message: str, status_code: int = 502, code: str = "BREVO_DELIVERY_FAILED") -> None:
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.code = code


@dataclass(frozen=True)
class BrevoSettings:
    api_key: str
    sender_email: str
    sender_name: str
    recipient_email: str
    recipient_name: str
    api_url: str = BREVO_API_URL

    @property
    def is_configured(self) -> bool:
        return bool(self.api_key and self.api_key != "your_brevo_v3_api_key_here")


@dataclass(frozen=True)
class ContactSubmission:
    name: str
    email: str
    phone: str
    subject: str
    message: str


def get_brevo_settings() -> BrevoSettings:
    return BrevoSettings(
        api_key=os.getenv("BREVO_API_KEY", "").strip(),
        sender_email=os.getenv("BREVO_SENDER_EMAIL", DEFAULT_SENDER_EMAIL).strip() or DEFAULT_SENDER_EMAIL,
        sender_name=os.getenv("BREVO_SENDER_NAME", DEFAULT_SENDER_NAME).strip() or DEFAULT_SENDER_NAME,
        recipient_email=os.getenv("CONTACT_RECIPIENT_EMAIL", DEFAULT_RECIPIENT_EMAIL).strip() or DEFAULT_RECIPIENT_EMAIL,
        recipient_name=os.getenv("CONTACT_RECIPIENT_NAME", DEFAULT_RECIPIENT_NAME).strip() or DEFAULT_RECIPIENT_NAME,
        api_url=os.getenv("BREVO_API_URL", BREVO_API_URL).strip() or BREVO_API_URL,
    )


def _clean_single_line(value: Any) -> str:
    if value is None:
        return ""
    return HEADER_BREAK_REGEX.sub(" ", str(value)).strip()


def validate_contact_payload(data: Any) -> ContactSubmission:
    if not isinstance(data, dict):
        raise ContactValidationError("Invalid request body. Expected JSON object.")

    honeypot = _clean_single_line(data.get("website", ""))
    if honeypot:
        raise ContactValidationError("Automated spam submission blocked.", field="website", code="SPAM_DETECTED")

    name = _clean_single_line(data.get("name", ""))
    email = _clean_single_line(data.get("email", "")).lower()
    phone = _clean_single_line(data.get("phone", ""))
    subject = _clean_single_line(data.get("subject", "")) or "Portfolio Contact Inquiry"
    raw_message = data.get("message", "")
    message = str(raw_message).strip() if raw_message is not None else ""

    if len(name) < 2:
        raise ContactValidationError("Please enter your full name (at least 2 characters).", field="name")
    if len(name) > 120:
        raise ContactValidationError("Name must be 120 characters or fewer.", field="name")

    if not email or not EMAIL_REGEX.match(email) or len(email) > 254:
        raise ContactValidationError("Please provide a valid email address.", field="email")

    if phone and len(phone) > 40:
        raise ContactValidationError("Phone number must be 40 characters or fewer.", field="phone")

    if len(subject) > 150:
        raise ContactValidationError("Subject must be 150 characters or fewer.", field="subject")

    if len(message) < 10:
        raise ContactValidationError("Please write a message (at least 10 characters).", field="message")
    if len(message) > 5000:
        raise ContactValidationError("Message must be 5,000 characters or fewer.", field="message")

    return ContactSubmission(
        name=name,
        email=email,
        phone=phone,
        subject=subject,
        message=message,
    )


def build_brevo_payload(submission: ContactSubmission, settings: BrevoSettings) -> dict[str, Any]:
    submitted_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    escaped_name = html.escape(submission.name)
    escaped_email = html.escape(submission.email)
    escaped_phone = html.escape(submission.phone) if submission.phone else "Not provided"
    escaped_subject = html.escape(submission.subject)
    escaped_message = html.escape(submission.message).replace("\n", "<br />")

    html_content = f"""<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background-color:#0b1120;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background-color:#111827;border:1px solid #1f2937;border-radius:14px;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 100%);border-bottom:1px solid #334155;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f59e0b;font-weight:700;">
            Ibrahim Balogun Portfolio &middot; New Contact Message
          </p>
          <h1 style="margin:0;font-size:20px;line-height:1.35;color:#f8fafc;">
            {escaped_subject}
          </h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0;width:130px;font-size:13px;color:#94a3b8;vertical-align:top;">From</td>
              <td style="padding:8px 0;font-size:14px;color:#f8fafc;font-weight:600;">{escaped_name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#94a3b8;vertical-align:top;">Reply-To Email</td>
              <td style="padding:8px 0;font-size:14px;"><a href="mailto:{escaped_email}" style="color:#fbbf24;text-decoration:none;">{escaped_email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#94a3b8;vertical-align:top;">Phone</td>
              <td style="padding:8px 0;font-size:14px;color:#e2e8f0;">{escaped_phone}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:13px;color:#94a3b8;vertical-align:top;">Submitted</td>
              <td style="padding:8px 0;font-size:13px;color:#cbd5e1;">{submitted_at}</td>
            </tr>
          </table>

          <div style="padding:18px;background-color:#0f172a;border:1px solid #1e293b;border-radius:10px;">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">Message</p>
            <p style="margin:0;font-size:15px;line-height:1.65;color:#f1f5f9;">{escaped_message}</p>
          </div>

          <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#64748b;">
            Sent via Brevo API ({html.escape(settings.sender_email)}) directly to {html.escape(settings.recipient_email)}. Hit Reply to respond directly to {escaped_name}.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>"""

    text_content = (
        f"New Portfolio Contact Inquiry\n"
        f"=============================\n"
        f"Subject: {submission.subject}\n"
        f"Name: {submission.name}\n"
        f"Email: {submission.email}\n"
        f"Phone: {submission.phone or 'Not provided'}\n"
        f"Submitted: {submitted_at}\n\n"
        f"Message:\n{submission.message}\n\n"
        f"---\n"
        f"Sent via Brevo ({settings.sender_email}) to {settings.recipient_email}.\n"
    )

    return {
        "sender": {
            "name": settings.sender_name,
            "email": settings.sender_email,
        },
        "to": [
            {
                "email": settings.recipient_email,
                "name": settings.recipient_name,
            }
        ],
        "replyTo": {
            "email": submission.email,
            "name": submission.name,
        },
        "subject": f"[Portfolio] {submission.subject} — {submission.name}",
        "htmlContent": html_content,
        "textContent": text_content,
        "tags": ["portfolio-contact"],
    }


def send_contact_email(submission: ContactSubmission, settings: BrevoSettings | None = None) -> dict[str, Any]:
    active_settings = settings or get_brevo_settings()

    if not active_settings.is_configured:
        raise BrevoConfigError(
            "Brevo API key is not configured on the server yet. "
            "Set BREVO_API_KEY in your .env file or deployment environment variables "
            f"to enable live delivery to {active_settings.recipient_email}."
        )

    payload = build_brevo_payload(submission, active_settings)
    headers = {
        "accept": "application/json",
        "api-key": active_settings.api_key,
        "content-type": "application/json",
    }

    try:
        response = requests.post(active_settings.api_url, json=payload, headers=headers, timeout=15)
    except requests.Timeout as exc:
        raise BrevoDeliveryError("Brevo email service timed out. Please try again shortly.", status_code=504, code="BREVO_TIMEOUT") from exc
    except requests.RequestException as exc:
        raise BrevoDeliveryError("Unable to reach Brevo email service right now.", status_code=502, code="BREVO_NETWORK_ERROR") from exc

    if 200 <= response.status_code < 300:
        data = response.json() if response.content else {}
        return {
            "message_id": data.get("messageId", ""),
            "delivered_to": active_settings.recipient_email,
            "sent_via": active_settings.sender_email,
        }

    error_detail = ""
    try:
        err_json = response.json()
        error_detail = err_json.get("message") or err_json.get("code") or ""
    except ValueError:
        error_detail = ""

    if response.status_code in (401, 403):
        raise BrevoDeliveryError(
            "Brevo authentication failed or sender email is not authorized. Please verify BREVO_API_KEY and verified sender in Brevo.",
            status_code=502,
            code="BREVO_AUTH_ERROR",
        )

    raise BrevoDeliveryError(
        f"Brevo rejected the email request{f': {error_detail}' if error_detail else '.'}",
        status_code=502,
        code="BREVO_API_ERROR",
    )
