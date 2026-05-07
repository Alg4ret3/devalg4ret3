"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WHATSAPP_CONFIG } from "@/constants";
import { WhatsAppLayout } from "./organisms/WhatsAppLayout";
import "./WhatsAppButton.css";

export const WhatsAppButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hello! I'm coming from your portfolio and I'd like to contact you for a project.")}`;

  useGSAP(() => {
    const msgTl = gsap.timeline({ repeat: -1 });

    WHATSAPP_CONFIG.messages.forEach((_, index) => {
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
    <WhatsAppLayout 
      ref={buttonRef}
      url={whatsappUrl}
      currentMsg={WHATSAPP_CONFIG.messages[currentMsgIndex].text}
      bubbleRef={bubbleRef}
    />
  );
};
