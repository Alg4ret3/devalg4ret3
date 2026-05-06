"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "../../context/LanguageContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "Nexus AI Platform",
    desc: "Análisis de sentimientos en tiempo real con modelos transformadores.",
    enDesc: "Real-time sentiment analysis with transformer models.",
    tech: ["React", "Python", "TensorFlow"],
    img: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  },
  {
    id: 2,
    title: "Quantum E-com",
    desc: "Motor de comercio electrónico ultrarrápido con arquitectura headless.",
    enDesc: "Ultra-fast e-commerce engine with headless architecture.",
    tech: ["Next.js", "Shopify", "Node.js"],
    img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  },
  {
    id: 3,
    title: "Lumina UI Kit",
    desc: "Biblioteca de componentes de alta gama para aplicaciones empresariales.",
    enDesc: "High-end component library for enterprise applications.",
    tech: ["TypeScript", "Tailwind", "Storybook"],
    img: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  },
  {
    id: 4,
    title: "SkyNet Infra",
    desc: "Monitoreo de infraestructura distribuida en la nube a gran escala.",
    enDesc: "Large-scale distributed cloud infrastructure monitoring.",
    tech: ["Go", "Docker", "Kubernetes"],
    img: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  },
  {
    id: 5,
    title: "Vision Core",
    desc: "Detección de objetos y segmentación para robótica industrial.",
    enDesc: "Object detection and segmentation for industrial robotics.",
    tech: ["C++", "OpenCV", "CUDA"],
    img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  },
  {
    id: 6,
    title: "Auth Sentinel",
    desc: "Sistema de autenticación biométrica de próxima generación.",
    enDesc: "Next-generation biometric authentication system.",
    tech: ["Node.js", "Express", "MongoDB"],
    img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
    github: "#",
    web: "#"
  }
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();

  useGSAP(() => {
    const container = containerRef.current;
    const trigger = triggerRef.current;
    if (!container || !trigger) return;

    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 769px)",
      isMobile: "(max-width: 768px)"
    }, (context) => {
      const { isDesktop } = context?.conditions || {};
      const panels = gsap.utils.toArray(".pj-item-card");
      
      const getXDist = () => {
        if (isDesktop) {
          // 2 projects per view (50vw each)
          return (panels.length / 2 - 1) * window.innerWidth;
        } else {
          // 1 project per view (100vw each)
          return (panels.length - 1) * window.innerWidth;
        }
      };

      gsap.to(container, {
        x: () => -getXDist(),
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${getXDist()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="pj-section" id="projects" ref={triggerRef}>
      <div className="pj-container" ref={sectionRef}>
        <div className="pj-scroll-wrapper">
          <div className="pj-cards-container" ref={containerRef}>
            {projects.map((project) => (
              <div key={project.id} className="pj-item-card">
                <div className="pj-card-img-wrapper">
                  <img src={project.img} alt={project.title} className="pj-card-img" />
                  <div className="pj-card-overlay"></div>
                </div>

                <div className="pj-card-content">
                  <div className="pj-card-header">
                    <h3 className="pj-card-title">{project.title}</h3>
                    <p className="pj-card-desc">{t(project.desc, project.enDesc)}</p>
                  </div>

                  <div className="pj-card-tech">
                    {project.tech.map((s, idx) => (
                      <span key={idx} className="pj-tech-tag">{s}</span>
                    ))}
                  </div>

                  <div className="pj-card-actions">
                    <a href={project.github} className="pj-btn pj-btn-outline" target="_blank" rel="noreferrer">
                      <FaGithub /> GitHub
                    </a>
                    <a href={project.web} className="pj-btn pj-btn-primary" target="_blank" rel="noreferrer">
                      <FaExternalLinkAlt /> Web
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

