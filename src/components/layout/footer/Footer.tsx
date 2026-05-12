"use client";

import React, { useState, useEffect } from "react";
import { 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaInstagram 
} from "react-icons/fa";
import "./Footer.css";

import { SOCIAL_LINKS, SITE_METADATA } from "@/constants";

export const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: SITE_METADATA.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="ft-footer">
      <div className="ft-container">
        {/* ── Call to Action ── */}
        <div className="ft-cta-wrap">
          <span className="ft-cta-label">NEED A DEVELOPER?</span>
          <h2 className="ft-cta-title">LET'S WORK <br /> TOGETHER</h2>
          <a href={`mailto:${SITE_METADATA.email}`} className="ft-cta-email">
            {SITE_METADATA.email}
          </a>
        </div>

        {/* ── Middle Info (Social + Time) ── */}
        <div className="ft-middle">
          <div className="ft-social-group">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="ft-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            ))}
          </div>

          <div className="ft-info-group">
            <div className="ft-info-item">
              <span className="ft-info-label">LOCATION</span>
              <span className="ft-info-val">{SITE_METADATA.location}</span>
            </div>
            <div className="ft-info-item">
              <span className="ft-info-label">LOCAL TIME</span>
              <span className="ft-info-val">{time}</span>
            </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="ft-bottom">
          <div className="ft-copy-wrap">
            <p className="ft-copy">© 2026 DESIGNED & BUILT BY {SITE_METADATA.author.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
