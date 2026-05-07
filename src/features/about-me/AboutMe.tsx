"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Typed from "typed.js";
import "./AboutMe.css";

gsap.registerPlugin(ScrollTrigger);

export const AboutMe = () => {
  const containerRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    // Initialize Typed.js
    if (typedRef.current) {
      typedInstance.current = new Typed(typedRef.current, {
        strings: ["", "creators.", "editors."],
        typeSpeed: 100,
        backSpeed: 40,
        loop: true
      });
    }

    // GSAP text splitting animation
    const introsplitTypes = document.querySelectorAll(".left-part h1");
    introsplitTypes.forEach((char, i) => {
      // Simple text splitting by characters
      const text = char.textContent || '';
      const chars = text.split('');

      char.innerHTML = chars.map(char =>
        char === ' ' ? '<span>&nbsp;</span>' : `<span class="char">${char}</span>`
      ).join('');

      const charElements = char.querySelectorAll('.char');
      gsap.set(charElements, { y: -515 });
      gsap.to(charElements, {
        y: 0,
        stagger: 0.08,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section className="am-section" ref={containerRef}>
      <div className="info-section">
        <div className="left-part">
          <h1>
            <span className="d-flex">we make</span>
            <span className="text" ref={typedRef}></span>
          </h1>
          <p>I create amazing digital experiences with modern technologies</p>
          <a href="#projects" className="book-link">
            <span className="linktext">View My Work</span>
            <span className="arrow">
              <span></span>
            </span>
          </a>
        </div>
        <div className="right-part">
          <div className="bg-line">
            <img src="https://www.yudiz.com/codepen/photography-banner/wave.svg" alt="Line" />
            <img src="https://www.yudiz.com/codepen/photography-banner/wave.svg" alt="Line" />
          </div>

          <div className="main-grid d-flex">
            <div className="box">
              <span>React</span>
            </div>
            <div className="box">
              <div className="bg-img">
                <img src="https://www.yudiz.com/codepen/photography-banner/photography.png" alt="React" />
              </div>
            </div>
            <div className="box">
              <span>TypeScript</span>
            </div>
            <div className="box">
              <span>Next.js</span>
            </div>
            <div className="box">
              <div className="bg-img">
                <img src="https://www.yudiz.com/codepen/photography-banner/VFX.png" alt="Next.js" />
              </div>
            </div>
            <div className="box">
              <div className="bg-img">
                <img src="https://www.yudiz.com/codepen/photography-banner/under-water.png" alt="TypeScript" />
              </div>
            </div>
            <div className="box">
              <span>GSAP</span>
            </div>
            <div className="box">
              <div className="bg-img">
                <img src="https://www.yudiz.com/codepen/photography-banner/Videography.png" alt="GSAP" />
              </div>
            </div>
          </div>

          <div className="bg-circle-h-line">
            <img src="https://www.yudiz.com/codepen/photography-banner/circle-ring.svg" alt="Horizontal-circle" />
            <img src="https://www.yudiz.com/codepen/photography-banner/circle-ring.svg" alt="Horizontal-circle" />
            <img src="https://www.yudiz.com/codepen/photography-banner/circle-ring.svg" alt="Horizontal-circle" />
          </div>
          <div className="bg-dash-circle">
            <img src="https://www.yudiz.com/codepen/photography-banner/dash-circle.svg" alt="dash-circle" />
          </div>
        </div>
      </div>
    </section>
  );
};