"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../../context/LanguageContext";
import "./TextShowcase.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const textsData = [
  { id: 1, es1: "CÓDIGO", en1: "OPTIMIZED", es2: "OPTIMIZADO", en2: "CODE" },
  { id: 2, es1: "SOLUCIONES", en1: "FULL STACK", es2: "FULL STACK", en2: "SOLUTIONS" },
  { id: 3, es1: "DISEÑO", en1: "INTERACTIVE", es2: "INTERACTIVO", en2: "DESIGN" },
  { id: 4, es1: "SISTEMAS", en1: "SCALABLE", es2: "ESCALABLES", en2: "SYSTEMS" },
];

export const TextShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLang();

  useEffect(() => {
    // Timeout para asegurar que el DOM se asiente tras el cambio de idioma
    const timer = setTimeout(() => {
      const ctx = gsap.context((self) => {
        const textElements = self.selector!(".ts-text");
        const mm = gsap.matchMedia();

        textElements.forEach((text: HTMLElement) => {
          const span = text.querySelector("span");

          // 1. Animación de Pintado (Común)
          gsap.to(text, {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          });

          // 2. Animación de Revelado Azul/Blanco (Solo Mobile)
          if (span) {
            mm.add("(max-width: 768px)", () => {
              gsap.to(span, {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                ease: "none",
                scrollTrigger: {
                  trigger: text,
                  start: "top 40%",
                  end: "top 20%",
                  scrub: true,
                },
              });
            });
          }
        });
      }, containerRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    }, 100); // Delay más corto para el cambio de idioma

    return () => clearTimeout(timer);
  }, [lang]); // IMPORTANTE: Se dispara cada vez que cambia el idioma

  return (
    <section className="ts-section" id="about" ref={containerRef}>
      <div className="ts-container">
        {textsData.map((item) => (
          <h1 key={item.id} className="ts-text">
            {t(item.es1, item.en1)}
            <span>{t(item.es2, item.en2)}</span>
          </h1>
        ))}
      </div>
    </section>
  );
};
