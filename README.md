# Ibrahim Balogun — Developer Portfolio (React + Flask + Brevo API)

Modern, dark-first full-stack developer portfolio built with **React**, **Tailwind CSS**, **Flask**, and the **Brevo Transactional Email API**.

## Architecture

- **Frontend (`frontend/`)**: 100% React SPA (React 19 + Vite + Tailwind CSS v4 + Lucide Icons) with zero HTML/Jinja templates. All portfolio images (`frontend/src/assets/`) and CV PDF (`frontend/public/Ibrahim-Balogun-CV.pdf`) are bundled directly into `frontend/dist/`.
- **Backend (`app.py`, `brevo_service.py`)**: Pure Flask JSON API + static React bundle host serving `frontend/dist/` at `/`, PDF resume at `/cv`, health/status endpoints (`/api/health`, `/api/contact/status`), and `POST /api/contact` powered by Brevo v3 (`https://api.brevo.com/v3/smtp/email`).

## How the Brevo Email Workflow Works

When a visitor submits the contact form:
1. Flask validates, sanitizes, rate-limits (5 requests / 10 min per IP), and checks the honeypot field.
2. Flask sends a `POST` request to `https://api.brevo.com/v3/smtp/email` using your `BREVO_API_KEY`:
   - **`sender`**: `mololuwa.ibrahim@gmail.com` (`BREVO_SENDER_EMAIL` — your verified sender email attached to Brevo)
   - **`to`**: `ibroman02@yahoo.com` (`CONTACT_RECIPIENT_EMAIL` — the website contact email where submissions go directly)
   - **`replyTo`**: set to the visitor's submitted email and name, so replying in Yahoo Mail goes straight back to the sender.

## Local Development

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and add your Brevo API v3 key:

```bash
cp .env.example .env
```

Inside `.env`:

```env
BREVO_API_KEY=xkeysib-your-actual-brevo-api-key
BREVO_SENDER_EMAIL=mololuwa.ibrahim@gmail.com
BREVO_SENDER_NAME=Ibrahim Balogun Portfolio
CONTACT_RECIPIENT_EMAIL=ibroman02@yahoo.com
CONTACT_RECIPIENT_NAME=Ibrahim Balogun
```

> Make sure `mololuwa.ibrahim@gmail.com` is added and verified under **Senders, Domains & Dedicated IPs -> Senders** in your Brevo dashboard.

### 2. Install Dependencies & Build Frontend

```bash
pip install -r requirements.txt
npm --prefix frontend install
npm --prefix frontend run build
```

### 3. Run the App

**Single-server mode (Flask serves React + API):**

```bash
python3 app.py
# or with Gunicorn:
gunicorn app:app --bind 0.0.0.0:5000
```

**Frontend HMR dev mode (optional, runs alongside Flask):**

```bash
# Terminal 1
python3 app.py

# Terminal 2
npm --prefix frontend run dev
```

## Running Tests

```bash
pytest -v
```

## Deployment on Render

### Option A — Single Python Web Service (Recommended — React + Flask + Brevo together)

`render.yaml` and `build.sh` are preconfigured for a single Render Web Service:
- **Type**: Web Service (**Python 3**) or Blueprint (`render.yaml`)
- **Root Directory**: *(leave blank / repo root)*
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120`
- **Environment Variables**: add `BREVO_API_KEY` (plus `BREVO_SENDER_EMAIL=mololuwa.ibrahim@gmail.com` and `CONTACT_RECIPIENT_EMAIL=ibroman02@yahoo.com`).

### Option B — Separate Render Static Site (Frontend) + Python Web Service (Backend API)

If you deploy the React frontend as a standalone **Render Static Site**:
- **Root Directory**: `frontend` (not `frontend/dist`)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Environment Variable**: `VITE_API_BASE_URL=https://<your-flask-backend>.onrender.com`
- **Rewrite Rule**: `/*` -> `/index.html` (Rewrite)
