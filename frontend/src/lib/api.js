/**
 * API client for the Flask backend.
 *
 * The React app can be deployed in two ways:
 *   1. Served by the Flask app itself (same origin) -> API base "" works.
 *   2. Served as a standalone Render Static Site -> the API lives on a
 *      separate Flask service and has to be discovered at runtime.
 *
 * Resolution order:
 *   1. `VITE_API_BASE_URL` (build-time env var, optional).
 *   2. Same origin (Flask serving the React bundle).
 *   3. The known Flask API service.
 *
 * The winning base is cached in localStorage so the probe happens once
 * per visitor instead of on every submission.
 */

export const DEFAULT_API_BASE = "https://ibrahim-portfolio-77nl.onrender.com";

const CACHE_KEY = "portfolio.apiBaseUrl";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const PROBE_TIMEOUT_MS = 8000;

function normalizeBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}

function getEnvBaseUrl() {
  try {
    return normalizeBase(import.meta.env && import.meta.env.VITE_API_BASE_URL);
  } catch {
    return "";
  }
}

function getRuntimeConfig() {
  try {
    return window.__PORTFOLIO_CONFIG__ || {};
  } catch {
    return {};
  }
}

function getCandidates() {
  const config = getRuntimeConfig();
  const candidates = [];

  const push = (value) => {
    const base = normalizeBase(value);
    if (!candidates.includes(base)) candidates.push(base);
  };

  // 1. Build-time env var (Render dashboard).
  push(getEnvBaseUrl());
  // 2. Runtime config (frontend/public/config.js).
  push(config.apiBaseUrl);
  // 3. Same origin - Flask serving the React bundle.
  push("");
  // 4. Known Flask API service - used when the frontend is on a static host.
  push(config.fallbackApiBaseUrl);
  push(DEFAULT_API_BASE);

  return candidates;
}

function readCachedBase() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (raw === null) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.base !== "string") return null;
    if (Date.now() - Number(parsed.ts || 0) > CACHE_TTL_MS) return null;
    return parsed.base;
  } catch {
    return null;
  }
}

function cacheBase(base) {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ base, ts: Date.now() })
    );
  } catch {
    /* storage unavailable - non fatal */
  }
}

async function probeApi(base) {
  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller
    ? setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS)
    : null;

  try {
    const response = await fetch(`${base}/api/health`, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller ? controller.signal : undefined,
    });

    if (!response.ok) return false;

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return false;

    const data = await response.json();
    return Boolean(
      data && data.ok && String(data.service || "").includes("portfolio")
    );
  } catch {
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function resolveApiBase() {
  const cached = readCachedBase();
  if (cached !== null) return cached;

  for (const base of getCandidates()) {
    // eslint-disable-next-line no-await-in-loop
    if (await probeApi(base)) {
      cacheBase(base);
      return base;
    }
  }

  // Nothing answered yet - fall back to the configured/same-origin API so the
  // request still has the best chance of succeeding.
  const config = getRuntimeConfig();
  return getEnvBaseUrl() || normalizeBase(config.apiBaseUrl);
}

/**
 * Submit the contact form payload to the Flask API.
 *
 * Returns a normalized result object instead of throwing so the UI can
 * explain exactly what happened in plain, visitor-friendly language.
 */
export async function submitContact(payload) {
  let base = "";
  try {
    base = await resolveApiBase();
  } catch {
    base = "";
  }

  let response;
  try {
    response = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return {
      kind: "unreachable",
      code: "NETWORK_ERROR",
      message:
        "Could not reach the contact service right now. Please try again, or email me directly.",
    };
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    // e.g. a static host answering the request with an HTML 404 page.
    return {
      kind: "unreachable",
      code: "NETWORK_ERROR",
      message:
        "Could not reach the contact service right now. Please try again, or email me directly.",
    };
  }

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (response.ok && data.ok) {
    return {
      kind: "success",
      message: data.message,
      deliveredTo: data.delivered_to,
      messageId: data.message_id,
    };
  }

  if (response.status === 503 || data.code === "BREVO_NOT_CONFIGURED") {
    return {
      kind: "unavailable",
      code: data.code || "SERVICE_UNAVAILABLE",
      message:
        "Direct form delivery is temporarily unavailable. You can still send your message right away using the email button below.",
    };
  }

  if (response.status === 429) {
    return {
      kind: "unavailable",
      code: "RATE_LIMITED",
      message:
        "Too many messages were sent recently. Please wait a few minutes, or email me directly.",
    };
  }

  if (response.status === 400) {
    return {
      kind: "validation",
      code: data.code || "VALIDATION_ERROR",
      message: data.error || "Please check the form and try again.",
    };
  }

  return {
    kind: "unavailable",
    code: data.code || "SERVER_ERROR",
    message:
      "The contact service is temporarily unavailable. Please try again shortly, or email me directly.",
  };
}
