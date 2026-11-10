import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone, Twitter, Facebook } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800/80">
          <div className="space-y-3">
            <a href="#top" className="inline-flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/50 flex items-center justify-center font-display font-bold text-sm text-amber-400">
                {PROFILE.initials}
              </span>
              <div>
                <span className="block font-display font-bold text-lg text-slate-900 dark:text-white">
                  {PROFILE.name}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {PROFILE.headline}
                </span>
              </div>
            </a>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-400 pt-1">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-500" />
                {PROFILE.email}
              </a>
              <a
                href={PROFILE.phoneHref}
                className="inline-flex items-center gap-1.5 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                {PROFILE.phone}
              </a>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                {PROFILE.location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-amber-500/60 hover:text-amber-500 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-amber-500/60 hover:text-amber-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.socials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-amber-500/60 hover:text-amber-500 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.socials.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-amber-500/60 hover:text-amber-500 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="#top"
              aria-label="Back to top"
              className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center hover:bg-amber-400 transition-colors ml-1"
            >
              <ArrowUp className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {year} {PROFILE.name}. Built with React, Flask &amp; Brevo.</p>
          <div className="flex items-center gap-5">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Projects
            </a>
            <a href={PROFILE.cvUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Resume PDF
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
