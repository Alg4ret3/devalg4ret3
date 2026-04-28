"use client";

import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "Estructura Minimal",
    category: "Arquitectura",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "large"
  },
  {
    id: 2,
    title: "Geometría Urbana",
    category: "Diseño Exterior",
    image: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "small"
  },
  {
    id: 3,
    title: "Espacio de Luz",
    category: "Interiorismo",
    image: "https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "portrait"
  },
  {
    id: 4,
    title: "Concepto Visual",
    category: "Digital Art",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "wide"
  }
];

export const ProjectsSection = () => {
  return (
    <section className="projects-section" id="proyectos">
      <div className="projects-header">
        <h2 className="projects-title">Proyectos Seleccionados</h2>
      </div>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className={`project-card ${project.size}`}>
            <div className="project-image-wrapper">
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-image"
                loading="lazy"
              />
            </div>
            <div className="project-info">
              <h3 className="project-name">{project.title}</h3>
              <span className="project-category">{project.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
