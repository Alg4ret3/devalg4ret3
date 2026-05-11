"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CV_PATH } from "@/constants";
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
        <Link href="#home" className="nb-dropdown-link" onClick={closeMenu}>
          Home
        </Link>
        <Link href="#skills" className="nb-dropdown-link" onClick={closeMenu}>
          Skills
        </Link>
        <Link href="#projects" className="nb-dropdown-link" onClick={closeMenu}>
          Projects
        </Link>
        <Link href="#about" className="nb-dropdown-link" onClick={closeMenu}>
          About me
        </Link>
      </div>

    </nav>
  );
};
