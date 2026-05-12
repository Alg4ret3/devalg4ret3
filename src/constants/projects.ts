export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  image: string;
  github: string;
  web: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    title: "VIRTUAL REALITY",
    category: "Product Design",
    description: "Immersive platform developed with React and Three.js for real-time 3D environment visualization.",
    tech: ["React", "Three.js", "GSAP"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=2000&auto=format&fit=crop",
    github: "https://github.com",
    web: "https://example.com"
  },
  {
    id: "02",
    title: "DIGITAL ARCHIVE",
    category: "Web Development",
    description: "High-performance document management system with intelligent indexing and ultra-fast search.",
    tech: ["Next.js", "PostgreSQL", "Prisma"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=2000&auto=format&fit=crop",
    github: "https://github.com",
    web: "https://example.com"
  },
  {
    id: "03",
    title: "CYBER SECURITY",
    category: "Full Stack",
    description: "Security monitoring dashboard with real-time alerts and automated vulnerability analysis.",
    tech: ["Node.js", "Socket.io", "Docker"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
    github: "https://github.com",
    web: "https://example.com"
  },
  {
    id: "04",
    title: "SMART HOME",
    category: "UI/UX Design",
    description: "Centralized home automation control interface focused on accessibility and minimalist user experience.",
    tech: ["React Native", "Firebase", "Redux"],
    year: "2022",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2000&auto=format&fit=crop",
    github: "https://github.com",
    web: "https://example.com"
  }
];
