"use client";

import React from "react";

interface ProjectTagsProps {
  tags: string[];
}

export const ProjectTags = ({ tags }: ProjectTagsProps) => (
  <div className="pj-card-tags">
    {tags.map((tag, i) => (
      <span key={i} className="pj-tag">
        {tag}
      </span>
    ))}
  </div>
);
