import { useState, useEffect } from "react";
import { FileText, Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { PROFILE } from "../data/portfolioData";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/85 dark:bg-[#090D16]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#top"
          className="inline-flex items-center gap-3 group focus:outline-none"
        >
          <span className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-900/90 border border-amber-500/50 flex items-center justify-center font-display font-bold text-sm tracking-wider text-amber-400 shadow-sm group-hover:border-amber-400 group-hover:scale-105 transition-transform">
            {PROFILE.initials}
          </span>
          <div className="leading-tight">
            <span className="block font-display font-semibold text-base text-slate-900 dark:text-white tracking-tight">
              {PROFILE.name}
            </span>
            <span className="block font-mono-code text-[11px] text-slate-500 dark:text-slate-400">
              Software Engineer · Abuja
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={PROFILE.cvUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-amber-500/60 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            CV
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:border-amber-500/60 hover:text-amber-500 transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20 transition-all"
          >
            Hire Me
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden mx-4 mt-3 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <a
                href={PROFILE.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
              >
                <FileText className="w-4 h-4" />
                View CV
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-semibold bg-amber-500 text-slate-950"
              >
                Hire Me
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
