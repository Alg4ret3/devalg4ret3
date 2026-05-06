"use client";

import React from "react";
import { BackendTitle } from "../atoms/BackendTitle";
import { TechCard } from "../../../components/tech";

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
  <section className="tb-section" id="backend" ref={sectionRef}>
    <div className="tb-container">
      {/* Sidebar (Título) arriba para que se vea correctamente en el flujo vertical */}
      <div className="tb-sidebar">
        <BackendTitle />
      </div>

      {/* Contenido (Cards) */}
      <div className="tb-content">
        {technologies.map((tech, index) => (
          <div
            key={tech.id}
            className={`tb-card-wrapper ${index % 2 === 0 ? "tb-align-left" : "tb-align-right"}`}
          >
            <div className="tb-bg-text-container">
              <span className="tb-bg-text">{tech.name}</span>
              <span className="tb-bg-text">{tech.name}</span>
              <span className="tb-bg-text">{tech.name}</span>
            </div>
             <TechCard
               name={tech.name}
               descriptionEs={tech.descriptionEs}
               descriptionEn={tech.descriptionEn}
               useEs={tech.useEs}
               useEn={tech.useEn}
               index={index}
               variant="backend"
             />
          </div>
        ))}
      </div>
    </div>
  </section>
);
