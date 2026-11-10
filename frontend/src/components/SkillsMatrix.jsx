import { useState } from "react";
import { Cpu, Database, Layout, Users } from "lucide-react";
import { SKILL_GROUPS } from "../data/portfolioData";

const GROUP_ICONS = {
  backend: Cpu,
  frontend: Layout,
  data_devops: Database,
  operations: Users,
};

export default function SkillsMatrix() {
  const [activeGroup, setActiveGroup] = useState("all");

  const visibleGroups =
    activeGroup === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === activeGroup);

  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
              Technical Stack
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Tools, Frameworks &amp; Engineering Depth
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Proven production toolkit across Python web frameworks, modern React interfaces, database design, and Linux server operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveGroup("all")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeGroup === "all"
                  ? "bg-amber-500 text-slate-950"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50"
              }`}
            >
              All Areas
            </button>
            {SKILL_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeGroup === group.id
                    ? "bg-amber-500 text-slate-950"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50"
                }`}
              >
                {group.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {visibleGroups.map((group) => {
            const Icon = GROUP_ICONS[group.id] || Cpu;
            return (
              <div
                key={group.id}
                className="rounded-2xl p-6 bg-white dark:bg-[#0F1624] border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    {group.label}
                  </h3>
                </div>

                <div className="mt-5 grid sm:grid-cols-2 gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/75 border border-slate-200/80 dark:border-slate-800/80"
                    >
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {skill.name}
                      </span>
                      <span className="font-mono-code text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 shrink-0">
                        {skill.level}
                      </span>
                    </div>
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
