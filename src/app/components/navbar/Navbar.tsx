"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, T } from "../../context/LanguageContext";
import "./Navbar.css";

interface NavbarProps {
  isVisible: boolean;
}

const CV_PATH = "https://drive.google.com/file/d/1CHb3AiV4sojzdn-QUyKOv3hf4ghxXps8/view?usp=sharing";

export const Navbar = ({ isVisible }: NavbarProps) => {
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState<"main" | "tech">("main");
  const [fading, setFading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Reset view when menu closes
  useEffect(() => {
    if (!menuOpen) {
      setTimeout(() => setView("main"), 300);
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

  const handleLangToggle = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      toggleLang();
      setFading(false);
    }, 150);
  };

  const handleDownloadCV = () => {
    window.open(CV_PATH, "_blank");
  };

  return (
    <nav className={`nb-nav ${isVisible ? "nb-visible" : ""}`} ref={menuRef}>

      {/* ── Hamburger ── */}
      <button
        className={`nb-hamburger ${menuOpen ? "nb-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menú"
      >
        <svg className="nb-ham-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path className="nb-ham-line line--1" d="M0 40h62c13 0 6 28-4 18L35 35" />
          <path className="nb-ham-line line--2" d="M0 50h70" />
          <path className="nb-ham-line line--3" d="M0 60h62c13 0 6-28-4-18L35 65" />
        </svg>
      </button>

      {/* ── Language switcher ── */}
      <button
        className="nb-lang"
        onClick={handleLangToggle}
        aria-label={t("Cambiar a inglés", "Switch to Spanish")}
      >
        <span className={`nb-lang-text ${fading ? "nb-lang-text--out" : ""}`}>
          {lang}
        </span>
      </button>

      {/* ── CV ── */}
      <button
        className="nb-cv"
        onClick={handleDownloadCV}
        aria-label={t("Descargar CV", "Download Resume")}
        title={t("Descargar CV", "Download Resume")}
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
                // Scroll al tope - cubrimos todos los contenedores posibles
                const mainEl = document.getElementById("home");
                const scrollingElement = document.scrollingElement;

                if (mainEl && mainEl !== scrollingElement) {
                  mainEl.scrollTo({ top: 0, behavior: "auto" });
                }
                if (scrollingElement) {
                  scrollingElement.scrollTo({ top: 0, behavior: "auto" });
                }
                // También forzar en window por si acaso
                window.scrollTo(0, 0);
              }}
            >
              <T es="Inicio" en="Home" />
            </button>
             <button className="nb-dropdown-link" onClick={() => setView("tech")}>
               <T es="Tecnologías" en="Technologies" />
             </button>
              <a href="#projects" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
                <T es="Proyectos" en="Projects" />
              </a>
              <a href="#about" className="nb-dropdown-link" onClick={() => setMenuOpen(false)}>
                <T es="Sobre mí" en="About me" />
              </a>
           </>
        ) : (
          <>
            <button className="nb-dropdown-link nb-back" onClick={() => setView("main")} aria-label={t("Volver", "Back")}>
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
