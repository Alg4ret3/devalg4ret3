"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=600"
];

export const AboutMe = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 4000);

    // GSAP animations
    if (containerRef.current) {
      const ctx = gsap.context(() => {
        // Animate content on scroll
        gsap.fromTo(".about-content",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              once: true
            }
          }
        );

        // Animate carousel
        gsap.fromTo(".photo-carousel",
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: 0.3,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true
            }
          }
        );
      }, containerRef);

      return () => {
        clearInterval(interval);
        ctx.revert();
      };
    }

    return () => clearInterval(interval);
  }, []);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="am-section" ref={containerRef}>
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">About Me</h2>
          <div className="about-text">
            <p>
              I'm a passionate full-stack developer with expertise in modern web technologies.
              I love creating clean, efficient, and user-friendly digital experiences that make a difference.
            </p>
            <p>
              My journey in development started with curiosity and has evolved into a deep appreciation
              for the art of coding. I believe in writing maintainable code, staying up-to-date with
              industry trends, and continuously learning new technologies.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new frameworks, contributing to open-source
              projects, or enjoying the outdoors. I value collaboration, creativity, and the impact
              that well-designed software can have on people's lives.
            </p>
          </div>

          <div className="skills-preview">
            <div className="skill-tag">React</div>
            <div className="skill-tag">TypeScript</div>
            <div className="skill-tag">Next.js</div>
            <div className="skill-tag">Node.js</div>
            <div className="skill-tag">Python</div>
          </div>

          <a href="#projects" className="about-cta">
            View My Work
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 13L13 7M13 7H9M13 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="photo-carousel" ref={carouselRef}>
          <div className="carousel-container">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentPhoto ? 'active' : ''}`}
                style={{ backgroundImage: `url(${photo})` }}
              />
            ))}
          </div>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevPhoto}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="carousel-indicators">
              {photos.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentPhoto ? 'active' : ''}`}
                  onClick={() => setCurrentPhoto(index)}
                />
              ))}
            </div>

            <button className="carousel-btn" onClick={nextPhoto}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};