"use client";

import React from "react";

interface ProjectImageProps {
  image: string;
  title: string;
}

export const ProjectImage = ({ image, title }: ProjectImageProps) => {
  // These will be used when real images are implemented
  void image;
  void title;

  return (
    <div className="pj-card-image">
      <div className="pj-image-placeholder">
        <span className="pj-image-icon">📁</span>
      </div>
    </div>
  );
};
