"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TICKER_SKILLS, RADAR_SKILLS } from "@/constants";
import { SkillRadar } from "./SkillRadar";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

// Flatten ticker: row 1 = first category, row 2 = second
const row1 = TICKER_SKILLS[0].skills;
const row2 = TICKER_SKILLS[1].skills;

export const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // ── Title ──
      gsap.fromTo(
        ".sk-title",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sk-title",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Ticker rows fade in ──
      gsap.fromTo(
        ".sk-ticker-row",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".sk-ticker-row",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Radar section title ──
      gsap.fromTo(
        ".sk-radar-section-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sk-radar-section-title",
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const renderItems = (skills: typeof row1) =>
    [...skills, ...skills].map((skill, i) => (
      <div className="sk-ticker-item" key={i} aria-hidden={i >= skills.length}>
        <span className="sk-ticker-icon">{skill.icon}</span>
        <span className="sk-ticker-name">{skill.name}</span>
        <span className="sk-ticker-dot" aria-hidden="true">·</span>
      </div>
    ));

  return (
    <section className="sk-section" ref={sectionRef} id="skills">
      {/* ── Minimalist Title ── */}
      <div className="sk-header">
        <span className="sk-label">02. KNOWLEDGE</span>
        <h2 className="sk-title">EXPERTISE</h2>
      </div>

      {/* ── Ticker ── */}
      <div className="sk-ticker-row">
        <div className="sk-ticker-track sk-ticker-track--left">
          {renderItems(row1)}
        </div>
      </div>
      <div className="sk-ticker-row">
        <div className="sk-ticker-track sk-ticker-track--right">
          {renderItems(row2)}
        </div>
      </div>

      {/* ── Radar charts ── */}
      <div className="sk-radar-section">
        <p className="sk-radar-section-title">Mastery Level</p>
        <div className="sk-radar-grid">
          {RADAR_SKILLS.map((cat, i) => (
            <SkillRadar key={cat.label} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};