"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WelcomeMainLayout } from "./organisms/WelcomeMainLayout";
import "./Welcome.css";

gsap.registerPlugin(Flip, ScrollTrigger);

export default function WelcomePage({
  onAnimationComplete,
  isFinished
}: {
  onAnimationComplete: () => void,
  isFinished: boolean
}) {
  const [displayName, setDisplayName] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setDisplayName(window.innerWidth <= 768 ? "SERGIO" : "ALG4RET3");
      setIsMounted(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // HOOK 1: Initial letter animation (Flip)
  useGSAP(() => {
    if (!isMounted || !displayName || !containerRef.current) return;

    const isMobile = window.innerWidth <= 768;
    const layouts = ["wp-plain", "wp-columns", "wp-grid", "wp-final"];
    const container = containerRef.current.querySelector(".wp-container") as HTMLElement;
    if (!container) return;

    let curLayout = 0;
    let stopAfterNextFinal = false;

    container.classList.remove("wp-final");
    container.classList.add("wp-plain");

    // 1. Initial entrance: One by one from the left
    gsap.from(".wp-letter", {
      x: isMobile ? -80 : -150,
      opacity: 0,
      duration: isMobile ? 0.7 : 1,
      stagger: isMobile ? 0.06 : 0.1,
      ease: "power3.out",
      force3D: true,
    });

    function nextState() {
      const state = Flip.getState(".wp-letter", {
        props: "color,backgroundColor",
        simple: true,
      });

      const prevLayout = curLayout;
      curLayout = (curLayout + 1) % layouts.length;
      const targetLayout = layouts[curLayout];

      if (curLayout === layouts.length - 1) {
        stopAfterNextFinal = true;
      }

      container.classList.remove(layouts[prevLayout]);
      container.classList.add(targetLayout);

      Flip.from(state, {
        absolute: true,
        stagger: isMobile ? 0.04 : 0.07,
        duration: isMobile ? 0.5 : 0.7,
        ease: "power2.inOut",
        spin: targetLayout === "wp-final" && !isMobile, // No spin on mobile for performance
        simple: true,
        onComplete: () => {
           if (stopAfterNextFinal && targetLayout === "wp-final") {
             // Navbar appears immediately
             if (onAnimationComplete) onAnimationComplete();
             
             const tl = gsap.timeline();
             
             // Scroll indicator appears after navbar
             tl.to(".wp-scroll-indicator", {
               opacity: 1,
               y: 0,
               duration: isMobile ? 0.8 : 1.2,
               ease: "power4.out",
               onComplete: () => {
                 ScrollTrigger.refresh();
               }
             }, "+=0.2");
           }
         },
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0 },
            { opacity: 1, duration: isMobile ? 0.3 : 0.5 }
          ),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: isMobile ? 0.3 : 0.5 }),
      });

      if (!(stopAfterNextFinal && targetLayout === "wp-final")) {
        gsap.delayedCall(isMobile ? 1.1 : 1.5, nextState);
      }
    }

    // Delay the layout sequence to give time for initial entrance
    gsap.delayedCall(isMobile ? 1.5 : 2.2, nextState);
  }, { dependencies: [displayName, isMounted], scope: containerRef });

  // HOOK 2: Blur and Pinning effect on Scroll
  useGSAP(() => {
    if (!isFinished || !containerRef.current) return;

    const isMobile = window.innerWidth <= 768;

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: isMobile ? 0.9 : 0.8,
      y: isMobile ? -50 : -100,
      ease: "power1.inOut",
      force3D: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: isMobile ? 0.5 : true, // 0.5 scrub on mobile for "butter" feel
        pin: true,
        pinSpacing: false,
        anticipatePin: 1, // Fixes jumps on mobile pinning
      }
    });
  }, { dependencies: [isFinished], scope: containerRef });

  return <WelcomeMainLayout ref={containerRef} displayName={displayName} isMounted={isMounted} />;
}
