"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function Welcome() {
  const [displayName, setDisplayName] = useState("ALG4RET3");

  useEffect(() => {
    const handleResize = () => {
      setDisplayName(window.innerWidth <= 768 ? "AG4RT3" : "ALG4RET3");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const layouts = ["final", "plain", "columns", "grid"];
    const container = document.querySelector(".flip-container")!;
    let curLayout = 0;

    function nextState() {
      const state = Flip.getState(".letter, .info-text", {
        props: "color,backgroundColor",
        simple: true,
      });

      container.classList.remove(layouts[curLayout]);
      curLayout = (curLayout + 1) % layouts.length;
      container.classList.add(layouts[curLayout]);

      Flip.from(state, {
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: curLayout === 0,
        simple: true,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
          ),
        onLeave: (elements) => gsap.to(elements, { opacity: 0 }),
      });

      gsap.delayedCall(curLayout === 0 ? 3.5 : 1.5, nextState);
    }

    const timer = gsap.delayedCall(1, nextState);
    return () => {
      timer.kill();
      gsap.killTweensOf(nextState);
    };
  }, [displayName]); // Reinicia la animación si el nombre cambia (opcional)

  return (
    <section className="welcome" id="welcome">
      <div className="flip-container final">
        {displayName.split("").map((char, i) => (
          <div key={`${displayName}-${i}`} className={`letter L${i + 1}`}>
            {char}
          </div>
        ))}
        <div className="mobile-break"></div>
        <div className="info-text">Computer Engineer</div>
      </div>
    </section>
  );
}
