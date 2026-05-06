"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

type TechVariant = "frontend" | "backend";

interface TechUseProps {
  es: string;
  en: string;
  variant: TechVariant;
}

export const TechUse = ({ es, en, variant }: TechUseProps) => {
  const prefix = variant === "frontend" ? "tf" : "tb";
  return (
    <p className={`${prefix}-use`}>
      <T es={es} en={en} />
    </p>
  );
};
