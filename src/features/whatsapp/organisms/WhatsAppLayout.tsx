import React, { forwardRef } from "react";
import { WhatsAppIcon } from "../atoms/WhatsAppIcon";
import { CloseIcon } from "../atoms/CloseIcon";
import { MessageBubble } from "../atoms/MessageBubble";
import { WhatsAppModal } from "../molecules/WhatsAppModal";

interface WhatsAppLayoutProps {
  url: string;
  currentMsg: string;
  bubbleRef: React.RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export const WhatsAppLayout = forwardRef<HTMLDivElement, WhatsAppLayoutProps>(
  ({ url, currentMsg, bubbleRef, isOpen, onToggle }, ref) => (
    <div className="wa-container" ref={ref}>
      <WhatsAppModal isOpen={isOpen} onClose={() => {}} url={url} />
      
      {!isOpen && (
        <MessageBubble 
          ref={bubbleRef} 
          text={currentMsg} 
        />
      )}

      <button
        onClick={onToggle}
        className={`wa-float ${isOpen ? 'is-open' : ''}`}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? <CloseIcon /> : <WhatsAppIcon />}
      </button>
    </div>
  )
);

WhatsAppLayout.displayName = "WhatsAppLayout";
