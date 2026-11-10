import { Briefcase, GraduationCap, CheckCircle2, MapPin } from "lucide-react";
import { CREDENTIALS, EXPERIENCE } from "../data/portfolioData";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
            Track Record
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Experience, Education &amp; Global Training
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Over a decade delivering enterprise software systems, large-scale institutional data integrations, and dependable IT operations.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-8">
          {/* Work Experience Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-display font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <Briefcase className="w-4 h-4 text-amber-500" />
              Professional Experience
            </div>

            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
              {EXPERIENCE.map((item) => (
                <article
                  key={item.role + item.period}
                  className="relative rounded-2xl p-6 bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] top-7 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-slate-50 dark:ring-[#090D16]"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-code text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium">
                      {item.period}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {item.organization}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {item.highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-code text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Education & Certifications Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2.5 text-sm font-display font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              Education &amp; Certifications
            </div>

            <div className="space-y-4">
              {CREDENTIALS.map((cred) => (
                <div
                  key={cred.title}
                  className="rounded-2xl p-5 bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-colors shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono-code text-xs text-slate-500 dark:text-slate-400">
                      {cred.year}
                    </span>
                    <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {cred.badge}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-slate-900 dark:text-white">
                    {cred.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                    {cred.issuer}
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cred.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
