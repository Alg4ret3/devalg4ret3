"use client";

import { ScrollArrow } from "../atoms/ScrollArrow";
import { ScrollText } from "../atoms/ScrollText";
import { useLang, T } from "../../../context/LanguageContext";

export const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator" style={{ opacity: 0, transform: 'translateY(60px)' }}>
      <ScrollText text={<T es="Desplazar hacia abajo" en="Scroll down" />} />
      <ScrollArrow />
    </div>
  );
};
