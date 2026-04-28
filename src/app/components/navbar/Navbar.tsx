"use client";

import Link from "next/link";
import "./Navbar.css";

interface NavbarProps {
  isVisible: boolean;
}

export const Navbar = ({ isVisible }: NavbarProps) => {
  return (
    <nav className={`navbar ${isVisible ? "visible" : ""}`}>
      <ul className="navbar-links">
        <li>
          <Link href="#proyectos" className="navbar-link">
            Proyectos
          </Link>
        </li>
        <li>
          <Link href="#sobre-mi" className="navbar-link">
            Sobre mí
          </Link>
        </li>
        <li>
          <Link href="#contacto" className="navbar-link">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
};
