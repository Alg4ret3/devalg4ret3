"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { T } from "../../context/LanguageContext";
import "./SectionBridge.css";

export const SectionBridge = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animación premium: Tiempos más largos, transiciones de opacidad (crossfade)
    // y curvas de aceleración más elegantes (sine.inOut, power3.inOut).
    const tl = gsap.timeline({ repeat: -1, defaults: { transformOrigin: "50% 50%" } });

    const dur = 3.66; // Duración base (ciclo total de 5.5s, determinado por dur * 1.5)
    const scaleMax = 4; // Aseguramos que cubra toda la pantalla al expandirse

    // 1. Círculo de fondo que late suavemente de manera continua
    gsap.to(".bridge-circle1", {
      scale: 1.2,
      opacity: 0.5,
      duration: 4.4, // Ajustado proporcionalmente
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 2. Primera onda expansiva
    // Crece lentamente y se desvanece de forma fluida
    tl.fromTo(".bridge-circle2", 
      { scale: 0, opacity: 0 },
      { scale: 0.6, opacity: 0.6, duration: dur * 0.4, ease: "power2.out" }, 
      0
    )
    .to(".bridge-circle2", { scale: scaleMax, opacity: 0, duration: dur * 0.6, ease: "power3.inOut" }, dur * 0.4);

    // 3. Segunda onda expansiva
    // Sigue a la primera con un leve desfase
    tl.fromTo(".bridge-circle3", 
      { scale: 0, opacity: 0 },
      { scale: 0.4, opacity: 0.4, duration: dur * 0.5, ease: "power2.out" }, 
      dur * 0.3
    )
    .to(".bridge-circle3", { scale: scaleMax, opacity: 0, duration: dur * 0.7, ease: "power3.inOut" }, dur * 0.8);

    // 4. Detalle: Anillo de energía
    tl.fromTo(".bridge-smallCircle", 
      { attr: { r: 5 }, strokeWidth: 10, opacity: 1, scale: 1 },
      { attr: { r: 150 }, strokeWidth: 0, opacity: 0, scale: 2, duration: dur * 0.8, ease: "expo.out" }, 
      dur * 0.2
    );

    // 5. Detalles geométricos: Triángulos que flotan y rotan elegantemente
    tl.fromTo(".bridge-triangle1",
      { y: 50, x: 50, scale: 0, rotation: 0, opacity: 0 },
      { y: -120, x: -120, scale: 1.5, rotation: 180, opacity: 0, duration: dur * 0.9, ease: "power3.out" },
      dur * 0.1
    );

    tl.fromTo(".bridge-triangle2",
      { y: -50, x: -50, scale: 0, rotation: 180, opacity: 0 },
      { y: 120, x: 120, scale: 1.5, rotation: -180, opacity: 0, duration: dur * 0.9, ease: "power3.out" },
      dur * 0.1
    );

    // 6. Líneas tecnológicas cruzadas
    tl.fromTo(".bridge-line1",
      { strokeDashoffset: 150, opacity: 0 },
      { strokeDashoffset: -150, opacity: 0.6, duration: dur, ease: "power2.inOut" },
      0
    );

    tl.fromTo(".bridge-line2",
      { strokeDashoffset: -150, opacity: 0 },
      { strokeDashoffset: 150, opacity: 0.6, duration: dur, ease: "power2.inOut" },
      0
    );

    // 7. Movimiento de rotación general ultra-lento en todo el SVG para dar vida
    gsap.to(".bridge-anim-svg", {
      rotation: 10,
      scale: 1.05,
      duration: 8.8, // Ajustado proporcionalmente
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%"
    });

  }, { scope: containerRef });

  return (
    <div className="section-bridge-anim" ref={containerRef}>
      <svg viewBox="-500 -500 1000 1000" className="bridge-anim-svg" preserveAspectRatio="xMidYMid slice">
        {/* Círculo base estático/latiendo usando brand-9 */}
        <circle className="bridge-circle1" cx="0" cy="0" r="300" fill="var(--brand-9)" opacity="0.3" />
        
        {/* Círculos expansivos usando tonos muy oscuros */}
        <circle className="bridge-circle2" cx="0" cy="0" r="300" fill="var(--brand-9)" />
        <circle className="bridge-circle3" cx="0" cy="0" r="300" fill="var(--brand-8)" />

        {/* Ondas y partículas */}
        <circle className="bridge-smallCircle" cx="0" cy="0" r="5" fill="none" stroke="var(--brand-5)" />

        {/* Polígonos acentuados con la paleta global */}
        <polygon className="bridge-triangle1" points="0,-20 17.3,10 -17.3,10" fill="var(--brand-5)" />
        <polygon className="bridge-triangle2" points="0,-20 17.3,10 -17.3,10" fill="var(--brand-6)" />

        {/* Líneas dinámicas formando una X */}
        <line className="bridge-line1" x1="-300" y1="-150" x2="300" y2="150" stroke="var(--brand-1)" strokeWidth="1.5" strokeDasharray="150 150" strokeLinecap="round" />
        <line className="bridge-line2" x1="-300" y1="150" x2="300" y2="-150" stroke="var(--brand-4)" strokeWidth="1.5" strokeDasharray="150 150" strokeLinecap="round" />
      </svg>

      {/* Título central estilo Glassmorphism */}
      <div className="bridge-content">
        <div className="bridge-label">
          <T es="Transformando Ideas" en="Transforming Ideas" />
        </div>
        <div className="bridge-sub">
          <T es="Innovación & Desarrollo" en="Innovation & Development" />
        </div>
      </div>
    </div>
  );
};
