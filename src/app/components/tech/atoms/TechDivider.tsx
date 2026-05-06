"use client";

import React from "react";

type TechVariant = "frontend" | "backend";

interface TechDividerProps {
  variant: TechVariant;
}

export const TechDivider = ({ variant }: TechDividerProps) => {
  const prefix = variant === "frontend" ? "tf" : "tb";
  return <div className={`${prefix}-divider`} />;
};
