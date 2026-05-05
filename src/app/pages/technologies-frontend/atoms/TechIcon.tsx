"use client";

import React from "react";
import { 
  SiGsap, 
  SiNextdotjs 
} from "react-icons/si";
import { TbBrandThreejs } from "react-icons/tb";
import { LiaReact } from "react-icons/lia";

interface TechIconProps {
  name: string;
}

export const TechIcon = ({ name }: TechIconProps) => {
  const icons: { [key: string]: React.ReactNode } = {
    "React": <LiaReact />,
    "GSAP": <SiGsap />,
    "Next.js": <SiNextdotjs />,
    "Three.js": <TbBrandThreejs />,
  };

  return (
    <div className="tf-icon">
      {icons[name] || null}
    </div>
  );
};
