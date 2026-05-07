"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShowcaseList } from "./organisms/ShowcaseList";
import "./TextShowcase.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const TextShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();
    
    const timer = setTimeout(() => {
      const textElements = gsap.utils.toArray<HTMLElement>(".ts-text", containerRef.current!);

      mm.add({
        isMobile: "(max-width: 768px)",
        isDesktop: "(min-width: 769px)",
      }, () => {
        textElements.forEach((text) => {
          const span = text.querySelector("span");

          // 1. Fase 1: Pintado de Gris a Blanco
          gsap.to(text, {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "top 60%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          // 2. Fase 2: Revelado del Span
          if (span) {
            gsap.to(span, {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
              ease: "none",
              scrollTrigger: {
                trigger: text,
                start: "top 60%",
                end: "top 30%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          }
        });
      });
      
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      mm.revert();
      clearTimeout(timer);
    };
  }, { scope: containerRef });

  return <ShowcaseList ref={containerRef} />;
};
