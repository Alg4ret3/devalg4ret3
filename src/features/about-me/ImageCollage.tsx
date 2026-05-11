"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./ImageCollage.css";

interface Piece {
  id: number;
  level: number;
  width: number;
  height: number;
  left: number;
  top: number;
  offset: number;
}

interface ImageCollageProps {
  imgSrc: string;
  isOrganized: boolean;
}

export const ImageCollage: React.FC<ImageCollageProps> = ({ imgSrc, isOrganized }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const piecesNum = 45;

  // 1. Detectar dimensiones reales del contenedor
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight
        });
      }
    };

    // Pequeño delay para asegurar que el layout de Next.js esté listo
    const timer = setTimeout(updateDimensions, 100);
    window.addEventListener("resize", updateDimensions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // 2. Generar fragmentos basados en las dimensiones reales
  useEffect(() => {
    if (dims.w === 0) return;

    const levelIndex = Math.floor(piecesNum * 0.75);
    const maxsizeX = Math.round(dims.w / 2);
    const maxsizeY = Math.round(dims.h / 2);
    const strength = 3;

    const generatedPieces: Piece[] = [];
    const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < piecesNum; i++) {
      const level = i < levelIndex ? 1 : 2;
      const width = level === 1 ? getRandomInt(100, maxsizeX) : getRandomInt(40, maxsizeX / 2);
      const height = level === 1 ? getRandomInt(100, maxsizeY) : getRandomInt(40, maxsizeY / 2);
      const left = getRandomInt(0, dims.w - width);
      const top = getRandomInt(0, dims.h - height);
      const offset = getRandomInt(strength, strength * 2 * level);

      generatedPieces.push({ id: i, level, width, height, left, top, offset });
    }

    setPieces(generatedPieces);
  }, [dims, imgSrc]);

  // 3. Lógica de movimiento (Parallax / Organizar)
  useGSAP(() => {
    if (!containerRef.current || pieces.length === 0) return;

    const container = containerRef.current;
    const piecesElements = container.querySelectorAll(".collage_piece");

    if (isOrganized) {
      gsap.to(piecesElements, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: { amount: 0.3, from: "center" }
      });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      piecesElements.forEach((el, idx) => {
        const piece = pieces[idx];
        if (!piece) return;
        const xpos = ( -e.clientX/2 + window.innerWidth/2) / (piece.offset - piece.level);
        const ypos = ( -e.clientY/2 + window.innerHeight/2) / (piece.offset - piece.level);
        gsap.to(el, { x: xpos * 2, y: ypos * 2, duration: 1.5, ease: "power2.out", overwrite: "auto" });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [pieces, isOrganized]);

  return (
    <div className="collage_container" ref={containerRef}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`collage_piece level_${piece.level} ${isOrganized ? "organized" : ""}`}
          style={{
            width: piece.width,
            height: piece.height,
            left: piece.left,
            top: piece.top,
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: `${dims.w}px ${dims.h}px`,
            backgroundPosition: `${-piece.left}px ${-piece.top}px`,
            visibility: dims.w > 0 ? "visible" : "hidden"
          }}
        />
      ))}
    </div>
  );
};
