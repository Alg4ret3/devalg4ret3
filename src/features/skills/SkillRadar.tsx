import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RadarCategory } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  category: RadarCategory;
  index: number;
}

const SIZE = 280;          // viewBox size — extra space for labels
const CX = SIZE / 2;       // center x
const CY = SIZE / 2;       // center y
const R = 90;              // max radius
const LEVELS = 4;          // guide rings

/** Rounds to N decimals to avoid SSR/client differences */
const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

/** Calculates point (x,y) in the polygon given angle and radius */
const polar = (angle: number, radius: number) => ({
  x: r4(CX + radius * Math.sin(angle)),
  y: r4(CY - radius * Math.cos(angle)),
});

/** Generates the SVG points string for a polygon */
const polyPoints = (levels: number[], radius: number) =>
  levels
    .map((lvl, i) => {
      const angle = (2 * Math.PI * i) / levels.length;
      const pt = polar(angle, radius * lvl);
      return `${pt.x},${pt.y}`;
    })
    .join(" ");

export const SkillRadar = ({ category, index }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const filledRef = useRef<SVGPolygonElement>(null);
  const [clickedSkill, setClickedSkill] = useState<number | null>(null);

  const n = category.skills.length;
  const angles = Array.from({ length: n }, (_, i) => (2 * Math.PI * i) / n);

  // Points of the filled polygon (actual levels)
  const filledPointsStr = polyPoints(
    category.skills.map((s) => s.level),
    R
  );

  // Outer polygon (level 1) for the exterior guide
  const outerPointsStr = polyPoints(Array(n).fill(1), R);

  useEffect(() => {
    const svg = svgRef.current;
    const filled = filledRef.current;
    if (!svg || !filled) return;

    const ctx = gsap.context(() => {
      // ── Initial Entry Animation ──
      gsap.fromTo(
        filled,
        { scale: 0, transformOrigin: `${CX}px ${CY}px`, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: svg,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Labels fade-in
      const labels = labelRefs.current.filter(Boolean);
      gsap.fromTo(
        labels,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
          delay: index * 0.15 + 0.5,
          scrollTrigger: {
            trigger: svg,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, [index]);

  // ── INTERACTIONS ──
  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!wrapRef.current || !svgRef.current) return;

    const { left, top, width, height } = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateY = ((x - width / 2) / (width / 2)) * 12;
    const rotateX = ((y - height / 2) / (height / 2)) * -12;

    gsap.to(svgRef.current, {
      rotateY,
      rotateX,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!wrapRef.current || !svgRef.current) return;
    gsap.to(svgRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleSkillEnter = (i: number) => {
    // Only animate dot if it's not the clicked one (or just do it anyway)
    gsap.to(`.sk-dot-${index}-${i}`, { 
      fill: "#000000", 
      r: 6, 
      duration: 0.25, 
      ease: "back.out(2)" 
    });
  };

  const handleSkillLeave = (i: number) => {
    if (clickedSkill === i) return; // Keep it black/big if clicked
    gsap.to(`.sk-dot-${index}-${i}`, { 
      fill: "var(--text-primary)", 
      r: 3, 
      duration: 0.25 
    });
  };

  const handleSkillClick = (i: number) => {
    setClickedSkill(clickedSkill === i ? null : i);
    
    // If we click a new one, reset the visual of the previous one
    if (clickedSkill !== null && clickedSkill !== i) {
      gsap.to(`.sk-dot-${index}-${clickedSkill}`, { 
        fill: "var(--text-primary)", 
        r: 3, 
        duration: 0.25 
      });
    }
  };

  return (
    <div 
      className="sk-radar-wrap"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="sk-radar-label">{category.label}</span>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="sk-radar-svg"
        aria-label={`Radar chart for ${category.label}`}
      >
        {/* ── Guide rings ── */}
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

        {/* ── Axes ── */}
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

        {/* ── Outer polygon (max) ── */}
        <polygon points={outerPointsStr} className="sk-radar-outer" />

        {/* ── Filled polygon (actual levels) ── */}
        <polygon
          ref={filledRef}
          points={filledPointsStr}
          className="sk-radar-filled"
        />

        {/* ── Dots at filled vertices ── */}
        {category.skills.map((skill, i) => {
          const pt = polar(angles[i], R * skill.level);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={clickedSkill === i ? 6 : 3}
              fill={clickedSkill === i ? "#000000" : "var(--text-primary)"}
              className={`sk-radar-dot sk-dot-${index}-${i}`}
              onMouseEnter={() => handleSkillEnter(i)}
              onMouseLeave={() => handleSkillLeave(i)}
              onClick={() => handleSkillClick(i)}
              style={{ cursor: "pointer", touchAction: "none" }}
            />
          );
        })}

        {/* ── Labels ── */}
        {category.skills.map((skill, i) => {
          const LABEL_R = R + 32;
          const pt = polar(angles[i], LABEL_R);

          let anchor: "middle" | "start" | "end" = "middle";
          if (pt.x < CX - 10) anchor = "end";
          if (pt.x > CX + 10) anchor = "start";

          const isSelected = clickedSkill === i;
          const text = isSelected 
            ? `${skill.name} ${(skill.level * 100).toFixed(0)}%` 
            : skill.name;

          return (
            <text
              key={i}
              ref={(el) => { labelRefs.current[i] = el; }}
              x={pt.x}
              y={pt.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="sk-radar-text"
              onMouseEnter={() => handleSkillEnter(i)}
              onMouseLeave={() => handleSkillLeave(i)}
              onClick={() => handleSkillClick(i)}
              style={{ cursor: "pointer", userSelect: "none", fontWeight: isSelected ? "900" : "500" }}
            >
              {text}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
