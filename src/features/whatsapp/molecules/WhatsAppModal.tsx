import React from "react";
import { WhatsAppIcon } from "../atoms/WhatsAppIcon";

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const WhatsAppModal = ({ isOpen, url }: WhatsAppModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="wa-modal">
      <div className="wa-modal-header">
        <div className="wa-modal-header-icon">
          <WhatsAppIcon size={24} />
        </div>
        <div className="wa-modal-header-text">
          <h3>Welcome!</h3>
          <p>Hi! Click below to discuss your next project with me on WhatsApp.</p>
        </div>
      </div>
      <div className="wa-modal-body">
        <p className="wa-response-time">Typically responds within minutes.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="wa-contact-card">
          <div className="wa-contact-avatar">
            <WhatsAppIcon size={28} />
          </div>
          <div className="wa-contact-info">
            <span className="wa-contact-name">Sergio Muñoz</span>
            <span className="wa-contact-status">Computer Engineer</span>
          </div>
          <div className="wa-contact-action">
            <WhatsAppIcon size={18} />
          </div>
        </a>
      </div>
    </div>
  );
};
