"use client";

import { useState, useCallback, useEffect } from "react";
import WelcomePage from "./pages/welcome/WelcomePage";
import { Navbar } from "./components/navbar/Navbar";
import { ProjectsSection } from "./pages/projects/ProjectsSection";

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    const preventScrollKeys = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown", "Home", "End"];
      if (keys.includes(e.code)) {
        e.preventDefault();
        return false;
      }
    };

    if (!isFinished) {
      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
      window.addEventListener("keydown", preventScrollKeys, { passive: false });
    } else {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventScrollKeys);
    }

    return () => {
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      window.removeEventListener("keydown", preventScrollKeys);
    };
  }, [isFinished]);

  return (
    <main className={!isFinished ? "no-scroll" : ""}>
      <Navbar isVisible={isFinished} />
      <WelcomePage onAnimationComplete={handleAnimationComplete} />
      <ProjectsSection />
    </main>
  );
}
