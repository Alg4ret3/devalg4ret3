"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ArrowIcon = () => (
  <svg
    className="hero-links__icon"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 13L13 1M13 1H4M13 1v9" />
  </svg>
);

export default function HeroLinks() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-links__item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 80%",
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero-links">
      <div className="hero-links__container">
        <div className="hero-links__item hero-links__tag">
          <span className="hero-links__tag-dot" />
          Disponible para proyectos
        </div>

        <nav className="hero-links__nav">
          <a href="https://github.com" target="_blank" className="hero-links__item hero-links__link">
            GitHub <ArrowIcon />
          </a>
          <a href="https://linkedin.com" target="_blank" className="hero-links__item hero-links__link">
            LinkedIn <ArrowIcon />
          </a>
          <a href="mailto:tu@email.com" className="hero-links__item hero-links__link">
            Contacto <ArrowIcon />
          </a>
        </nav>
      </div>
    </section>
  );
}
