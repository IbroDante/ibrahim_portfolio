import { useEffect } from "react";
import { ArrowUpRight, ExternalLink, Github, Terminal, X } from "lucide-react";

export default function ProjectModal({ project, onClose, onInquire }) {
  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/75 text-white hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Preview Header */}
        {project.image ? (
          <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="p-8 bg-gradient-to-br from-slate-900 via-[#0F172A] to-slate-950 text-white border-b border-slate-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-mono-code text-xs">
              <Terminal className="w-3.5 h-3.5" />
              Full-Stack Architecture · ALX v1–v4
            </div>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-code text-xs">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 block">01 · Console</span>
                Python CMD Engine
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 block">02 · Storage</span>
                SQLAlchemy + MySQL
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 block">03 · API</span>
                Flask REST Endpoints
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-amber-400 block">04 · Frontend</span>
                Dynamic JS Filters
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/25">
                {project.category}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{project.year}</span>
            </div>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white"
            >
              {project.title}
            </h3>
            <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed">
              {project.summary}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <h4 className="font-mono-code text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                Problem &amp; Challenge
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
              <h4 className="font-mono-code text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                Engineering Outcome
              </h4>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-mono-code text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono-code text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
                >
                  Open Live App
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-500/60 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  View Source
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={() => onInquire(project)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-amber-500 dark:hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
            >
              Build Something Similar
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
