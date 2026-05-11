import {
  SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiReact, SiNextdotjs, SiGsap, SiThreedotjs, SiAstro, SiVite,
  SiNodedotjs, SiNestjs, SiFastapi, SiPython,
  SiGit, SiDocker,
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
    label: "Frontend Core",
    skills: [
      { name: "HTML5",      level: 0.97 },
      { name: "CSS3",       level: 0.95 },
      { name: "JavaScript", level: 0.92 },
      { name: "TypeScript", level: 0.88 },
      { name: "React",      level: 0.90 },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "Next.js",  level: 0.88 },
      { name: "Astro",    level: 0.75 },
      { name: "GSAP",     level: 0.85 },
      { name: "Three.js", level: 0.65 },
      { name: "Vite",     level: 0.82 },
    ],
  },
  {
    label: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 0.80 },
      { name: "NestJS",  level: 0.72 },
      { name: "FastAPI", level: 0.70 },
      { name: "Python",  level: 0.75 },
      { name: "Docker",  level: 0.65 },
    ],
  },
];