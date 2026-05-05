"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang, T } from "../../context/LanguageContext";
import "./not-found.css";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".nf-glitch",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
      ".nf-message",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    tl.fromTo(
      ".nf-button",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" },
      "-=0.3"
    );

    // Efecto sutil continuo para el "404"
    gsap.to(".nf-glitch", {
      textShadow: "4px 0px 0px rgba(0,0,0,0.1), -4px 0px 0px rgba(0,0,0,0.1)",
      duration: 0.1,
      yoyo: true,
      repeat: -1,
      repeatDelay: 3,
      ease: "rough({ template: none.out, strength: 1, points: 20, taper: none, randomize: true, clamp: false })"
    });

  }, { scope: containerRef });

  return (
    <div className="nf-container" ref={containerRef}>
      
      <div className="nf-content">
        <h1 className="nf-glitch">404</h1>
        
        <h2 className="nf-message">
          <T 
            es="Lo sentimos, esta página se perdió en el ciberespacio." 
            en="Sorry, this page got lost in cyberspace." 
          />
        </h2>
        
        <p className="nf-submessage">
          <T 
            es="La ruta a la que intentas acceder no existe o fue movida." 
            en="The route you are trying to access does not exist or has been moved." 
          />
        </p>
        
        <Link href="/" className="nf-button">
          <span className="nf-btn-text">
            <T es="Volver al inicio" en="Return to home" />
          </span>
          <div className="nf-btn-bg"></div>
        </Link>
      </div>
    </div>
  );
}
