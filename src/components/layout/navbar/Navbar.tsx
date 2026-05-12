"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CV_PATH, SOCIAL_LINKS, NAV_LINKS } from "@/constants";
import "./Navbar.css";

interface NavbarProps {
  isVisible: boolean;
}

export const Navbar = ({ isVisible }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadCV = () => {
    window.open(CV_PATH, "_blank");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nb-nav ${isVisible ? "nb-visible" : ""}`} ref={menuRef}>

      {/* ── Hamburger ── */}
      <button
        className={`nb-hamburger ${menuOpen ? "nb-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        <div className="nb-ham-box">
          <span className="nb-ham-inner"></span>
        </div>
      </button>

      {/* ── CV ── */}
      <button
        className="nb-cv"
        onClick={handleDownloadCV}
        aria-label="Download Resume"
        title="Download Resume"
      >
        <span className="nb-cv-label">CV</span>
      </button>

      {/* ── Dropdown ── */}
      <div className={`nb-dropdown ${menuOpen ? "nb-dropdown--open" : ""}`}>
        <div className="nb-dropdown-main">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="nb-dropdown-link" 
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nb-dropdown-footer">
          <div className="nb-social-group">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="nb-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

    </nav>
  );
};
