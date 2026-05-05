"use client";

import React from "react";
import { 
  SiFastapi, 
  SiDocker, 
  SiN8N 
} from "react-icons/si";
import { RiNodejsLine } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { GiArtificialIntelligence } from "react-icons/gi";

interface TechIconProps {
  name: string;
}

export const TechIcon = ({ name }: TechIconProps) => {
  const icons: { [key: string]: React.ReactNode } = {
    "Node.js": <RiNodejsLine />,
    "FastAPI": <SiFastapi />,
    "PostgreSQL": <BiLogoPostgresql />,
    "Docker": <SiDocker />,
    "n8n": <SiN8N />,
    "ML Models": <GiArtificialIntelligence />,
  };

  return (
    <div className="tb-icon">
      {icons[name] || null}
    </div>
  );
};
