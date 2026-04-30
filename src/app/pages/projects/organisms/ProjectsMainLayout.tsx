"use client";

import React from "react";
import { ProjectTitle } from "../atoms/ProjectTitle";
import { TechCard } from "../molecules/TechCard";

interface Tech {
  id: number;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  useEs: string;
  useEn: string;
}

interface ProjectsMainLayoutProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  technologies: Tech[];
}

export const ProjectsMainLayout = ({ sectionRef, technologies }: ProjectsMainLayoutProps) => (
  <section className="projects-section" id="proyectos" ref={sectionRef}>
    <div className="side-progress-container">
      <div className="progress-bar-track">
        <div className="progress-bar-fill"></div>
        {technologies.map((_, i) => (
          <div 
            key={i} 
            className="progress-step-dot" 
            style={{ top: `${(i / (technologies.length - 1)) * 100}%` }}
          ></div>
        ))}
      </div>
    </div>

    <div className="tech-container">
      <div className="tech-sidebar">
        <ProjectTitle />
      </div>

      <div className="tech-content">
        {technologies.map((tech, index) => (
          <div 
            key={tech.id} 
            className={`tech-card-wrapper ${index % 2 === 0 ? "align-right" : "align-left"}`}
          >
            {/* El texto de fondo ahora está FUERA de la tarjeta para que no haya solapamiento */}
            <div className="tech-bg-text-container">
               <span className="tech-bg-text">{tech.name}</span>
            </div>
            <TechCard {...tech} index={index} />
          </div>
        ))}
      </div>
    </div>
  </section>
);
