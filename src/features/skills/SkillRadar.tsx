"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadarCategory } from "./skillsData";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  category: RadarCategory;
  index: number;
}

const SIZE = 280;          // viewBox size — espacio extra para etiquetas
const CX = SIZE / 2;       // center x
const CY = SIZE / 2;       // center y
const R = 90;              // max radius
const LEVELS = 4;          // anillos de guía

/** Redondea a N decimales para evitar diferencias SSR/cliente */
const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

/** Calcula punto (x,y) en el polígono dado ángulo y radio */
const polar = (angle: number, radius: number) => ({
  x: r4(CX + radius * Math.sin(angle)),
  y: r4(CY - radius * Math.cos(angle)),
});

/** Genera el string de puntos SVG para un polígono */
const polyPoints = (levels: number[], radius: number) =>
  levels
    .map((lvl, i) => {
      const angle = (2 * Math.PI * i) / levels.length;
      const pt = polar(angle, radius * lvl);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

export const SkillRadar = ({ category, index }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const filledRef = useRef<SVGPolygonElement>(null);

  const n = category.skills.length;
  const angles = Array.from({ length: n }, (_, i) => (2 * Math.PI * i) / n);

  // Puntos del polígono relleno (niveles reales)
  const filledPointsStr = polyPoints(
    category.skills.map((s) => s.level),
    R
  );

  // Polígono máximo (nivel 1) para la guía exterior
  const outerPointsStr = polyPoints(Array(n).fill(1), R);

  useEffect(() => {
    const svg = svgRef.current;
    const filled = filledRef.current;
    if (!svg || !filled) return;

    const ctx = gsap.context(() => {
      // ── Polígono relleno: crece desde centro ──
      gsap.fromTo(
        filled,
        { scale: 0, transformOrigin: `${CX}px ${CY}px`, opacity: 0 }, // CX/CY se calcula en runtime
        {
          scale: 1,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: svg,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Labels: fade-in stagger ──
      const labels = labelRefs.current.filter(Boolean);
      gsap.fromTo(
        labels,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          stagger: 0.07,
          ease: "power2.out",
          delay: index * 0.15 + 0.4,
          scrollTrigger: {
            trigger: svg,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, svg);

    return () => ctx.revert();
  }, [index]);

  return (
    <div className="sk-radar-wrap">
      <span className="sk-radar-label">{category.label}</span>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="sk-radar-svg"
        aria-label={`Radar chart for ${category.label}`}
      >
        {/* ── Anillos de guía ── */}
        {Array.from({ length: LEVELS }).map((_, lvl) => {
          const ratio = (lvl + 1) / LEVELS;
          return (
            <polygon
              key={lvl}
              points={polyPoints(Array(n).fill(ratio), R)}
              className="sk-radar-guide"
            />
          );
        })}

        {/* ── Ejes ── */}
        {angles.map((angle, i) => {
          const outer = polar(angle, R);
          return (
            <line
              key={i}
              x1={CX} y1={CY}
              x2={outer.x} y2={outer.y}
              className="sk-radar-axis"
            />
          );
        })}

        {/* ── Polígono exterior (max) ── */}
        <polygon points={outerPointsStr} className="sk-radar-outer" />

        {/* ── Polígono relleno (niveles reales) ── */}
        <polygon
          ref={filledRef}
          points={filledPointsStr}
          className="sk-radar-filled"
        />

        {/* ── Puntos en vértices rellenos ── */}
        {category.skills.map((skill, i) => {
          const pt = polar(angles[i], R * skill.level);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={3}
              className="sk-radar-dot"
            />
          );
        })}

        {/* ── Etiquetas ── */}
        {category.skills.map((skill, i) => {
          const LABEL_R = R + 32;
          const pt = polar(angles[i], LABEL_R);

          // Anclar texto según posición
          let anchor: "middle" | "start" | "end" = "middle";
          if (pt.x < CX - 10) anchor = "end";
          if (pt.x > CX + 10) anchor = "start";

          return (
            <text
              key={i}
              ref={(el) => { labelRefs.current[i] = el; }}
              x={pt.x}
              y={pt.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="sk-radar-text"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
