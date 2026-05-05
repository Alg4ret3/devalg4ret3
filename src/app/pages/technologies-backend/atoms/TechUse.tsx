"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

export const TechUse = ({ es, en }: { es: string; en: string }) => (
  <p className="tb-use">
    <T es={es} en={en} />
  </p>
);
