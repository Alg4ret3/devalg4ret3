"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS_DATA } from "@/constants";
import "./ProjectsGallery.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsGallery = ({ isFinished }: { isFinished?: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !wrapperRef.current || !isFinished) return;

    const ctx = gsap.context(() => {
      // Bounce-In Effect linked to ScrollTrigger for both Mobile and Desktop
      gsap.from(".pg-intro-text", {
        scrollTrigger: {
          trigger: ".pg-intro-text",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        scale: 0.7,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)"
      });

      // Super Animated Swipe Hint (GSAP Timeline)
      const arrowTl = gsap.timeline({ repeat: -1 });
      arrowTl
        .to(".pg-swipe-hint svg", { 
          x: 40, 
          opacity: 0, 
          scale: 0.8, 
          duration: 0.8, 
          ease: "power2.in" 
        })
        .set(".pg-swipe-hint svg", { x: -40, opacity: 0, scale: 0.8 })
        .to(".pg-swipe-hint svg", { 
          x: 0, 
          opacity: 0.8, 
          scale: 1, 
          duration: 0.6, 
          ease: "power2.out" 
        })
        .to(".pg-swipe-hint svg", { 
          scale: 1.2, 
          duration: 0.2, 
          yoyo: true, 
          repeat: 1 
        });

      const mm = gsap.matchMedia();

      // Escritorio: Scroll Horizontal Optimizado
      mm.add("(min-width: 769px)", () => {
        const wrapper = wrapperRef.current!;
        const scrollAmount = wrapper.scrollWidth - window.innerWidth;

        gsap.to(wrapper, {
          x: -scrollAmount,
          ease: "none",
          force3D: true, // Forzar aceleración GPU
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${scrollAmount}`,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isFinished]);

  return (
    <section className="pg-section" ref={sectionRef} id="projects">
      <div className="pg-horizontal-wrapper" ref={wrapperRef}>

        {/* Intro Panel */}
        <div className="pg-panel pg-intro-panel">
          <div className="pg-intro-content">
            <h2 className="pg-intro-text">SELECTED<br />WORKS</h2>
            <div className="pg-swipe-hint">
              <span>SWIPE</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Project Panels */}
        {PROJECTS_DATA.map((project, index) => (
          <div key={project.id} className="pg-panel pg-panel-split">
            <div className="pg-project-info">
              <span className="pg-id">{project.id}</span>
              <h3 className="pg-title">{project.title}</h3>
              
              <p className="pg-description">{project.description}</p>
              
              <div className="pg-tech-list">
                {project.tech?.map((t, idx) => (
                  <span key={idx} className="pg-tech-tag">{t}</span>
                ))}
              </div>

              <div className="pg-actions">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="pg-btn pg-btn-outline">
                  GITHUB
                </a>
                <a href={project.web} target="_blank" rel="noopener noreferrer" className="pg-btn pg-btn-fill">
                  LIVE DEMO
                </a>
              </div>

              <div className="pg-category-wrap">
                <span className="pg-category">{project.category}</span>
                <span className="pg-year">{project.year}</span>
              </div>
            </div>
            <div className="pg-image-container">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
                className="pg-image"
                priority={index === 0} // Prioridad a la primera imagen
                quality={85}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
