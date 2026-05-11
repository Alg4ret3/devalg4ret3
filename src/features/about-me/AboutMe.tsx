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

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animación de entrada para el texto solamente
      gsap.from(".am-label, .am-title, .am-description, .am-stat-item", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="am-section" ref={sectionRef}>
      <div className="am-container">
        <div className="am-content" ref={textRef}>
          <span className="am-label">WHO I AM</span>
          <h2 className="am-title">SERGIO <br /> MUÑOZ</h2>
          <p className="am-description">
            Hello, I'm Sergio Muñoz, a Computer Engineer based in Colombia. My profile 
            leans heavily towards Frontend development, where I specialize in crafting 
            minimalist websites with rich, fluid animations that create unique digital 
            experiences. However, I am equally proficient in Backend development, 
            ensuring robust logic and performance. Having graduated less than a year 
            ago and holding my professional license, I am a passionate team player 
            who excels at listening and contributing creative ideas to solve complex problems.
          </p>

          <div className="am-stats">
            <div className="am-stat-item">
              <span className="am-stat-num">02+</span>
              <span className="am-stat-label">Years of Experience</span>
            </div>
            <div className="am-stat-item">
              <span className="am-stat-num">10+</span>
              <span className="am-stat-label">Projects Delivered</span>
            </div>
          </div>

          <div className="am-footer-line" />
        </div>

        <div className="am-image-wrapper">
          <div className="am-image-inner">
            <Image
              src="https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1774646685/eitwnqy6zyvvvgfyqeid.webp"
              alt="Sergio Muñoz"
              fill
              className="am-photo"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};