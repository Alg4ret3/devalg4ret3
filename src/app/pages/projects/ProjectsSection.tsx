"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ProjectsMainLayout } from "./organisms/ProjectsMainLayout";
import "./Projects.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  {
    id: 1,
    name: "React",
    descriptionEs: "Biblioteca líder para interfaces dinámicas.",
    descriptionEn: "Leading library for dynamic interfaces.",
    useEs: "La utilizo para crear aplicaciones web rápidas, escalables y con una experiencia de usuario fluida.",
    useEn: "I use it to create fast, scalable web applications with a seamless user experience.",
  },
  {
    id: 2,
    name: "GSAP",
    descriptionEs: "El estándar de oro en animaciones web.",
    descriptionEn: "The gold standard in web animation.",
    useEs: "Fundamental para dar vida a los diseños con movimientos complejos y transiciones de alta calidad.",
    useEn: "Essential for bringing designs to life with complex movements and high-quality transitions.",
  },
  {
    id: 3,
    name: "Next.js",
    descriptionEs: "Framework de React para producción.",
    descriptionEn: "The React framework for production.",
    useEs: "Lo empleo para optimizar el rendimiento, el SEO y la estructura general de proyectos robustos.",
    useEn: "I use it to optimize performance, SEO, and the overall structure of robust projects.",
  },
  {
    id: 4,
    name: "Three.js",
    descriptionEs: "Gráficos 3D en el navegador.",
    descriptionEn: "3D graphics in the browser.",
    useEs: "Para integrar experiencias inmersivas y elementos tridimensionales interactivos en la web.",
    useEn: "To integrate immersive experiences and interactive three-dimensional elements into the web.",
  }
];

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Solo animamos la barra de progreso
    gsap.to(".progress-bar-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".tech-content",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    // Parallax simple para los textos de fondo
    gsap.utils.toArray(".tech-bg-text").forEach((text: any) => {
      gsap.to(text, {
        y: -150,
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <ProjectsMainLayout
      sectionRef={sectionRef}
      technologies={technologies}
    />
  );
};
