"use client";

import React from "react";
import { TechnologiesFrontendTitle } from "../atoms/TechnologiesFrontendTitle";
import { TechCard } from "../molecules/TechCard";

interface Tech {
  id: number;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  useEs: string;
  useEn: string;
}

interface TechnologiesFrontendLayoutProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  technologies: Tech[];
}

export const TechnologiesFrontendLayout = ({ sectionRef, technologies }: TechnologiesFrontendLayoutProps) => (
  <section className="tf-section" id="frontend" ref={sectionRef}>
    <div className="tf-container">
      <div className="tf-sidebar">
        <TechnologiesFrontendTitle />
      </div>

      <div className="tf-content">
        {technologies.map((tech, index) => (
          <div 
            key={tech.id} 
            className={`tf-card-wrapper ${index % 2 === 0 ? "tf-align-right" : "tf-align-left"}`}
          >
            {/* El texto de fondo ahora está FUERA de la tarjeta para que no haya solapamiento */}
            <div className="tf-bg-text-container">
               <span className="tf-bg-text">{tech.name}</span>
            </div>
            <TechCard {...tech} index={index} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
