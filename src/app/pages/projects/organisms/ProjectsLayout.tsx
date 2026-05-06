"use client";

import React from "react";
import { ProjectCard } from "../molecules/ProjectCard";

interface Project {
  id: number;
  title: string;
  descriptionEs: string;
  descriptionEn: string;
  image: string;
  tags: string[];
}

interface ProjectsLayoutProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  projects: Project[];
}

export const ProjectsLayout = ({ sectionRef, containerRef, projects }: ProjectsLayoutProps) => (
  <section className="pj-section" id="projects" ref={sectionRef}>
    <div className="pj-container">
      <div className="pj-header">
        <h2 className="pj-main-title">
          <span className="pj-title-es">Proyectos</span>
          <span className="pj-title-en">Projects</span>
        </h2>
        <p className="pj-subtitle">Explora mi portafolio de desarrollos</p>
      </div>

      <div className="pj-scroll-wrapper">
        <div className="pj-cards-container" ref={containerRef}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="pj-scroll-indicator">
        <span className="pj-scroll-text">Scroll</span>
        <div className="pj-scroll-line"></div>
      </div>
    </div>
  </section>
);
