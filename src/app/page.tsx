"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import WelcomePage from "./pages/welcome/WelcomePage";
import { Navbar } from "./components/navbar/Navbar";

// Dynamic imports para optimizar el bundle (Lazy loading de componentes pesados)
const TechnologiesFrontendSection = dynamic(() => import("./pages/technologies-frontend/TechnologiesFrontendSection").then(mod => mod.TechnologiesFrontendSection));
const ProjectsSection = dynamic(() => import("./pages/project/ProjectsSection").then(mod => mod.ProjectsSection));
const BackendSection = dynamic(() => import("./pages/technologies-backend/BackendSection").then(mod => mod.BackendSection));
const SectionBridge = dynamic(() => import("./components/section-bridge/SectionBridge").then(mod => mod.SectionBridge));
const WhatsAppButton = dynamic(() => import("./components/whatsapp-button/WhatsAppButton").then(mod => mod.WhatsAppButton), { ssr: false });


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
      <TechnologiesFrontendSection />
      <SectionBridge />
      <BackendSection />
      <ProjectsSection />
      <WhatsAppButton />
    </main>
  );
}
