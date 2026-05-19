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
    title: "System Inventory",
    category: "Desktop App",
    description: "Point of Sale (POS) system designed for retail stores. Includes inventory management, billing control, and real-time reporting.",
    tech: ["Python", "Qt Designer", "SQL", "SQLite"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224127/rdcuntzavhmkqdcg19jq.png",
    github: "https://github.com/Alg4ret3/SystemSystock.git",
    web: ""
  },
  {
    id: "02",
    title: "Fundación Campaes",
    category: "Web Development",
    description: "Landing page developed for a foundation focused on providing support and resources to vulnerable communities.",
    tech: ["Vite", "React", "TypeScript", "Tailwind CSS"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224146/fvu0ajaxwhcfghw8bc9c.png",
    github: "https://github.com/Alg4ret3/FundacionCampaes.git",
    web: "https://www.funpazyesperanza.org/"
  },
  {
    id: "03",
    title: "VisionTreePasto AI",
    category: "Artificial Intelligence",
    description: "AI-powered web platform for tree species identification using images with Detectron2 and FastAPI.",
    tech: ["Python", "Detectron2", "FastAPI", "Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224252/t3j8vnkwv22asbhrd7ci.png",
    github: "https://github.com/Alg4ret3/VisionTreeSystem.git",
    web: "https://www.visiontreepasto.com"
  },
  {
    id: "04",
    title: "TuplaCore Web",
    category: "Web Development",
    description: "Main website for TuplaCore, focused on web development and digital solutions.",
    tech: ["Next.js", "React", "TypeScript", "Gmail API"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224284/dztoxbsvir1du0vztnzq.png",
    github: "https://github.com/Alg4ret3/TuplaCoreWeb.git",
    web: "https://tuplacore.vercel.app"
  },
  {
    id: "05",
    title: "FitManage",
    category: "Web Development",
    description: "Web platform for gym management with membership, routines, and user administration.",
    tech: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224407/ymm4mtwoeotaywxuneoj.png",
    github: "https://github.com/Alg4ret3/FitManage.git",
    web: "https://powergym-gamma.vercel.app/"
  },
  {
    id: "06",
    title: "FarmaSystem",
    category: "Artificial Intelligence",
    description: "Landing page for a pharmacy with an AI-powered virtual assistant using the OpenAI API.",
    tech: ["React", "JavaScript", "Python", "FastAPI", "OpenAI API"],
    year: "2024",
    image: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779224552/ynvnepsgiq2wmyeymyta.png",
    github: "https://github.com/Alg4ret3/FarmaSystem.git",
    web: "https://farmasystem-bice.vercel.app/"
  },
  {
    id: "07",
    title: "System Corponariño",
    category: "Desktop App",
    description: "Corporate system to digitize water concession modules and centralize administrative processes.",
    tech: ["Python", "Qt Designer", "SQLite3"],
    year: "2023",
    image: "https://res.cloudinary.com/demo/image/upload/w_1200,h_800,c_fill/sample.jpg",
    github: "https://github.com/Alg4ret3/CorponarinoSys.git",
    web: ""
  }
];
