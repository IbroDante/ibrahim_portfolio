import { Mail, MapPin, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Portrait Card (clean studio frame for transparent cutout pix.png) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-100 via-slate-200/70 to-slate-300/80 dark:from-slate-800/70 dark:via-slate-900 dark:to-slate-950 p-6 pb-0 shadow-xl">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(245,158,11,0.22),transparent_62%)]"
              />
              <div className="relative aspect-[4/4.3] overflow-hidden rounded-t-2xl">
                <img
                  src={PROFILE.aboutImage}
                  alt="Ibrahim Balogun presenting software solutions"
                  className="w-full h-[112%] object-cover object-top scale-105 drop-shadow-2xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-200 dark:from-slate-950 via-slate-200/70 dark:via-slate-950/75 to-transparent"
                />
              </div>
              <div className="relative -mt-6 mb-5 mx-1 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono-code text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                    Engineering Philosophy
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                    Practical architecture, measurable impact, clean UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Bio Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
                About Me
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {PROFILE.headline}
              </h2>
            </div>

            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base">
              {PROFILE.bioExtended.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Direct Email
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                  {PROFILE.email}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Phone / WhatsApp
                </span>
                <a
                  href={PROFILE.phoneHref}
                  className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                  {PROFILE.phone}
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Location
                </span>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  {PROFILE.location}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400">
                  Developer Profiles
                </span>
                <div className="mt-1 flex items-center gap-4 text-sm font-semibold">
                  <a
                    href={PROFILE.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white hover:text-amber-500 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href={PROFILE.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-900 dark:text-white hover:text-amber-500 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-slate-950 transition-colors"
              >
                Discuss a Project
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500/60 transition-colors"
              >
                Read Full Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
