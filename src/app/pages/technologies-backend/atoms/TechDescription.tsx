"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

export const TechDescription = ({ es, en }: { es: string; en: string }) => (
  <p className="tb-description">
    <T es={es} en={en} />
  </p>
);
