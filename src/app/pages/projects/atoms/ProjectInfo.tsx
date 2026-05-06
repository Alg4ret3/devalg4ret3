"use client";

import React from "react";
import { T } from "../../../context/LanguageContext";

interface ProjectInfoProps {
  title: string;
  descriptionEs: string;
  descriptionEn: string;
}

export const ProjectInfo = ({ title, descriptionEs, descriptionEn }: ProjectInfoProps) => (
  <div className="pj-card-info">
    <h3 className="pj-card-title">{title}</h3>
    <p className="pj-card-description">
      <T es={descriptionEs} en={descriptionEn} />
    </p>
  </div>
);
