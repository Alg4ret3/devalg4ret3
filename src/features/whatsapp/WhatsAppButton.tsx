"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WHATSAPP_CONFIG } from "@/constants";
import { WhatsAppLayout } from "./organisms/WhatsAppLayout";
import "./WhatsAppButton.css";

export const WhatsAppButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent("Hello! I'm coming from your portfolio and I'd like to contact you for a project.")}`;

  const toggleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    if (isOpen) return; // Don't run bubble animation if open

    const msgTl = gsap.timeline({ repeat: -1 });

    WHATSAPP_CONFIG.messages.forEach((_, index) => {
      msgTl.to({}, { duration: 15 });
      msgTl.call(() => setCurrentMsgIndex(index));
      msgTl.fromTo(bubbleRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      msgTl.to({}, { duration: 5 });
      msgTl.to(bubbleRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    });

    return () => msgTl.kill();
  }, { scope: containerRef, dependencies: [isOpen] });

  return (
    <WhatsAppLayout 
      ref={containerRef}
      url={whatsappUrl}
      currentMsg={WHATSAPP_CONFIG.messages[currentMsgIndex].text}
      bubbleRef={bubbleRef}
      isOpen={isOpen}
      onToggle={toggleOpen}
    />
  );
};
