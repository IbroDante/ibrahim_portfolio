import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ProjectModal from "./components/ProjectModal";
import SkillsMatrix from "./components/SkillsMatrix";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("ibrahim-theme") === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [prefilledSubject, setPrefilledSubject] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("ibrahim-theme", theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  // Handle legacy bookmarks like /contact.html or /about.html smoothly
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const targetId =
      path.includes("contact")
        ? "contact"
        : path.includes("about")
        ? "about"
        : path.includes("services")
        ? "skills"
        : null;

    if (targetId) {
      const timer = setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleInquireFromProject = (project) => {
    setSelectedProject(null);
    setPrefilledSubject(`Inquiry: Similar to ${project.title}`);
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#090D16] dark:text-slate-100 transition-colors duration-300">
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ExperienceTimeline />
        <ProjectsShowcase onSelectProject={setSelectedProject} />
        <SkillsMatrix />
        <ContactSection prefilledSubject={prefilledSubject} />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromProject}
      />
    </div>
  );
}
