export const PROFILE = {
  name: "Ibrahim Balogun",
  shortName: "Ibrahim B.",
  initials: "IB",
  headline: "Lead Web Developer & Full-Stack Software Engineer",
  roles: [
    "Full-Stack Software Engineer",
    "Python (Flask & Django) Specialist",
    "React & Modern Web Architect",
    "DevOps & Systems Integrator",
  ],
  location: "Abuja, Nigeria",
  address: "Gwarinpa II / Kubwa, FCT Abuja, Nigeria",
  email: "ibroman02@yahoo.com",
  phone: "+234 706 186 6475",
  phoneHref: "tel:+2347061866475",
  workingHours: "Mon – Sat · 7:00 AM – 9:00 PM WAT",
  availability: "Open for Full-Stack Builds, Consulting & Senior Roles",
  cvUrl: "/cv",
  cvDownloadUrl: "/cv?download=1",
  heroImage: "/static/images/mypix.jpg",
  aboutImage: "/static/images/pix.png",
  bioShort:
    "Experienced IT professional and software engineer building resilient, cost-saving web platforms since 2016 — from 725-institution national data pipelines to cooperative finance, education, and logistics systems.",
  bioExtended: [
    "With over a decade in enterprise IT infrastructure and full-stack software engineering, I design and ship scalable applications that bridge complex backend logic with intuitive user experiences.",
    "At the Joint Admissions and Matriculation Board (JAMB), I helped integrate 725 higher institutions into a centralized system, built internal workflow platforms, and earned Employee of the Year (2017) for delivering cost-saving software applications.",
    "Completed the African Leadership Programme (ALX) Software Engineering track (2022–2024) and continuously craft modern products with Python (Flask & Django), React, JavaScript, MySQL, Nginx, and Gunicorn.",
  ],
  socials: {
    github: "https://github.com/IbroDante",
    linkedin: "https://www.linkedin.com/in/ibrahim-balogun-3a1a6238/",
    twitter: "https://x.com/ibroman02",
    facebook: "https://web.facebook.com/ibroman02",
  },
};

export const IMPACT_STATS = [
  {
    value: "8+",
    label: "Years Engineering & IT",
    detail: "Web development since 2016; IT systems since 2011",
  },
  {
    value: "725+",
    label: "Institutions Integrated",
    detail: "Centralized higher-education data pipelines",
  },
  {
    value: "7+",
    label: "Production Systems",
    detail: "Finance, logistics, edtech & GovTech apps",
  },
  {
    value: "2017",
    label: "Employee of the Year",
    detail: "Awarded for cost-saving software applications",
  },
];

export const SERVICES = [
  {
    id: "fullstack",
    title: "Full-Stack Web Engineering",
    summary:
      "Modern React interfaces backed by fast, secure Python (Flask & Django) REST APIs and clean relational database schemas.",
    deliverables: ["React SPAs", "Flask & Django APIs", "MySQL Architecture"],
    icon: "Code2",
  },
  {
    id: "enterprise",
    title: "Enterprise & GovTech Portals",
    summary:
      "Workflow automation, cooperative finance, recruitment systems, QR ticketing, and high-reliability data integration portals.",
    deliverables: ["Role-Based Dashboards", "Data Pipelines", "Audit & Reporting"],
    icon: "Layers",
  },
  {
    id: "devops",
    title: "Deployment & Server Ops",
    summary:
      "Production Linux deployment with Nginx reverse proxies, Gunicorn application servers, load balancing, and cloud hosting.",
    deliverables: ["Nginx & Gunicorn", "Linux Administration", "Load Balancing"],
    icon: "ServerCog",
  },
  {
    id: "support",
    title: "Technical Leadership & IT",
    summary:
      "Cross-functional coordination, network/desktop troubleshooting, and user-focused support built on SERVICOM standards.",
    deliverables: ["Team Coordination", "Network Admin", "Client-First Delivery"],
    icon: "ShieldCheck",
  },
];

export const EXPERIENCE = [
  {
    period: "Sept 2012 – Present",
    role: "IT Support Analyst & Software Developer",
    organization: "Joint Admissions and Matriculation Board (JAMB)",
    location: "FCT Abuja, Nigeria",
    highlights: [
      "Designed and maintained the JAMB INSAAF Cooperative web application for member loans, savings, and investments.",
      "Built and operated web architecture for the InTimeNG logistics platform and supported the Central Admissions Processing System (CAPS).",
      "Integrated institutional records from 725 higher institutions into a centralized system with high accuracy.",
      "Delivered mission-critical examination technical support locally and internationally; awarded Employee of the Year (2017).",
    ],
    tags: ["Python", "Flask", "Django", "MySQL", "CAPS", "Systems Integration"],
  },
  {
    period: "Jan 2011 – Dec 2012",
    role: "IT Expert",
    organization: "FCT Archives and History Bureau",
    location: "FCT Abuja, Nigeria",
    highlights: [
      "Monitored and maintained the agency's Local Area Network (LAN), centralized file servers, and security surveillance systems.",
      "Managed vendor relationships, procurement coordination, and SLA compliance for enterprise IT services.",
    ],
    tags: ["LAN Administration", "File Servers", "CCTV Systems", "Vendor Management"],
  },
];

export const CREDENTIALS = [
  {
    year: "2022 – 2024",
    title: "ALX Software Engineering Programme",
    issuer: "African Leadership Programme (ALX)",
    detail: "Intensive full-stack systems engineering, C, Python, Flask APIs, databases, and collaborative software delivery.",
    badge: "Engineering",
  },
  {
    year: "2014 – 2019",
    title: "B.Sc. Degree in Economics",
    issuer: "University of Abuja, Nigeria",
    detail: "Analytical grounding in quantitative methods, economic systems, and data-driven decision making.",
    badge: "Degree",
  },
  {
    year: "2019",
    title: "Customer Care / SERVICOM Certificate",
    issuer: "SERVICOM Nigeria",
    detail: "Public service excellence, SLA delivery, and user-centric technical support workflows.",
    badge: "Service",
  },
  {
    year: "2014",
    title: "Modern Technology in ICT Training",
    issuer: "Newcastle University, United Kingdom",
    detail: "International executive training in modern ICT infrastructure and enterprise systems.",
    badge: "International",
  },
  {
    year: "2012 & 2014",
    title: "Item Banking & IRT Psychometric Training",
    issuer: "CITO · Arnhem, The Netherlands",
    detail: "Specialized assessment systems and Item Response Theory (IRT) data engineering.",
    badge: "International",
  },
];

export const SKILL_GROUPS = [
  {
    id: "backend",
    label: "Backend & APIs",
    skills: [
      { name: "Python", level: "Core · 8+ yrs" },
      { name: "Flask", level: "Production" },
      { name: "Django", level: "Production" },
      { name: "Node.js", level: "API Services" },
      { name: "RESTful APIs & Brevo", level: "Integration" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend & UI",
    skills: [
      { name: "React", level: "Modern SPAs" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "HTML5 & Semantic Markup", level: "Core" },
      { name: "Tailwind CSS & Responsive UI", level: "Modern Design" },
    ],
  },
  {
    id: "data_devops",
    label: "Data & DevOps",
    skills: [
      { name: "MySQL & Relational Design", level: "Production" },
      { name: "Nginx Reverse Proxy", level: "Production" },
      { name: "Gunicorn WSGI", level: "Production" },
      { name: "Git & GitHub", level: "Workflow" },
      { name: "Load Balancing & Linux", level: "Infra" },
    ],
  },
  {
    id: "operations",
    label: "IT & Leadership",
    skills: [
      { name: "Team Coordination", level: "Multidisciplinary" },
      { name: "Network Administration", level: "LAN / Servers" },
      { name: "User & Desktop Support", level: "SERVICOM" },
      { name: "macOS, Linux & Windows", level: "Multi-OS" },
    ],
  },
];

export const PROJECTS = [
  {
    id: "insaaf",
    title: "JAMB INSAAF Cooperative App",
    category: "Production Platforms",
    year: "Production",
    tagline: "Interest-free cooperative savings, loans & member equity portal.",
    summary:
      "Full-stack cooperative society web platform managing membership onboarding, entrance & annual fees, loan application workflows, target savings, and executive admin reporting.",
    challenge:
      "Members needed transparent access to cooperative rules, loan fee schedules, and direct communication with administrators without manual paper bottlenecks.",
    outcome:
      "Digitized cooperative membership operations and admin oversight on a fast Flask + MySQL architecture backed by Gunicorn and Nginx.",
    image: "/static/images/insaaf.png",
    liveUrl: "https://jmcs-insaaf.onrender.com/",
    githubUrl: null,
    stack: ["Python", "Flask", "MySQL", "JavaScript", "Nginx", "Gunicorn"],
  },
  {
    id: "intime",
    title: "InTime Ride & Logistics (InTimeNG)",
    category: "Production Platforms",
    year: "Production",
    tagline: "End-to-end ride booking, moving & ground shipping web application.",
    summary:
      "Multi-role logistics platform serving customers and drivers with instant service booking, driver signup flows, operational dashboards, and dark/light theme support.",
    challenge:
      "Unifying moving/packing requests, ground shipping dispatch, and driver registration inside one responsive interface.",
    outcome:
      "Shipped a live production web app deployed on Render with streamlined customer booking and driver onboarding flows.",
    image: "/static/images/intime.png",
    liveUrl: "https://intimeng.onrender.com/",
    githubUrl: null,
    stack: ["Python", "Flask / Django", "JavaScript", "MySQL", "Nginx", "Gunicorn"],
  },
  {
    id: "edung",
    title: "EduNg Learning & Resource Hub",
    category: "Production Platforms",
    year: "Open Source",
    tagline: "Collaborative educational portal & study-material sharing platform.",
    summary:
      "Built for Nigerian students to discover courses, share educational study materials, manage personal learning dashboards, and connect across academic tracks.",
    challenge:
      "Students struggled to locate organized, reliable course materials and peer study resources in one accessible place.",
    outcome:
      "Created a clean course & resource-sharing application with authentication, gallery/blog sections, and student dashboard workflows.",
    image: "/static/images/edupix.png",
    liveUrl: null,
    githubUrl: "https://github.com/IbroDante/EduNg.git",
    stack: ["Python", "Flask", "MySQL", "HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "helpline",
    title: "UTME Field Helpline Form App",
    category: "Enterprise & GovTech",
    year: "Internal Tool",
    tagline: "Rapid issue reporting & resolution tracking for field exam officers.",
    summary:
      "Locally deployed incident management web app built for exam-center officers in the field to log center issues, state metadata, and track solution posts quickly.",
    challenge:
      "Field officers required a zero-friction, reliable form pipeline to escalate examination-center technical issues during live operations.",
    outcome:
      "Reduced turnaround between field issue reporting and central support resolution with structured dashboards and searchable form logs.",
    image: "/static/images/help.jpeg",
    liveUrl: null,
    githubUrl: null,
    stack: ["Python", "Flask", "MySQL", "Form Validation", "Admin Dashboard"],
  },
  {
    id: "office",
    title: "Office Document Management App",
    category: "Enterprise & GovTech",
    year: "Enterprise",
    tagline: "Structured document upload, routing & administrative oversight suite.",
    summary:
      "Internal office management platform supporting authenticated document uploads, multi-page content routing, admin review panels, and audit-ready record keeping.",
    challenge:
      "Replacing scattered email/paper document handoffs with a centralized, permissioned office portal.",
    outcome:
      "Streamlined internal approvals and searchable document retrieval across administrative teams.",
    image: "/static/images/office.jpeg",
    liveUrl: null,
    githubUrl: null,
    stack: ["Python", "Flask", "Role-Based Auth", "MySQL", "Linux"],
  },
  {
    id: "taxi",
    title: "Taxis in Nasarawa — Tracking & QR Ticketing",
    category: "Enterprise & GovTech",
    year: "GovTech",
    tagline: "Commercial vehicle registration, security verification & QR ticketing.",
    summary:
      "Transport registration and compliance web application managing driver IDs, security numbers, payment upload verification, and instant QR-code ticket generation.",
    challenge:
      "Verifying registered commercial vehicles and payment compliance cleanly across state transport checkpoints.",
    outcome:
      "Delivered an end-to-end registration and QR verification portal enabling rapid field checks and clear submission confirmation logs.",
    image: "/static/images/taxi.png",
    liveUrl: null,
    githubUrl: null,
    stack: ["Python", "Flask", "QR Code Generation", "MySQL", "JavaScript"],
  },
  {
    id: "osun",
    title: "Osun State Recruitment Portal",
    category: "Enterprise & GovTech",
    year: "GovTech",
    tagline: "State-wide recruitment & applicant onboarding web platform.",
    summary:
      "Public-sector recruitment portal providing structured candidate signup, application forms, benefit highlights, and administrative screening dashboards.",
    challenge:
      "Handling high volumes of applicants with clear guidance, reliable form intake, and administrative visibility.",
    outcome:
      "Built a clean, fast onboarding portal tailored for high accessibility and structured applicant data capture.",
    image: "/static/images/osun.jpeg",
    liveUrl: null,
    githubUrl: null,
    stack: ["Python", "Flask", "MySQL", "HTML5", "CSS3", "JavaScript"],
  },
  {
    id: "airbnb",
    title: "AirBnB Clone v1–v4 (ALX Capstone)",
    category: "Full-Stack / ALX",
    year: "2023 – 2024",
    tagline: "Full-stack web architecture from CLI storage engine to REST API & dynamic UI.",
    summary:
      "Multi-stage collaborative engineering project covering a custom Python command interpreter, SQLAlchemy ORM persistence, Flask RESTful APIs, and dynamic frontend filtering.",
    challenge:
      "Architecting every layer of a production web stack from scratch while collaborating across distributed engineering sprints.",
    outcome:
      "Delivered clean unit-tested backend models, REST endpoints, and responsive web views across versions v1 through v4.",
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com/IbroDante/AirBnB_clone_v4",
    stack: ["Python", "Flask", "SQLAlchemy", "MySQL", "REST API", "JavaScript"],
  },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Production Platforms",
  "Enterprise & GovTech",
  "Full-Stack / ALX",
];
