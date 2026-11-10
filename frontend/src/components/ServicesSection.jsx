import { Code2, Layers, ServerCog, ShieldCheck } from "lucide-react";
import { SERVICES } from "../data/portfolioData";

const ICONS = {
  Code2,
  Layers,
  ServerCog,
  ShieldCheck,
};

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
            What I Do
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            From Architecture to Production Deployment
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            End-to-end engineering across frontend interfaces, Python backend systems, relational databases, and resilient Linux hosting.
          </p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] || Code2;
            return (
              <div
                key={service.id}
                className="group rounded-2xl p-6 bg-white dark:bg-[#0F1624] border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/50 transition-all hover:-translate-y-1 shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {service.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {service.deliverables.map((item) => (
                    <span
                      key={item}
                      className="font-mono-code text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
