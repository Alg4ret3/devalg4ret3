"use client";

import React, { useEffect, useRef, useState } from "react";
import { TechIcon } from "./atoms/TechIcon";
import { TechName } from "./atoms/TechName";
import { TechDescription } from "./atoms/TechDescription";
import { TechDivider } from "./atoms/TechDivider";
import { TechUse } from "./atoms/TechUse";

type TechVariant = "frontend" | "backend";

interface TechCardProps {
  name: string;
  descriptionEs: string;
  descriptionEn: string;
  useEs: string;
  useEn: string;
  index: number;
  variant: TechVariant;
}

export const TechCard = ({
  name,
  descriptionEs,
  descriptionEn,
  useEs,
  useEn,
  index,
  variant,
}: TechCardProps) => {
  const [inView, setInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const prefixes = variant === "frontend" ? "tf" : "tb";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animationClasses = [
    `${prefixes}-from-right`,
    `${prefixes}-from-left`,
    `${prefixes}-bounce-in`,
    `${prefixes}-rotate-zoom`,
  ];
  const animationClass = animationClasses[index % animationClasses.length];

  return (
    <div
      ref={cardRef}
      className={`${prefixes}-card ${animationClass} ${inView ? `${prefixes}-animate-in` : ""}`}
    >
      <TechIcon name={name} variant={variant} />
      <TechName name={name} variant={variant} />
      <TechDescription es={descriptionEs} en={descriptionEn} variant={variant} />
      <TechDivider variant={variant} />
      <TechUse es={useEs} en={useEn} variant={variant} />
    </div>
  );
};
