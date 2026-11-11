/**
 * Runtime configuration for the portfolio frontend.
 *
 * This file is copied verbatim into the build output (it is never bundled),
 * so the contact-form API can be re-pointed by editing ONE file instead of
 * rebuilding the entire React app.
 *
 * apiBaseUrl:
 *   ""                        -> use the same origin (Flask serving the React app)
 *   "https://host.onrender.com" -> call the Flask API on that host
 *
 * fallbackApiBaseUrl:
 *   Used only when the frontend is hosted on a static host that has no
 *   /api/* routes of its own (for example a Render Static Site).
 */
window.__PORTFOLIO_CONFIG__ = {
  apiBaseUrl: "",
  fallbackApiBaseUrl: "https://ibrahim-portfolio-77nl.onrender.com",
};
