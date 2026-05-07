import React, { forwardRef } from "react";
import { WhatsAppIcon } from "../atoms/WhatsAppIcon";
import { MessageBubble } from "../atoms/MessageBubble";

interface WhatsAppLayoutProps {
  url: string;
  currentMsg: string;
  bubbleRef: React.RefObject<HTMLDivElement | null>;
}

export const WhatsAppLayout = forwardRef<HTMLAnchorElement, WhatsAppLayoutProps>(
  ({ url, currentMsg, bubbleRef }, ref) => (
    <a
      ref={ref}
      href={url}
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={{ left: "30px" }}
    >
      <MessageBubble 
        ref={bubbleRef} 
        text={currentMsg} 
      />
      <WhatsAppIcon />
    </a>
  )
);

WhatsAppLayout.displayName = "WhatsAppLayout";
