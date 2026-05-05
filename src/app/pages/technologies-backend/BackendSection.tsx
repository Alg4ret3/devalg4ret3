"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BackendMainLayout } from "./organisms/BackendMainLayout";
import "./Backend.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const technologies = [
  {
    id: 1,
    name: "Node.js",
    descriptionEs: "Entorno de ejecución de JavaScript para el servidor.",
    descriptionEn: "JavaScript runtime environment for the server.",
    useEs: "Lo utilizo para construir APIs rápidas y escalables que manejan múltiples conexiones simultáneas.",
    useEn: "I use it to build fast and scalable APIs that handle multiple simultaneous connections.",
  },
  {
    id: 2,
    name: "FastAPI",
    descriptionEs: "Framework moderno de Python para APIs de alto rendimiento.",
    descriptionEn: "Modern Python framework for high-performance APIs.",
    useEs: "Lo utilizo para crear backends robustos y veloces, aprovechando el tipado de Python y la validación automática.",
    useEn: "I use it to build robust and fast backends, taking advantage of Python typing and automatic validation.",
  },
  {
    id: 3,
    name: "PostgreSQL",
    descriptionEs: "Base de datos relacional potente y robusta.",
    descriptionEn: "Powerful and robust relational database.",
    useEs: "La elijo por su fiabilidad y soporte para consultas complejas en aplicaciones críticas.",
    useEn: "I choose it for its reliability and support for complex queries in critical applications.",
  },
  {
    id: 4,
    name: "Docker",
    descriptionEs: "Plataforma de contenedores para despliegue.",
    descriptionEn: "Container platform for deployment.",
    useEs: "Para asegurar que el entorno de desarrollo sea idéntico al de producción mediante la contenedorización.",
    useEn: "To ensure that the development environment is identical to production through containerization.",
  },
  {
    id: 5,
    name: "n8n",
    descriptionEs: "Automatización de flujos de trabajo basada en nodos.",
    descriptionEn: "Node-based workflow automation.",
    useEs: "La empleo para integrar diversas herramientas y automatizar procesos complejos sin necesidad de escribir código repetitivo.",
    useEn: "I use it to integrate various tools and automate complex processes without the need to write repetitive code.",
  },
  {
    id: 6,
    name: "ML Models",
    descriptionEs: "Modelos de Machine Learning y algoritmos predictivos.",
    descriptionEn: "Machine Learning models and predictive algorithms.",
    useEs: "Para desarrollar e integrar soluciones de inteligencia artificial que extraen valor de los datos mediante predicciones precisas.",
    useEn: "To develop and integrate artificial intelligence solutions that extract value from data through accurate predictions.",
  }
];

export const BackendSection = () => {
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
    gsap.utils.toArray<HTMLElement>(".tech-bg-text").forEach((text) => {
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
    <BackendMainLayout
      sectionRef={sectionRef}
      technologies={technologies}
    />
  );
};
