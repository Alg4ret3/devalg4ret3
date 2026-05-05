"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, T } from "../../context/LanguageContext";
import "./Navbar.css";

interface NavbarProps {
  isVisible: boolean;
}

const CV_PATH = "/cv.pdf";

export const Navbar = ({ isVisible }: NavbarProps) => {
  const { lang, toggleLang, t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [fading, setFading] = useState(false);
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

  const handleLangToggle = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      toggleLang();
      setFading(false);
    }, 150);
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = CV_PATH;
    link.download = t("Sergio_Muñoz_CV.pdf", "Sergio_Munoz_Resume.pdf");
    link.click();
  };

  const navLinks = [
    { href: "#proyectos", es: "Tecnologías", en: "Technologies" },
    { href: "#backend", es: "Proyectos", en: "Projects" },
    { href: "#sobre-mi", es: "Sobre mí", en: "About me" },
  ];

  return (
    <nav className={`nb-nav ${isVisible ? "nb-visible" : ""}`} ref={menuRef}>

      {/* ── Hamburger ── */}
      <button
        className={`nb-hamburger ${menuOpen ? "nb-open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Menú"
      >
        <span className="nb-ham-line" />
        <span className="nb-ham-line nb-ham-line--mid" />
        <span className="nb-ham-line" />
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
        {navLinks.map(({ href, es, en }) => (
          <a
            key={href}
            href={href}
            className="nb-dropdown-link"
            onClick={() => setMenuOpen(false)}
          >
            <T es={es} en={en} />
          </a>
        ))}
      </div>

    </nav>
  );
};
