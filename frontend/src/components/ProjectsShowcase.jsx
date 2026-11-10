import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Eye, Github, Terminal } from "lucide-react";
import { PROJECT_CATEGORIES, PROJECTS } from "../data/portfolioData";

export default function ProjectsShowcase({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 border-y border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
              Selected Work
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Production Apps &amp; Enterprise Platforms
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Real systems built for cooperative societies, logistics, education portals, transport compliance, and public-sector workflows.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-amber-500 text-slate-950 shadow-sm shadow-amber-500/20"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all hover:-translate-y-1 shadow-sm"
            >
              {/* Browser-framed screenshot or architectural blueprint */}
              <div
                onClick={() => onSelectProject(project)}
                className="relative cursor-pointer bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
              >
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-200/80 dark:bg-slate-900/90 border-b border-slate-300/60 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono-code text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                    {project.year}
                  </span>
                </div>

                {project.image ? (
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/10] p-5 bg-gradient-to-br from-slate-900 via-[#0E1726] to-slate-950 text-slate-200 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 font-mono-code text-xs text-amber-400">
                        <Terminal className="w-4 h-4" />
                        ALX Engineering
                      </span>
                      <span className="font-mono-code text-[11px] text-emerald-400">
                        v1 → v4
                      </span>
                    </div>
                    <div className="space-y-1.5 font-mono-code text-xs text-slate-300">
                      <p className="text-slate-400">$ python3 -m flask run</p>
                      <p>✓ SQLAlchemy ORM + MySQL Engine</p>
                      <p>✓ RESTful JSON Endpoints</p>
                      <p>✓ Dynamic AirBnB Web Frontend</p>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 top-7 bg-slate-950/0 group-hover:bg-slate-950/35 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 text-slate-950 font-semibold text-xs shadow-lg">
                    <Eye className="w-3.5 h-3.5" />
                    Inspect Case Study
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-code text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                    {project.category}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-xl font-bold text-slate-900 dark:text-white">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="text-left hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </button>
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-code text-[11px] px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="font-mono-code text-[11px] px-2 py-1 rounded-md text-slate-500 dark:text-slate-400">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Case Study
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500/60 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 transition-colors"
                      >
                        Live
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
