"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import WelcomePage from "@/features/welcome/WelcomePage";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { useScrollLock } from "@/hooks/useScrollLock";
import { ProjectsGallery } from "@/features/projects";
import { Skills } from "@/features/skills/Skills";

const TextShowcase = dynamic(() => import("@/features/text-showcase/TextShowcase").then(mod => mod.TextShowcase), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/features/whatsapp/WhatsAppButton").then(mod => mod.WhatsAppButton), { ssr: false });

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);
  const [navbarReady, setNavbarReady] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (isFinished && !navbarReady) {
      setNavbarReady(true);
    }
  }, [isFinished, navbarReady]);

  useScrollLock(!isFinished);

  return (
    <main id="home" className={!isFinished ? "gl-no-scroll" : ""}>
      <Navbar isVisible={navbarReady} />
      <WelcomePage 
        onAnimationComplete={handleAnimationComplete} 
        isFinished={isFinished} 
      />
      <div className="section-container">
        <div id="showcase-wrapper">
          <TextShowcase isFinished={isFinished} />
        </div>
        <Skills />
        <div id="gallery-wrapper">
          <ProjectsGallery isFinished={isFinished} />
        </div>
      </div>
      {isFinished && <Footer />}
      <WhatsAppButton />
    </main>
  );
}