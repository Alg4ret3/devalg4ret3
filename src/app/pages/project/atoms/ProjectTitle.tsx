"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

export const ProjectTitle = () => {
  return (
    <h2 className="projects-main-title">
      <T es="Proyectos" en="Projects" />
    </h2>
  );
};
