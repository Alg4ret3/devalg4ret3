"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang, T } from "../../context/LanguageContext";
import "./WhatsAppButton.css";

const MESSAGES = [
  { es: "¡Hola!", en: "Hello!" },
  { es: "¿Tienes un proyecto?", en: "Have a project?" },
  { es: "¡Hablemos!", en: "Let's talk!" },
  { es: "¿En qué puedo ayudarte?", en: "How can I help?" },
  { es: "¡Escríbeme!", en: "Message me!" },
];

export const WhatsAppButton = () => {
  const { lang } = useLang();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  
  const whatsappUrl = lang === "ES" 
    ? "https://wa.me/573170098770?text=%C2%A1Hola%21%20Vengo%20de%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20contactarte%20para%20un%20proyecto."
    : "https://wa.me/573170098770?text=Hello%21%20I%27m%20coming%20from%20your%20portfolio%20and%20I%27d%20like%20to%20contact%20you%20for%20a%20project.";

  useGSAP(() => {
    const msgTl = gsap.timeline({ repeat: -1 });

    MESSAGES.forEach((_, index) => {
      // 1. SILENCIO: 15 segundos sin mensaje
      msgTl.to({}, { duration: 15 });

      // 2. Cambiar mensaje
      msgTl.call(() => setCurrentMsgIndex(index));

      // 3. MOSTRAR MENSAJE: Aparece con rebote
      msgTl.fromTo(bubbleRef.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );

      // 4. TIEMPO DE LECTURA: 5 segundos visible
      msgTl.to({}, { duration: 5 });

      // 5. OCULTAR: Desaparece para el siguiente ciclo
      msgTl.to(bubbleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    });

  }, { scope: buttonRef });

  return (
    <a 
      ref={buttonRef}
      href={whatsappUrl} 
      className="wa-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{ left: "30px" }}
    >
      <div className="wa-bubble" ref={bubbleRef} style={{ opacity: 0, transform: "scale(0)" }}>
        <T 
          es={MESSAGES[currentMsgIndex].es} 
          en={MESSAGES[currentMsgIndex].en} 
        />
      </div>
      <svg viewBox="0 0 448 512" width="25" height="25" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.2-16.4-14.6-27.4-32.7-30.6-38.2-3.2-5.6-.3-8.6 2.5-11.3 2.5-2.5 5.6-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>
  );
};
