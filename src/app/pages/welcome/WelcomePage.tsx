"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { WelcomeMainLayout } from "./organisms/WelcomeMainLayout";
import "./Welcome.css";

gsap.registerPlugin(Flip);

export default function WelcomePage({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [displayName, setDisplayName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDisplayName(window.innerWidth <= 768 ? "SERGIO" : "ALG4RET3");
      setIsMounted(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMounted || !displayName) return;

    const layouts = ["plain", "columns", "grid", "final"];
    const container = document.querySelector(".flip-container")!;
    let curLayout = 0;
    let stopAfterNextFinal = false;

    container.classList.remove("final");
    container.classList.add("plain");

    function nextState() {
      const state = Flip.getState(".letter", {
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
        spin: targetLayout === "final",
        simple: true,
        onComplete: () => {
          if (stopAfterNextFinal && targetLayout === "final") {
            const tl = gsap.timeline();
            
            tl.fromTo(".info-char", 
              { 
                yPercent: -500, // Revertido: vuelve a caer desde ARRIBA
                opacity: 0
              }, 
              { 
                yPercent: 0,
                opacity: 0.8, 
                stagger: { each: 0.08, from: "start" },
                duration: 0.6, 
                ease: "power4.out",
                onStart: () => {
                  gsap.set(".info-text", { opacity: 1 });
                }
              }
            );

            tl.to(".scroll-indicator", {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power4.out",
              onComplete: () => {
                if (onAnimationComplete) onAnimationComplete();
              }
            }, "-=0.3");
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

      if (!(stopAfterNextFinal && targetLayout === "final")) {
        gsap.delayedCall(1.5, nextState);
      }
    }

    const timer = gsap.delayedCall(1, nextState);
    return () => {
      timer.kill();
      gsap.killTweensOf(nextState);
    };
  }, [displayName, isMounted, onAnimationComplete]);

  return <WelcomeMainLayout displayName={displayName} isMounted={isMounted} />;
}
