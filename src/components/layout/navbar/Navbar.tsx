"use client";

import { useEffect, useRef, useState } from "react";
import { CV_PATH } from "@/constants";
import "./Navbar.css";

interface NavbarProps {
  isVisible: boolean;
}

export const Navbar = ({ isVisible }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"main" | "tech">("main");
  const menuRef = useRef<HTMLDivElement>(null);

  // Reset view when menu closes
  useEffect(() => {
    if (!menuOpen) {
      const timer = setTimeout(() => setView("main"), 300);
      return () => clearTimeout(timer);
    }
  }, [menuOpen]);

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

  return (
    <nav className={`nb-nav ${isVisible ? "nb-visible" : ""}`} ref={menuRef}>

      {/* ── Hamburger ── */}
      <button
        className={`nb-hamburger ${menuOpen ? "nb-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menu"
      >
        <svg className="nb-ham-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path className="nb-ham-line line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
          <path className="nb-ham-line line--2" d="M0 50h70" />
          <path className="nb-ham-line line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
        </svg>
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
        {view === "main" ? (
          <>
            <button
              className="nb-dropdown-link"
              onClick={() => {
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </button>
            <button className="nb-dropdown-link" onClick={() => setView("tech")}>
              Technologies
            </button>
            <a href="#projects" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
              Projects
            </a>
            <a href="#about" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
              About me
            </a>
          </>
        ) : (
          <>
            <button className="nb-dropdown-link nb-back" onClick={() => setView("main")} aria-label="Back">
              ←
            </button>
            <div className="nb-divider"></div>
            <a href="#frontend" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
              Frontend
            </a>
            <a href="#backend" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
              Backend
            </a>
          </>
        )}
      </div>

    </nav>
  );
};
