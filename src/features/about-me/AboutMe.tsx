"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutMe.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutMe = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el texto
      gsap.from(".am-title, .am-description", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Animación de entrada para la imagen (paralaje suave)
      gsap.from(imageRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="am-section" ref={sectionRef} id="about">
      <div className="am-container">
        <div className="am-content" ref={textRef}>
          <span className="am-label">WHO I AM</span>
          <h2 className="am-title">SERGIO <br /> RUIZ</h2>
          <p className="am-description">
            Creative Developer & Digital Architect based in Colombia. 
            I craft high-end digital experiences where code meets design, 
            focusing on performance, interaction, and minimalist aesthetics.
          </p>
          <div className="am-footer-line" />
        </div>

        <div className="am-image-wrapper" ref={imageRef}>
          <div className="am-image-inner">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop"
              alt="Sergio Ruiz"
              fill
              className="am-photo"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};