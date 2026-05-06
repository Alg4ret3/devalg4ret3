"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

type TechVariant = "frontend" | "backend";

interface TechDescriptionProps {
  es: string;
  en: string;
  variant: TechVariant;
}

export const TechDescription = ({ es, en, variant }: TechDescriptionProps) => {
  const prefix = variant === "frontend" ? "tf" : "tb";
  return (
    <p className={`${prefix}-description`}>
      <T es={es} en={en} />
    </p>
  );
};
