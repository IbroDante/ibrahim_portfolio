import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { PROFILE } from "../data/portfolioData";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

const TOPIC_PRESETS = [
  "Web Application Build",
  "Mobile App (React Native)",
  "Python / Flask API",
  "IT & Systems Consulting",
  "Full-Time Role",
];

export default function ContactSection({ prefilledSubject }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (prefilledSubject) {
      setForm((prev) => ({ ...prev, subject: prefilledSubject }));
      setSubmitResult(null);
    }
  }, [prefilledSubject]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable in restricted contexts
    }
  };

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (submitResult?.type === "error") {
      setSubmitResult(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitResult(null);

    if (form.name.trim().length < 2) {
      setSubmitResult({
        type: "error",
        message: "Please enter your full name (at least 2 characters).",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setSubmitResult({
        type: "error",
        message: "Please provide a valid email address so I can reply.",
      });
      return;
    }
    if (form.message.trim().length < 10) {
      setSubmitResult({
        type: "error",
        message: "Please include a short message (at least 10 characters).",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          subject: form.subject.trim() || "Portfolio Contact Inquiry",
          message: form.message.trim(),
          website: form.website,
        }),
      });

      const data = await response.json();
      if (response.ok && data.ok) {
        setSubmitResult({
          type: "success",
          message: data.message,
          deliveredTo: data.delivered_to || PROFILE.email,
          messageId: data.message_id || "",
        });
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        const isConfigPending = data.code === "BREVO_NOT_CONFIGURED";
        setSubmitResult({
          type: "error",
          code: data.code || "ERROR",
          message: isConfigPending
            ? "Direct form delivery is temporarily unavailable. You can still send your message right away using the email button below."
            : data.error || "Unable to send your message right now. Please try again.",
        });
      }
    } catch {
      setSubmitResult({
        type: "error",
        code: "NETWORK_ERROR",
        message: "Could not reach the server right now. Please try again or email directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoFallbackHref = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    form.subject || "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `Hi Ibrahim,\n\n${form.message}\n\nBest regards,\n${form.name}${
      form.phone ? `\nPhone: ${form.phone}` : ""
    }`
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/35"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
            Get In Touch
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Let&apos;s Build Something Dependable
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Have a web application, mobile app, backend integration, or engineering role in mind? Send a message below and it goes straight to my inbox.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Details & Map */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl p-6 bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
                <div className="min-w-0">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-300 font-semibold">
                    Website Contact Email
                  </span>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="mt-1 flex items-center gap-2 font-display font-bold text-base text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 break-all"
                  >
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    {PROFILE.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500/60 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                    <a
                      href={PROFILE.phoneHref}
                      className="text-slate-600 dark:text-slate-400 hover:text-amber-500 transition-colors"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Base Location</p>
                    <p className="text-slate-600 dark:text-slate-400">{PROFILE.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Availability</p>
                    <p className="text-slate-600 dark:text-slate-400">{PROFILE.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Abuja Map Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1624] shadow-sm">
              <iframe
                title="Kubwa, Abuja Nigeria Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15883.116279310793!2d7.336090573412262!3d9.124476111427748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104dabb69e0752a7%3A0xd3be80e05e3bea79!2sKubwa%2C%20Abuja!5e0!3m2!1sen!2sng!4v1624462799506!5m2!1sen!2sng"
                width="100%"
                height="225"
                loading="lazy"
                className="border-0 block dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-90"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-lg">
              {submitResult?.type === "success" ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    {submitResult.message}
                  </p>
                  {submitResult.messageId && (
                    <p className="font-mono-code text-xs text-slate-500 dark:text-slate-400">
                      Reference: {submitResult.messageId}
                    </p>
                  )}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Quick Inquiry Chips */}
                  <div>
                    <label className="block text-xs font-mono-code uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      Quick Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPIC_PRESETS.map((topic) => {
                        const selected = form.subject === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            onClick={() => setForm((prev) => ({ ...prev, subject: topic }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                              selected
                                ? "bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300"
                                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-amber-500/40"
                            }`}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Honeypot field for spam bots */}
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={handleChange("website")}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                      >
                        Full Name <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Amina Bello"
                        value={form.name}
                        onChange={handleChange("name")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                      >
                        Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange("email")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                      >
                        Phone Number{" "}
                        <span className="text-xs font-normal text-slate-400">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+234 ..."
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        placeholder="Project or inquiry topic"
                        value={form.subject}
                        onChange={handleChange("subject")}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5"
                    >
                      Project Details / Message <span className="text-amber-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Tell me about your goals, timeline, or how we can work together..."
                      value={form.message}
                      onChange={handleChange("message")}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-y"
                    />
                  </div>

                  {submitResult?.type === "error" && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-sm text-rose-700 dark:text-rose-300 space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitResult.message}</span>
                      </div>
                      {(submitResult.code === "BREVO_NOT_CONFIGURED" ||
                        submitResult.code === "NETWORK_ERROR") && (
                        <div className="pl-6">
                          <a
                            href={mailtoFallbackHref}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            Send via Email App ({PROFILE.email})
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
