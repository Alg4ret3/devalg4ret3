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

  // HOOK 1: Animación inicial de las letras (Flip)
  useGSAP(() => {
    if (!isMounted || !displayName || !containerRef.current) return;

    const layouts = ["wp-plain", "wp-columns", "wp-grid", "wp-final"];
    const container = containerRef.current.querySelector(".wp-container") as HTMLElement;
    if (!container) return;

    let curLayout = 0;
    let stopAfterNextFinal = false;

    container.classList.remove("wp-final");
    container.classList.add("wp-plain");

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
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: targetLayout === "wp-final",
        simple: true,
        onComplete: () => {
          if (stopAfterNextFinal && targetLayout === "wp-final") {
            const tl = gsap.timeline();
            
            tl.to(".wp-scroll-indicator", {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
              onComplete: () => {
                ScrollTrigger.refresh(); // Recalcula posiciones para el resto de la página
                if (onAnimationComplete) onAnimationComplete();
              }
            });
          }
        },
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          ),
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
      });

      if (!(stopAfterNextFinal && targetLayout === "wp-final")) {
        gsap.delayedCall(1.5, nextState);
      }
    }

    gsap.delayedCall(1, nextState);
  }, { dependencies: [displayName, isMounted], scope: containerRef }); // Quitamos isFinished de aquí

  // HOOK 2: Efecto de Blur y Pinning al hacer Scroll
  useGSAP(() => {
    if (!isFinished || !containerRef.current) return;

    gsap.to(containerRef.current, {
      filter: "blur(20px)",
      opacity: 0,
      scale: 0.9,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinSpacing: false,
      }
    });
  }, { dependencies: [isFinished], scope: containerRef });

  return <WelcomeMainLayout ref={containerRef} displayName={displayName} isMounted={isMounted} />;
}
