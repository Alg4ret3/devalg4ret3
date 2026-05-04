"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { T } from "../context/LanguageContext";
import "./SectionBridge.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export const SectionBridge = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación de dibujo de los trazos al hacer scroll
    gsap.fromTo(".bridge-path", 
      { strokeDasharray: "1500", strokeDashoffset: "1500" },
      { 
        strokeDashoffset: "0",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      }
    );

    // Animación de partículas de datos (flujo continuo)
    const paths = [".p1", ".p2", ".p3"];
    
    gsap.utils.toArray<SVGCircleElement>(".data-particle").forEach((particle, i) => {
      gsap.to(particle, {
        motionPath: {
          path: paths[i % paths.length],
          align: paths[i % paths.length],
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 4 + Math.random() * 2,
        repeat: -1,
        ease: "none",
        delay: i * 0.5
      });
    });

  }, { scope: containerRef });

  return (
    <div className="section-bridge" ref={containerRef}>
      <div className="bg-pattern"></div>
      
      <svg viewBox="0 0 1400 400" fill="none" preserveAspectRatio="xMidYMid slice" className="bridge-svg">
        {/* Trazo Principal 1 (S) */}
        <path className="bridge-path p1" d="M0 50 C 400 50, 400 350, 800 350 L 1400 350" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
        
        {/* Trazo Principal 2 (Z) */}
        <path className="bridge-path p2" d="M0 350 L 600 350 C 1000 350, 1000 50, 1400 50" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        
        {/* Trazo Principal 3 (Directo con curvas) */}
        <path className="bridge-path p3" d="M100 0 C 100 200, 1300 200, 1300 400" stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
        
        {/* Trazos cortos decorativos */}
        <path className="bridge-path" d="M400 50 L 400 150 L 500 150" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
        <path className="bridge-path" d="M1000 350 L 1000 250 L 900 250" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

        {/* Partículas fluyendo */}
        <circle className="data-particle" r="4" fill="#000" />
        <circle className="data-particle" r="3" fill="#000" />
        <circle className="data-particle" r="5" fill="#000" />
        <circle className="data-particle" r="2" fill="#000" />
        <circle className="data-particle" r="4" fill="#000" />
        <circle className="data-particle" r="3" fill="#000" />
      </svg>

      <div className="bridge-label">
        <T es="Arquitectura Conectada" en="Connected Architecture" />
      </div>
    </div>
  );
};
