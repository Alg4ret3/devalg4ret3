"use client";

import React from "react";
import { 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaFacebook 
} from "react-icons/fa";
import "./Footer.css";

export const Footer = () => {
  const socialLinks = [
    { 
      id: "linkedin", 
      icon: <FaLinkedin />, 
      href: "https://linkedin.com",
      label: "LinkedIn"
    },
    { 
      id: "github", 
      icon: <FaGithub />, 
      href: "https://github.com",
      label: "GitHub"
    },
    { 
      id: "whatsapp", 
      icon: <FaWhatsapp />, 
      href: "https://wa.me/573170098770", 
      label: "WhatsApp"
    },
    { 
      id: "facebook", 
      icon: <FaFacebook />, 
      href: "https://facebook.com",
      label: "Facebook"
    }
  ];

  return (
    <footer className="ft-footer">
      <div className="ft-container">
        <div className="ft-social-grid">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="ft-social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              {link.icon}
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
