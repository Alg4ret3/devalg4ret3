"use client";

import React, { useEffect, useRef, useState } from "react";
import { TechIcon } from "../atoms/TechIcon";
import { TechName } from "../atoms/TechName";
import { TechDescription } from "../atoms/TechDescription";
import { TechDivider } from "../atoms/TechDivider";
import { TechUse } from "../atoms/TechUse";

interface TechCardProps {
  id: number;
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  useEs: string;
  useEn: string;
  index: number;
}

export const TechCard = ({ id, name, descriptionEs, descriptionEn, useEs, useEn, index }: TechCardProps) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = ["tb-from-right", "tb-from-left", "tb-bounce-in", "tb-rotate-zoom"];
  const animationClass = animationClasses[index % animationClasses.length];
  
  return (
    <div 
      ref={cardRef}
      className={`tb-card ${animationClass} ${inView ? "tb-animate-in" : ""}`}
    >
      <TechIcon name={name} />
      <TechName name={name} />
      <TechDescription es={descriptionEs} en={descriptionEn} />
      <TechDivider />
      <TechUse es={useEs} en={useEn} />
    </div>
  );
};
