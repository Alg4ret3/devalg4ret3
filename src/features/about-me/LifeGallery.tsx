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
    src: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779220909/j68heu3pljvle4f0lsln.jpg",
    alt: "Explore",
    label: "CrossFit"
  },
  {
    src: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779220901/gkysbxmww2a6t28nxuti.jpg",
    alt: "Music",
    label: "Travel"
  },
  {
    src: "https://res.cloudinary.com/dqky6oqrd/image/upload/f_auto,q_auto/v1779220869/dy8fmb0du0j4td4mqvue.jpg",
    alt: "Coffee",
    label: "Running"
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
                    sizes="(max-width: 1024px) 33vw, 32vw"
                    quality={75}
                    loading="lazy"
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
