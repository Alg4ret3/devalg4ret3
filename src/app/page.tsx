"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import WelcomePage from "@/features/welcome/WelcomePage";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { Footer } from "@/components/layout/footer/Footer";
import { useScrollLock } from "@/hooks/useScrollLock";
import { ProjectsGallery } from "@/features/projects";

// Dynamic imports para optimizar el bundle (Lazy loading de componentes pesados)
const TextShowcase = dynamic(() => import("@/features/text-showcase/TextShowcase").then(mod => mod.TextShowcase), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/features/whatsapp/WhatsAppButton").then(mod => mod.WhatsAppButton), { ssr: false });

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  useScrollLock(!isFinished);

   return (
     <main id="home" className={!isFinished ? "gl-no-scroll" : ""}>
       <Navbar isVisible={isFinished} />
       <WelcomePage 
         onAnimationComplete={handleAnimationComplete} 
         isFinished={isFinished} 
       />
       <div className="section-container">
         <div id="showcase-wrapper">
           <TextShowcase isFinished={isFinished} />
         </div>
         <div id="gallery-wrapper">
           <ProjectsGallery isFinished={isFinished} />
         </div>
       </div>
       {isFinished && <Footer />}
       <WhatsAppButton />
     </main>
   );
}
