"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./GitHubGraph.css";

gsap.registerPlugin(ScrollTrigger);

interface Day {
  count: number;
  date: string;
}

export const GitHubGraph = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generar datos simulados
  const data = useMemo(() => {
    const days: Day[] = [];
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Normalizar fecha
    
    const pseudoRandom = (s: number) => {
      const x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 364; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - (363 - i));
      
      const seed = i + 123;
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const rand = pseudoRandom(seed);
      const hasActivity = rand > 0.2;
      const count = hasActivity 
        ? Math.floor(pseudoRandom(seed + 1) * (isWeekend ? 3 : 10)) 
        : 0;
      
      days.push({
        count,
        date: d.toISOString().split("T")[0],
      });
    }
    return days;
  }, []);

  // Agrupar en semanas
  const weeks = useMemo(() => {
    const w = [];
    for (let i = 0; i < data.length; i += 7) {
      w.push(data.slice(i, i + 7));
    }
    return w;
  }, [data]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Animar COLUMNAS en lugar de 364 cuadritos individuales
      gsap.fromTo(
        ".gh-week",
        { 
          y: 10,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.01, // Mucho más ligero
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count < 3) return 1;
    if (count < 6) return 2;
    if (count < 9) return 3;
    return 4;
  };

  return (
    <section className="gh-section" ref={containerRef}>
      <div className="gh-header">
        <div className="gh-title-group">
          <h3 className="gh-title">Code Activity</h3>
          <p className="gh-subtitle">GitHub contributions over the last year</p>
        </div>
        <div className="gh-stats">
          <div className="gh-stat-item">
            <span className="gh-stat-value">2,482</span>
            <span className="gh-stat-label">Commits</span>
          </div>
        </div>
      </div>

      <div className="gh-graph-container">
        <div className="gh-grid" ref={gridRef} style={{ minHeight: "110px" }}>
          {mounted && weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="gh-week">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`gh-square level-${getLevel(day.count)}`}
                  title={`${day.count} commits on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
        
        <div className="gh-legend">
          <span>Less</span>
          <div className="gh-legend-squares">
            <div className="gh-square level-0" />
            <div className="gh-square level-1" />
            <div className="gh-square level-2" />
            <div className="gh-square level-3" />
            <div className="gh-square level-4" />
          </div>
          <span>More</span>
        </div>
      </div>
    </section>
  );
};
