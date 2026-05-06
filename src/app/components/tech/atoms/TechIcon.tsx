"use client";

import React from "react";
import {
  SiGsap,
  SiNextdotjs,
  SiFastapi,
  SiDocker,
  SiN8N,
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { LiaReact } from "react-icons/lia";
import { RiNodejsLine } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";

type TechVariant = "frontend" | "backend";

interface TechIconProps {
  name: string;
  variant: TechVariant;
}

const iconMap: Record<string, React.ReactNode> = {
  "React": <LiaReact />,
  "GSAP": <SiGsap />,
  "Next.js": <SiNextdotjs />,
  "Three.js": <TbBrandThreejs />,
  "Node.js": <RiNodejsLine />,
  "FastAPI": <SiFastapi />,
  "PostgreSQL": <BiLogoPostgresql />,
  "Docker": <SiDocker />,
  "n8n": <SiN8N />,
  "ML Models": <GiArtificialIntelligence />,
};

export const TechIcon = ({ name, variant }: TechIconProps) => {
  const prefix = variant === "frontend" ? "tf" : "tb";
  return (
    <div className={`${prefix}-icon`}>
      {iconMap[name] || null}
    </div>
  );
};
