"use client";

import { useLang, T } from "../../context/LanguageContext";
import "./Projects.css";

const projects = [
  {
    id: 1,
    titleEs: "Estructura Minimal",
    titleEn: "Minimal Structure",
    categoryEs: "Arquitectura",
    categoryEn: "Architecture",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "large"
  },
  {
    id: 2,
    titleEs: "Geometría Urbana",
    titleEn: "Urban Geometry",
    categoryEs: "Diseño Exterior",
    categoryEn: "Exterior Design",
    image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "small"
  },
  {
    id: 3,
    titleEs: "Espacio de Luz",
    titleEn: "Space of Light",
    categoryEs: "Interiorismo",
    categoryEn: "Interior Design",
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "portrait"
  },
  {
    id: 4,
    titleEs: "Concepto Visual",
    titleEn: "Visual Concept",
    categoryEs: "Arte Digital",
    categoryEn: "Digital Art",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "wide"
  }
];

export const ProjectsSection = () => {
  const { t } = useLang();

  return (
    <section className="projects-section" id="proyectos">
      <div className="projects-header">
        <h2 className="projects-title">
          <T es="Proyectos Seleccionados" en="Selected Projects" />
        </h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className={`project-card ${project.size}`}>
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={t(project.titleEs, project.titleEn)}
                className="project-image"
                loading="lazy"
              />
            </div>
            <div className="project-info">
              <h3 className="project-name">
                <T es={project.titleEs} en={project.titleEn} />
              </h3>
              <span className="project-category">
                <T es={project.categoryEs} en={project.categoryEn} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

