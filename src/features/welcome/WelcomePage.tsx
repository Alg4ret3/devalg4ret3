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

    // 1. Entrada inicial: Una a una desde la izquierda
    gsap.from(".wp-letter", {
      x: -150,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
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
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: targetLayout === "wp-final",
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
               duration: 1.2,
               ease: "power4.out",
               onComplete: () => {
                 ScrollTrigger.refresh();
               }
             }, "+=0.3"); // Pequeño delay después del navbar
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

    // Retrasamos la secuencia de layouts para que dé tiempo a la entrada inicial
    gsap.delayedCall(2.2, nextState);
  }, { dependencies: [displayName, isMounted], scope: containerRef }); // Quitamos isFinished de aquí

  // HOOK 2: Efecto de Blur y Pinning al hacer Scroll
  useGSAP(() => {
    if (!isFinished || !containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -100,
      ease: "power1.inOut",
      force3D: true,
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
