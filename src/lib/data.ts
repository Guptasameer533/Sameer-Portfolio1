export const siteConfig = {
  name: "Sameer Gupta",
  role: "Software Engineer",
  tagline: "Backend & Distributed Systems · Full-Stack Engineer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfoliosameer.vercel.app",
  email: "guptasameer533@gmail.com",
  phone: "+91 9305925384",
  location: "Gurugram / Kota, India",
  resumePath: "/Sameer_Gupta_Resume.pdf",
  links: {
    github: "https://github.com/Guptasameer533",
    linkedin: "https://www.linkedin.com/in/sameergupta533",
    leetcode: "https://leetcode.com/u/Guptasameer533",
    codeforces: "https://codeforces.com/profile/Guptasameer533",
    codechef: "https://www.codechef.com/users/guptasameer533",
  },
};

export const typingPhrases = [
  "Backend & Distributed Systems",
  "Full-Stack Engineer · Next.js / Node.js",
  "Codeforces Expert · 1657",
  "Building fault-tolerant systems",
];

export const heroStats = [
  { value: "2", label: "Production Internships" },
  { value: "1657", label: "Codeforces Expert" },
  { value: "1842", label: "LeetCode Rating" },
  { value: "900+", label: "Users Served" },
];

export const about = {
  paragraphs: [
    "I'm a software engineer from IIIT Kota (B.Tech, 2026) with two production internships building distributed backend services, concurrent execution engines, and platform reliability tooling. I've shipped features end-to-end — from system design to production debugging — in Python, TypeScript, JavaScript, and C++, across microservices, containerised GCP deployments, and CI/CD pipelines.",
    "I designed and shipped NextFlow — a live, production LLM workflow orchestrator with a concurrent DAG execution engine — entirely from scratch. I'm a Codeforces Expert (1657) and LeetCode 1842, so my algorithmic foundations are strong and verifiable. I care about correctness, failure modes, and writing code that holds up when things go wrong.",
  ],
  highlights: [
    { title: "Systems that don't fall over", text: "Fault tolerance, optimistic concurrency, race-condition prevention — designed around specific failure modes." },
    { title: "End-to-end ownership", text: "From system design and APIs to frontend, deployment, monitoring and production debugging." },
    { title: "Verifiable fundamentals", text: "Codeforces Expert, CodeChef 5★, 500+ problems solved — DSA that shows up in real code." },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Shipsy",
    role: "Product Engineer Intern",
    period: "Aug 2025 – Present",
    location: "Gurugram, India",
    bullets: [
      "Built Global Search end-to-end — a sub-100ms P95 latency RESTful microservice with live indexing and a React/TypeScript frontend, serving thousands of concurrent enterprise users on Kubernetes (GCP GKE).",
      "Reduced invalid API submissions by 80% with a server-side validation pipeline — secure coding practices, unit/integration tests, and data-integrity enforcement across distributed services.",
      "Improved system reliability by 15%+ — instrumented critical paths with metrics and structured logging on GCP; resolved recurring production incidents via root-cause analysis before user impact.",
      "Built fault-tolerant backend automation pipelines with full test coverage, cutting manual operator toil by 40%.",
    ],
    stack: ["TypeScript", "Node.js", "React", "GCP", "Kubernetes", "Elasticsearch", "CI/CD"],
  },
  {
    company: "Salesqueen Software Solutions",
    role: "Software Engineer Intern",
    period: "May 2024 – Jul 2024",
    location: "Remote",
    bullets: [
      "Built and shipped full-stack features — RESTful APIs with authentication middleware and input validation, plus a React dashboard with unit tests; deployed and iterated on real user feedback.",
      "Debugged and resolved production defects — traced root causes of data-validation failures and shipped fixes with regression test coverage.",
    ],
    stack: ["JavaScript", "React", "Node.js", "REST APIs"],
  },
];

export type Project = {
  name: string;
  subtitle: string;
  badge: string;
  note: string;
  description: string;
  points: string[];
  stack: string[];
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "NextFlow",
    subtitle: "LLM Workflow Orchestrator",
    badge: "Live in production",
    note: "my favourite — every line written from scratch",
    description:
      "A production LLM workflow orchestrator with a concurrent DAG execution engine, designed and built entirely from scratch.",
    points: [
      "Concurrent distributed execution engine — memoised parallel fan-out, topological DAG traversal, and structured failure propagation across distributed task workers.",
      "Platform resilience — optimistic concurrency control for multi-tab version conflicts (409 VERSION_CONFLICT), scoped realtime access tokens per run, and SKIPPED propagation for partial failures.",
      "Real-time canvas UI — React Flow DAG canvas with live node-status via Trigger.dev Realtime, Zustand + zundo undo/redo, and debounced auto-save to Neon Postgres.",
      "Multi-node pipeline — Gemini multimodal, FFmpeg image processing via Transloadit, with full server-side graph validation (Zod + cycle detection) before any persist.",
    ],
    stack: ["Next.js", "TypeScript", "React Flow", "Trigger.dev", "PostgreSQL", "Prisma", "Docker", "GCP"],
    live: "https://nextflow-smoky-gamma.vercel.app/dashboard",
    featured: true,
  },
  {
    name: "KisanMitra",
    subtitle: "Contract Farming Platform",
    badge: "SIH 2024 National Finalist",
    note: "defended this one in front of national judges",
    description:
      "A full-stack platform connecting farmers with agribusinesses through assured contract farming — built for Smart India Hackathon 2024 and defended before national judges.",
    points: [
      "Engineered race-condition prevention for multi-party contract negotiations under concurrent load — transactional writes and optimistic locking on MongoDB.",
      "Real-time data flows for contract status updates and bidding — RESTful APIs with authentication middleware and MongoDB aggregation pipelines.",
      "Shipped with full unit and acceptance test coverage.",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    live: "https://kisanmitra-tau.vercel.app/",
  },
  {
    name: "Resource HUB",
    subtitle: "Academic Platform",
    badge: "900+ active users",
    note: "students at my college still use this daily",
    description:
      "The primary academic resource platform at IIIT Kota — scaled to 900+ active users on a MySQL and Firebase backend.",
    points: [
      "Designed the schema, managed indexing, and traced real-time data-consistency failures under concurrent read/write load via root-cause analysis.",
      "Shipped an LLM-powered study assistant — diagnosed and resolved post-deployment latency and reliability issues; improved user engagement by 60%.",
    ],
    stack: ["Node.js", "Express.js", "Firebase", "MySQL", "REST APIs"],
  },
];

export const skillGroups = [
  { title: "Languages", skills: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"] },
  { title: "Backend & Databases", skills: ["Node.js", "Express.js", "RESTful APIs", "Microservices", "PostgreSQL", "MongoDB", "MySQL", "Elasticsearch", "Prisma"] },
  { title: "Frontend", skills: ["React.js", "Next.js", "Redux Toolkit", "Zustand", "React Flow", "Tailwind CSS", "HTML5", "CSS3"] },
  { title: "Platform & DevOps", skills: ["Docker", "Kubernetes (GKE)", "GCP", "AWS", "CI/CD", "Linux", "Git"] },
  { title: "CS Fundamentals", skills: ["Data Structures & Algorithms", "Distributed Systems", "Concurrent Programming", "System Design", "OOP"] },
  { title: "Testing & Tools", skills: ["Jest", "Unit / Integration Testing", "Trigger.dev", "Transloadit", "Clerk Auth", "Agile"] },
];

export type CPPlatform = {
  platform: string;
  rating: string;
  tier: string;
  detail: string;
  link?: string;
  color: string;
};

export const competitiveProgramming: CPPlatform[] = [
  {
    platform: "Codeforces",
    rating: "1657",
    tier: "Expert",
    detail: "Top ~10% of active contestants globally · Div. 1/2 contests",
    color: "#3b82f6",
  },
  {
    platform: "LeetCode",
    rating: "1842",
    tier: "Top Rated",
    detail: "Weekly & biweekly contests · strong in graphs and DP",
    link: "https://leetcode.com/u/Guptasameer533",
    color: "#f59e0b",
  },
  {
    platform: "CodeChef",
    rating: "2043",
    tier: "5-Star",
    detail: "Cook-Offs and Long Challenges",
    color: "#a78bfa",
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon 2024 — National Finalist",
    text: "Selected among top teams nationally from thousands of submissions. Built and demoed KisanMitra end-to-end to national judges, representing IIIT Kota.",
  },
  {
    title: "Codeforces Expert · Max 1657",
    text: "Competitive programming rating placing in the top ~10% of active contestants globally, maintained through consistent contest participation.",
  },
  {
    title: "CodeChef 5-Star · Max 2043",
    text: "Five-star rated competitive programmer; 500+ problems solved across platforms, primarily in C++.",
  },
  {
    title: "President, TechKnow Society",
    text: "Led a 50-member technical society at IIIT Kota — organised national-level hackathons, workshops, and CP contests; mentored juniors in DSA and development.",
  },
];

export const education = {
  institute: "Indian Institute of Information Technology, Kota",
  degree: "B.Tech — Electronics and Communication Engineering",
  period: "Nov 2022 – Jun 2026",
  coursework: ["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Systems", "OOP", "Discrete Mathematics"],
};

export const navLinks = [
  { label: "about", href: "#about" },
  { label: "work", href: "#work" },
  { label: "projects", href: "#projects" },
  { label: "skills", href: "#skills" },
  { label: "high scores", href: "#high-scores" },
  { label: "say hi", href: "#contact" },
];
