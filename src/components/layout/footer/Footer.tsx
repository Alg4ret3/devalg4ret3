"use client";

import React from "react";
import { 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaFacebook 
} from "react-icons/fa";
import "./Footer.css";

import { SOCIAL_LINKS } from "@/constants";

export const Footer = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case "linkedin": return <FaLinkedin />;
      case "github": return <FaGithub />;
      case "whatsapp": return <FaWhatsapp />;
      case "facebook": return <FaFacebook />;
      default: return null;
    }
  };

  return (
    <footer className="ft-footer">
      <div className="ft-container">
        <div className="ft-social-grid">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="ft-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {getIcon(link.id)}
            </a>
          ))}
        </div>
        <div className="ft-branding">
          <div className="ft-line"></div>
          <p className="ft-copy">Alg4ret3 2026</p>
          <div className="ft-line"></div>
        </div>
      </div>
    </footer>
  );
};
