"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 3, suffix: "+", label: "Años de experiencia" },
  { value: 20, suffix: "+", label: "Proyectos completados" },
  { value: 5, suffix: "", label: "Tecnologías dominadas" },
];

const TOOLS = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Python", "PostgreSQL", "Git", "Figma",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Section label ────────────────────────────────── */
      gsap.fromTo(
        ".about__label",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about__label",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 2. Heading lines reveal ─────────────────────────── */
      const headingLines = gsap.utils.toArray<HTMLElement>(".about__heading-line");
      headingLines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 80, opacity: 0, rotateX: 40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.12,
          }
        );
      });

      /* ── 3. Description ──────────────────────────────────── */
      gsap.fromTo(
        ".about__text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about__text",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 4. Divider ──────────────────────────────────────── */
      gsap.fromTo(
        ".about__divider",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".about__divider",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 5. Stats count up ───────────────────────────────── */
      const statItems = gsap.utils.toArray<HTMLElement>(".about__stat");
      statItems.forEach((stat, i) => {
        const valueEl = stat.querySelector(".about__stat-value") as HTMLElement;
        const target = parseInt(valueEl.dataset.value || "0", 10);

        gsap.fromTo(
          stat,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.15,
            scrollTrigger: {
              trigger: ".about__stats",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power1.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: ".about__stats",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate() {
            const suffix = valueEl.dataset.suffix || "";
            valueEl.textContent = Math.round(counter.val) + suffix;
          },
        });
      });

      /* ── 6. Tools stagger ────────────────────────────────── */
      gsap.fromTo(
        ".about__tool",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
          stagger: 0.07,
          scrollTrigger: {
            trigger: ".about__tools",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── 7. Vertical accent line scrub ───────────────────── */
      gsap.fromTo(
        ".about__accent-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      {/* Vertical accent line */}
      <div className="about__accent-line" />

      <div className="about__container">
        {/* Label */}
        <span className="about__label">Sobre mí</span>

        {/* Heading */}
        <h2 className="about__heading">
          <span className="about__heading-line">Creo software que</span>
          <span className="about__heading-line">resuelve problemas</span>
          <span className="about__heading-line">
            <em>reales.</em>
          </span>
        </h2>

        {/* Description */}
        <div className="about__text">
          <p>
            Soy un desarrollador enfocado en construir productos digitales
            que combinan <strong>rendimiento</strong>,{" "}
            <strong>diseño intencional</strong> y{" "}
            <strong>código mantenible</strong>. Cada línea que escribo tiene
            un propósito.
          </p>
          <p>
            Trabajo principalmente con el ecosistema JavaScript/TypeScript —
            React, Next.js, Node — y me especializo en crear interfaces que
            no solo se ven bien, sino que <em>funcionan</em> impecablemente.
          </p>
        </div>

        {/* Divider */}
        <hr className="about__divider" />

        {/* Stats */}
        <div className="about__stats">
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="about__stat">
              <span
                className="about__stat-value"
                data-value={value}
                data-suffix={suffix}
              >
                0
              </span>
              <span className="about__stat-label">{label}</span>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="about__tools">
          <span className="about__tools-title">Stack & herramientas</span>
          <div className="about__tools-grid">
            {TOOLS.map((tool) => (
              <span key={tool} className="about__tool">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
