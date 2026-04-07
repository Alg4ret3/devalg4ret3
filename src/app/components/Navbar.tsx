"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const TABS = [
  { id: "welcome", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "projects", label: "Proyectos" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contacto" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("welcome");
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  /* ── Show navbar only after Welcome pin fully exits ────── */
  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    window.addEventListener("welcome-complete", show);
    window.addEventListener("welcome-back",     hide);

    return () => {
      window.removeEventListener("welcome-complete", show);
      window.removeEventListener("welcome-back",     hide);
    };
  }, []);

  /* ── Move & resize the indicator to match the active tab ── */
  const moveIndicator = useCallback(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const activeBtn = tabRefs.current.get(activeTab);

    if (!nav || !indicator || !activeBtn) return;

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const offsetLeft = btnRect.left - navRect.left;
    const width = btnRect.width;

    indicator.style.transform = `translateX(${offsetLeft}px)`;
    indicator.style.width = `${width}px`;
  }, [activeTab]);

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  /* ── Scroll-spy: highlight tab based on viewport section ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    TABS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setActiveTab(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`navbar ${visible ? "navbar--visible" : ""}`}>
      <nav className="navbar__tabs" ref={navRef}>
        {/* Sliding indicator */}
        <div className="navbar__indicator" ref={indicatorRef} />

        {TABS.map(({ id, label }) => (
          <button
            key={id}
            ref={(el) => {
              if (el) tabRefs.current.set(id, el);
            }}
            className={`navbar__tab ${activeTab === id ? "navbar__tab--active" : ""}`}
            onClick={() => handleClick(id)}
            aria-current={activeTab === id ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
