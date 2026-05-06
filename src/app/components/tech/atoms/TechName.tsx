"use client";

import React from "react";

type TechVariant = "frontend" | "backend";

interface TechNameProps {
  name: string;
  variant: TechVariant;
}

export const TechName = ({ name, variant }: TechNameProps) => {
  const prefix = variant === "frontend" ? "tf" : "tb";
  return <h3 className={`${prefix}-name`}>{name}</h3>;
};
