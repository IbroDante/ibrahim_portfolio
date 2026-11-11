# Ibrahim Balogun — Developer Portfolio (React + Flask + Brevo API)

Modern, dark-first full-stack developer portfolio built with **React**, **Tailwind CSS**, **Flask**, and the **Brevo Transactional Email API**.

## Architecture

- **Frontend (`frontend/`)**: 100% React SPA (React 19 + Vite + Tailwind CSS v4 + Lucide Icons) with zero HTML/Jinja templates. All portfolio images (`frontend/public/images/`) and the CV PDF (`frontend/public/Ibrahim-Balogun-CV.pdf`) are bundled into `frontend/dist/`.
- **Backend (`app.py`, `brevo_service.py`)**: Pure Flask JSON API + static React bundle host serving `frontend/dist/` at `/`, PDF resume at `/cv`, health/status endpoints (`/api/health`, `/api/contact/status`), and `POST /api/contact` powered by Brevo v3 (`https://api.brevo.com/v3/smtp/email`).

## How the Brevo Email Workflow Works

When a visitor submits the contact form:
1. Flask validates, sanitizes, rate-limits (5 requests / 10 min per IP), and checks the honeypot field.
2. Flask sends a `POST` request to `https://api.brevo.com/v3/smtp/email` using your `BREVO_API_KEY`:
   - **`sender`**: `mololuwa.ibrahim@gmail.com` (`BREVO_SENDER_EMAIL` — your verified sender email attached to Brevo)
   - **`to`**: `ibroman02@yahoo.com` (`CONTACT_RECIPIENT_EMAIL` — the website contact email where submissions go directly)
   - **`replyTo`**: set to the visitor's submitted email and name, so replying in Yahoo Mail goes straight back to the sender.

## How the Frontend Finds the API

The React app talks to the Flask API through `frontend/src/lib/api.js`, which resolves the API base URL in this order:

1. `VITE_API_BASE_URL` — build-time environment variable (Render dashboard).
2. `window.__PORTFOLIO_CONFIG__.apiBaseUrl` — runtime value from `frontend/public/config.js`. This file is **copied verbatim** into the build, so you can re-point the API by editing one file (no rebuild required).
3. Same origin (`""`) — correct when Flask serves the React bundle.
4. `window.__PORTFOLIO_CONFIG__.fallbackApiBaseUrl` / the known Flask service — used when the frontend is hosted on a static host with no `/api/*` routes.

The resolved base is cached in `localStorage` for 24 hours, and each candidate is verified with a `GET /api/health` probe before being used.

> **This is why the contact form fails with "Could not reach the server"** if the frontend is deployed to a **Render Static Site** while the Flask API lives in a **separate Web Service**: the browser posts to `/api/contact` on the static host, which answers with an HTML 404 instead of JSON. Fixing it is either (a) deploy the frontend through Flask (recommended, single service), or (b) set the API URL in `frontend/public/config.js`.

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

The Vite dev server proxies `/api`, `/cv`, and `/resume` to `http://127.0.0.1:5000`.

## Running Tests

```bash
pytest -v
```

## Deployment on Render

### Option A — Single Python Web Service (Recommended)

One Render **Web Service** serves the React bundle *and* the JSON API from the same origin, so there is no CORS setup and the contact form always reaches the backend.

- **Type**: Web Service (**Python 3**) or Blueprint (`render.yaml`)
- **Root Directory**: *(leave blank / repo root)*
- **Build Command**: `./build.sh`
- **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120`
- **Health Check Path**: `/api/health`
- **Environment Variables**:

| Key | Value |
| --- | --- |
| `BREVO_API_KEY` | *(your Brevo v3 API key — set this to "Do not sync" and paste it manually)* |
| `BREVO_SENDER_EMAIL` | `mololuwa.ibrahim@gmail.com` |
| `BREVO_SENDER_NAME` | `Ibrahim Balogun Portfolio` |
| `CONTACT_RECIPIENT_EMAIL` | `ibroman02@yahoo.com` |
| `CONTACT_RECIPIENT_NAME` | `Ibrahim Balogun` |
| `CORS_ORIGINS` | `*` |

### Option B — Render Static Site (frontend) + Python Web Service (backend API)

If you want the frontend on a Render **Static Site**:

- **Root Directory**: `frontend` *(not `frontend/dist`, and never `frontend_bundle`)*
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rule**: `/*` -> `/index.html` (**Rewrite**)
- **Environment Variables** (build time): `VITE_API_BASE_URL=https://<your-flask-web-service>.onrender.com`

Alternatively, skip the env var and edit `frontend/public/config.js` in this repo:

```js
window.__PORTFOLIO_CONFIG__ = {
  apiBaseUrl: "",
  fallbackApiBaseUrl: "https://ibrahim-portfolio-77nl.onrender.com",
};
```

The Flask service must then allow the static site's origin — `CORS_ORIGINS=*` (the default) already does this.

### Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Images show as broken | Static Site publish directory is wrong | Set **Publish Directory** to `dist` with **Root Directory** `frontend`. Images are also available at stable `/images/<file>` URLs. |
| "Could not reach the server" after submitting | Frontend hosted on a static host with no `/api/*` | Use Option A, or set `VITE_API_BASE_URL` / `fallbackApiBaseUrl` as described above. |
| "Direct form delivery is temporarily unavailable" | `BREVO_API_KEY` is not set on the service | Add the key in the Render dashboard **Environment** section and redeploy. |
| Build fails with `ENOENT ... package.json` | Root Directory points at a build-output folder | Set Root Directory to the repo root (Option A) or `frontend` (Option B). |
