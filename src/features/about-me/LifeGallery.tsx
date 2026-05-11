import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LifeGallery.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LIFE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop",
    alt: "Explore",
    label: "Adventure"
  },
  {
    src: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
    alt: "Music",
    label: "Soul"
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop",
    alt: "Coffee",
    label: "Ritual"
  }
];

export const LifeGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="lg-section" ref={containerRef}>
      <div className="lg-container">
        <div className="lg-header">
          <div className="lg-info">
            <span className="lg-label">OFF THE CLOCK</span>
            <h2 className="lg-title">Beyond the Screen</h2>
            <div className="lg-bio">
              <div className="lg-bio-item">
                <span className="lg-bio-key">Age</span>
                <span className="lg-bio-val">23 Years</span>
              </div>
              <div className="lg-bio-item">
                <span className="lg-bio-key">Hobbies</span>
                <span className="lg-bio-val">Crossfit, Travel & Fitness</span>
              </div>
              <div className="lg-bio-item">
                <span className="lg-bio-key">Origin</span>
                <span className="lg-bio-val">San Juan de Pasto, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg-fold">
          {LIFE_IMAGES.map((img, idx) => {
            const isActive = activeIndex === idx;
            const isHidden = activeIndex !== null && activeIndex !== idx;

            return (
              <div
                key={idx}
                className={`lg-para lg-para-${idx + 1} ${isActive ? "is-active" : ""} ${isHidden ? "is-hidden" : ""}`}
                onClick={() => handleToggle(idx)}
              >
                <div className="lg-para-inner">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="lg-para-img"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="lg-para-overlay">
                    <span className="lg-para-label">{img.label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
