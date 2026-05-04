"use client";

import React from "react";
import { BackendTitle } from "../atoms/BackendTitle";
import { TechCard } from "../molecules/TechCard";

interface Tech {
  id: number;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  useEs: string;
  useEn: string;
}

interface BackendMainLayoutProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  technologies: Tech[];
}

export const BackendMainLayout = ({ sectionRef, technologies }: BackendMainLayoutProps) => (
  <section className="projects-section backend-section flipped" id="backend" ref={sectionRef}>
    {/* Barra de progreso a la derecha para el backend */}
    <div className="side-progress-container progress-right">
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
      {/* Contenido (Cards) a la izquierda */}
      <div className="tech-content">
        {technologies.map((tech, index) => (
          <div 
            key={tech.id} 
            className={`tech-card-wrapper ${index % 2 === 0 ? "align-left" : "align-right"}`}
          >
            <div className="tech-bg-text-container">
               <span className="tech-bg-text">{tech.name}</span>
            </div>
            <TechCard {...tech} index={index} />
          </div>
        ))}
      </div>

      {/* Sidebar (Título) a la derecha */}
      <div className="tech-sidebar">
        <BackendTitle />
      </div>
    </div>
  </section>
);
