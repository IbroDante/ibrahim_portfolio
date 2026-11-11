import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  Award,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { IMPACT_STATS, PROFILE } from "../data/portfolioData";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = PROFILE.roles[roleIndex];
    const speed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentRole.length) {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentRole.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PROFILE.roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  return (
    <section
      id="top"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-grid-pattern"
    >
      {/* Atmospheric subtle glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[42rem] h-[24rem] rounded-full bg-amber-500/15 dark:bg-amber-500/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 right-0 w-[26rem] h-[22rem] rounded-full bg-emerald-500/10 blur-[110px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {PROFILE.availability}
              </span>
            </div>

            <div className="space-y-3">
              <p className="font-mono-code text-xs sm:text-sm uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 font-semibold">
                Building Reliable Digital Products Since 2016
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {PROFILE.name}
                </span>
              </h1>
              <div className="h-9 sm:h-10 flex items-center">
                <span className="font-display text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200">
                  {typedText}
                  <span className="inline-block w-0.5 h-6 ml-1 align-middle bg-amber-500 animate-pulse" />
                </span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {PROFILE.bioShort}
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                Start a Conversation
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 text-slate-800 dark:text-slate-100 hover:border-amber-500/60 transition-all"
              >
                Explore Projects
                <ArrowDownRight className="w-4 h-4 text-amber-500" />
              </a>
              <a
                href={PROFILE.cvDownloadUrl}
                download="Ibrahim-Balogun-CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Location & Socials */}
            <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-500" />
                {PROFILE.location}
              </span>
              <a
                href={PROFILE.socials.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={PROFILE.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <span className="font-mono-code text-xs text-slate-500 dark:text-slate-400">
                React · React Native · Python · Flask · Django · MySQL
              </span>
            </div>
          </div>

          {/* Right Column: Framed Real Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-amber-500/40 via-slate-700/20 to-emerald-500/35 blur-lg opacity-70" />
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl">
                <div className="aspect-[4/4.6] overflow-hidden bg-slate-800">
                  <img
                    src={PROFILE.heroImage}
                    alt="Ibrahim Balogun — Software Engineer in Abuja, Nigeria"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-slate-950/95 via-slate-950/75 to-transparent text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display font-semibold text-base flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        ALX SE &amp; JAMB IT Analyst
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Cost-saving enterprise apps &amp; modern web systems
                      </p>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-mono-code">
                      <Award className="w-3.5 h-3.5" />
                      2017 Award
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats Strip */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {IMPACT_STATS.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl p-5 bg-white/85 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-sm hover:border-amber-500/40 transition-colors"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
