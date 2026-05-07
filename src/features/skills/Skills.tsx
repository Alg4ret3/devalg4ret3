"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { skills } from "./skillsData";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger, Draggable);

export const Skills = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;

    let scrollTrigger: ScrollTrigger | null = null;

    const createScrollTrigger = () => {
      scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(carousel, { x: - (carousel.offsetWidth / 2) * progress });
        },
      });
    };

    gsap.set(carousel, { x: 0 });

    createScrollTrigger();

    // hacer draggable con inercia
    Draggable.create(carousel, {
      type: "x",
      inertia: true,
      bounds: { minX: -carousel.offsetWidth / 2, maxX: 0 },
      edgeResistance: 0.5,
      onDragStart: () => {
        if (scrollTrigger) {
          scrollTrigger.kill();
          scrollTrigger = null;
        }
      },
      onDragEnd: () => {
        createScrollTrigger();
      },
    });

    return () => {
      Draggable.get(carousel)?.kill();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="sk-section">
      <div className="sk-carousel-wrapper">
        <div className="sk-carousel" ref={carouselRef}>
          {[...skills, ...skills].map((skill, index) => (
            <div className="sk-card" key={index}>
              <span className="sk-icon">{skill.icon}</span>
              <span className="sk-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};