import { projects, ProjectItem } from "./projects";

export type { ProjectItem };


export interface StackItem {
  name: string;
  category: "Languages" | "Frontend" | "Backend & DB" | "Tools & Cloud";
  level: "Advanced" | "Proficient" | "Familiar";
  iconSvg?: string;
  color?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description: string;
  verifyUrl?: string;
  tags: string[];
  image?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details?: string;
}

export const portfolioData = {
  profile: {
    name: "Priyanshu Kumar",
    nickname: "Pranshu",
    role: "Full-Stack Software Engineer",
    roles: [
      "Full-Stack Software Engineer",
      "MERN & Next.js Architect",
      "700+ DSA Problem Solver",
      "Passionate Product Builder",
      "Open Source Contributor"
    ],
    status: "Open for full-time & freelance work",
    email: "priyanshukumarbgs066@gmail.com",
    phone: "+91-8102346798",
    location: "Kolkata, West Bengal, India",
    pronouns: "He / Him",
    website: "https://pranshu.indevs.in",
    resumeUrl: "/resume.pdf",
    avatar: "/images/DP/DP1.jpeg",
    logo: "/icons/logo.jpeg",
    dpImages: [
      "/images/DP/DP1.jpeg",
      "/images/DP/DP2.jpeg",
      "/images/DP/DP3.jpeg"
    ],
    metaTags: ["Full-Stack", "MERN", "Next.js", "DSA", "Agentforce"],
    bio: [
      "Passionate Full-Stack Developer specializing in modern web applications, high-performance backends, and responsive user experiences.",
      "Skilled across React, Next.js, Node.js, Express, TypeScript, and MongoDB with a solid foundation in Data Structures & Algorithms (700+ solved).",
      "Focus on clean modular architecture, accessible design patterns, and engineering systems that scale effortlessly under load."
    ],
    highlights: [
      {
        label: "DSA Problem Solver",
        detail: "700+ LeetCode & Coding Platform Problems solved with deep focus on algorithmic efficiency.",
        link: "https://leetcode.com/u/Pranshu_066/"
      },
      {
        label: "Hacktoberfest & Open Source",
        detail: "Active open-source contributor and builder of modern community tools.",
        link: "https://github.com/Priyanshu1283"
      },
      {
        label: "Certified FrontEnd Domination",
        detail: "Sheryians Coding School graduate specializing in complex UI animations, GSAP, and reactive state management.",
        link: "#certifications"
      }
    ]
  },

  socials: [
    {
      name: "LinkedIn",
      handle: "priyanshu-kumar",
      url: "https://www.linkedin.com/in/priyanshu-kumar-03310a253/",
      color: "#0a66c2"
    },
    {
      name: "GitHub",
      handle: "Priyanshu1283",
      url: "https://github.com/Priyanshu1283",
      color: "#ffffff"
    },
    {
      name: "X (Twitter)",
      handle: "@ShivamS89004941",
      url: "https://x.com/ShivamS89004941",
      color: "#000000"
    },
    {
      name: "LeetCode",
      handle: "Pranshu_066",
      url: "https://leetcode.com/u/Pranshu_066/",
      color: "#ffa116"
    }
  ],

  projects: projects,


  stack: [
    { name: "TypeScript", category: "Languages", level: "Advanced", color: "#3178c6" },
    { name: "JavaScript", category: "Languages", level: "Advanced", color: "#f7df1e" },
    { name: "Java", category: "Languages", level: "Proficient", color: "#e76f00" },
    { name: "C++", category: "Languages", level: "Proficient", color: "#00599c" },
    { name: "React", category: "Frontend", level: "Advanced", color: "#61dafb" },
    { name: "Next.js", category: "Frontend", level: "Advanced", color: "#000000" },
    { name: "Tailwind CSS", category: "Frontend", level: "Advanced", color: "#06b6d4" },
    { name: "Framer Motion", category: "Frontend", level: "Proficient", color: "#f01a7d" },
    { name: "Three.js", category: "Frontend", level: "Proficient", color: "#000000" },
    { name: "Redux Toolkit", category: "Frontend", level: "Proficient", color: "#764abc" },
    { name: "Node.js", category: "Backend & DB", level: "Advanced", color: "#339933" },
    { name: "Express.js", category: "Backend & DB", level: "Advanced", color: "#000000" },
    { name: "MongoDB", category: "Backend & DB", level: "Advanced", color: "#47a248" },
    { name: "PostgreSQL", category: "Backend & DB", level: "Proficient", color: "#4169e1" },
    { name: "Redis", category: "Backend & DB", level: "Proficient", color: "#dc382d" },
    { name: "REST APIs", category: "Backend & DB", level: "Advanced", color: "#ff5722" },
    { name: "Postman", category: "Tools & Cloud", level: "Advanced", color: "#ff6c37" },
    { name: "Git & GitHub", category: "Tools & Cloud", level: "Advanced", color: "#f05032" },
    { name: "Cloudflare Workers", category: "Tools & Cloud", level: "Proficient", color: "#f38020" },
    { name: "Vercel", category: "Tools & Cloud", level: "Advanced", color: "#000000" }
  ] as StackItem[],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "Lakshmi Narain College of Technology (LNCT), Bhopal",
      period: "11.2022 - 06.2026",
      score: "7.97 CGPA",
      details: "Focus on Algorithms, Database Systems, Computer Networks, and Cloud Architectures."
    },
    {
      degree: "Senior Secondary (Class XII)",
      institution: "Central Board of Secondary Education",
      period: "03.2019 - 05.2021",
      score: "81%",
      details: "Majored in Physics, Chemistry, and Mathematics with Distinction."
    }
  ] as EducationItem[],

  certifications: [
    {
      id: "cert-frontend",
      title: "Front-End Domination",
      issuer: "Sheryians Coding School",
      issueDate: "May 2025",
      description: "Advanced modern frontend engineering mastery covering HTML, CSS, JavaScript internals, React.js, GSAP, Locomotive Scroll, ScrollTrigger, Shery.js, Tailwind CSS, Redux, and Design Thinking.",
      tags: ["React.js", "GSAP", "Tailwind CSS", "Redux", "Shery.js", "UI/UX"],
      image: "/images/certifications/FrontEnd.png",
      verifyUrl: "https://sheryians.com"
    },
    {
      id: "cert-cohort",
      title: "Job Ready Cohort",
      issuer: "Sheryians Coding School",
      issueDate: "Sep 2025",
      description: "Comprehensive full-stack engineering and systems course covering Frontend, Data Structures & Algorithms, Backend Development, DevOps (CI/CD, Docker, Kubernetes), and Aptitude & Reasoning with real-world production projects.",
      tags: ["Full Stack", "DSA", "Backend", "DevOps", "Docker", "CI/CD"],
      image: "/images/certifications/Cohort.png",
      verifyUrl: "https://sheryians.com"
    },
    {
      id: "cert-agentforce",
      title: "Salesforce Certified Agentforce Specialist",
      issuer: "Salesforce / Trailhead",
      issueDate: "Oct 2025",
      description: "Industry-recognized certification demonstrating expertise in Salesforce Agentforce AI agents, autonomous workflows, prompt engineering, and intelligent customer relationship platforms.",
      tags: ["Agentforce", "Salesforce AI", "Autonomous Agents", "Cloud"],
      image: "/images/certifications/AgentForce.png",
      verifyUrl: "https://sforce.co/verifycerts"
    },
    {
      id: "cert-salesforce-pd1",
      title: "Salesforce Certified Platform Developer I",
      issuer: "Salesforce / Trailhead",
      issueDate: "Dec 2025",
      description: "Professional certification validating custom application development on the Lightning Platform using Apex, Visualforce, and Lightning Web Components (LWC).",
      tags: ["Salesforce", "Platform Developer", "Apex", "LWC", "Cloud"],
      image: "/images/certifications/Salesforce_PD1.png",
      verifyUrl: "https://sforce.co/verifycerts"
    },
    {
      id: "cert-salesforce-agentblazer",
      title: "Salesforce Developer With Agentblazer Champion",
      issuer: "SmartBridge & NEAT Cell-AICTE",
      issueDate: "Jul 2025",
      description: "8-Week intensive virtual internship program mastering Apex Specialist, Object Relationships, Lightning Web Components (LWC), and Agentblazer Champion superbadges.",
      tags: ["Salesforce Developer", "Apex", "LWC", "AICTE", "SmartBridge"],
      image: "/images/certifications/Salesforce.png",
      verifyUrl: "https://smartinternz.com"
    },
    {
      id: "cert-aws",
      title: "AWS Academy Cloud Foundations",
      issuer: "AWS Academy",
      issueDate: "Jul 2025",
      description: "20-hour cloud curriculum covering AWS core cloud infrastructure, security, IAM, compute (EC2), storage (S3), database architectures, and cloud networking.",
      tags: ["AWS", "Cloud Computing", "S3", "EC2", "Cloud Security"],
      image: "/images/certifications/AWS.png",
      verifyUrl: "https://www.credly.com/go/JdhxhSRq"
    },
    {
      id: "cert-iot",
      title: "Telecom Technician IoT Devices Systems",
      issuer: "Telecom Sector Skill Council & NCVET",
      issueDate: "Jan 2025",
      description: "540-hour government certified skill competency program in IoT device architecture, embedded systems, telecom networking, and hardware-software integration with Grade A distinction.",
      tags: ["IoT", "Embedded Systems", "Hardware", "Skill India", "Networking"],
      image: "/images/certifications/IOT.png",
      verifyUrl: "https://admin.skillindiadigital.gov.in"
    }
  ] as CertificationItem[],

  logbookPages: [
    {
      page: 1,
      title: "The Genesis: Crafting for the Web",
      content: `Hello 👋 I'm Priyanshu Kumar (Pranshu), a passionate Full Stack Developer driven by the art of turning pure logic into seamless digital products.

My coding journey started with a fascination for clean frontend layouts and rapidly transitioned into architectural curiosity: how distributed databases scale, how state synchronizes in real time, and how subtle micro-animations transform an ordinary interface into an unforgettable digital experience.

Every line of code I write is driven by attention to small details, solid engineering foundations, and a relentless pursuit of simplicity.`
    },
    {
      page: 2,
      title: "Engineering Philosophy & DSA Rigor",
      content: `I believe extraordinary software is born at the intersection of aesthetic discipline and algorithmic rigor.

Solving 700+ DSA problems wasn't just about passing tests—it trained my instinct to evaluate Big-O tradeoffs, prevent memory leaks, and architect clean data pipelines in production applications.

Whether building real-time collaboration engines or cloud storage portals, my focus remains constant: minimal latency, resilient architecture, and empathetic user design.`
    },
    {
      page: 3,
      title: "Current Focus & Vision",
      content: `Currently exploring advanced WebGL / 3D shaders, Edge Computing with Cloudflare Workers, and AI-augmented developer tooling.

I'm actively looking for ambitious engineering teams and impactful freelance projects where I can ship high-value features, tackle complex systems challenges, and continue growing alongside brilliant minds.

Let's collaborate and build something remarkable together!`
    }
  ],

  quotes: [
    "Into your hands will be placed the exact results of your own thoughts.",
    "You will receive that which you earn; no less, no more.",
    "Simplicity is the prerequisite for reliability.",
    "Make it work, make it right, make it fast.",
    "The details are not the details. They make the design."
  ]
};
