"use client";

import { ScrollArrow } from "../atoms/ScrollArrow";
import { ScrollText } from "../atoms/ScrollText";

export const ScrollIndicator = () => {
  return (
    <div className="wp-scroll-indicator" style={{ opacity: 0, transform: 'translateY(60px)' }}>
      <ScrollText text="Scroll down" />
      <ScrollArrow />
    </div>
  );
};
