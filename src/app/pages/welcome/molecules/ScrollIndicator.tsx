"use client";

import { ScrollArrow } from "../atoms/ScrollArrow";
import { ScrollText } from "../atoms/ScrollText";

export const ScrollIndicator = () => (
  <div className="scroll-indicator" style={{ opacity: 0, transform: 'translateY(60px)' }}>
    <ScrollText text="Desplazar hacia abajo" />
    <ScrollArrow />
  </div>
);
