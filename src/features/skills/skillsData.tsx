import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiGsap, SiThreedotjs, SiAstro, SiVite,
  SiNodedotjs, SiNestjs, SiFastapi, SiPython,
  SiGit, SiDocker, SiPostgresql, SiMysql, SiSvelte
} from "react-icons/si";

export interface Skill {
  icon: React.ReactNode;
  name: string;
}

export interface SkillCategory {
  label: string;
  number: string;
  skills: Skill[];
}

// ── Ticker data ──────────────────────────────────────
export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    number: "01",
    skills: [
      { icon: <SiHtml5 />,      name: "HTML5"      },
      { icon: <SiCss />,        name: "CSS3"        },
      { icon: <SiJavascript />, name: "JavaScript"  },
      { icon: <SiTypescript />, name: "TypeScript"  },
      { icon: <SiReact />,      name: "React"       },
      { icon: <SiNextdotjs />,  name: "Next.js"     },
      { icon: <SiGsap />,       name: "GSAP"        },
      { icon: <SiThreedotjs />, name: "Three.js"    },
      { icon: <SiSvelte />,     name: "Svelte"      },
    ],
  },
  {
    label: "Backend & Tools",
    number: "02",
    skills: [
      { icon: <SiAstro />,      name: "Astro"       },
      { icon: <SiVite />,       name: "Vite"        },
      { icon: <SiNodedotjs />,  name: "Node.js"     },
      { icon: <SiNestjs />,     name: "NestJS"      },
      { icon: <SiFastapi />,    name: "FastAPI"     },
      { icon: <SiPython />,     name: "Python"      },
      { icon: <SiGit />,        name: "Git"         },
      { icon: <SiDocker />,     name: "Docker"      },
      { icon: <SiMysql />,      name: "MySQL"       },
    ],
  },
];

// ── Radar data ───────────────────────────────────────
export interface RadarSkill {
  name: string;
  level: number; // 0 – 1
}

export interface RadarCategory {
  label: string;
  skills: RadarSkill[];
}

export const radarCategories: RadarCategory[] = [
  {
    label: "Frontend & Animation",
    skills: [
      { name: "React",      level: 0.90 },
      { name: "Next.js",    level: 0.88 },
      { name: "GSAP",       level: 0.95 },
      { name: "Three.js",   level: 0.75 },
      { name: "Astro",      level: 0.80 },
      { name: "Svelte",     level: 0.70 },
      { name: "Vite",       level: 0.95 },
    ],
  },
  {
    label: "Backend & Database",
    skills: [
      { name: "Node.js",    level: 0.85 },
      { name: "NestJS",     level: 0.80 },
      { name: "FastAPI",    level: 0.75 },
      { name: "PostgreSQL", level: 0.82 },
      { name: "MySQL",      level: 0.85 },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git",        level: 0.92 },
      { name: "Docker",     level: 0.80 },
      { name: "Vite",       level: 0.88 },
      { name: "Vercel",     level: 0.85 },
      { name: "Figma",      level: 0.70 },
      { name: "n8n",        level: 0.70 },
    ],
  },
  {
    label: "Languages",
    skills: [
      { name: "JavaScript", level: 0.95 },
      { name: "TypeScript", level: 0.92 },
      { name: "Python",     level: 0.95 },
      { name: "HTML5",      level: 0.98 },
      { name: "CSS3",       level: 0.95 },
    ],
  },
];