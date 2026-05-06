"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProjectImage } from "../atoms/ProjectImage";
import { ProjectInfo } from "../atoms/ProjectInfo";
import { ProjectTags } from "../atoms/ProjectTags";

interface Project {
  id: number;
  title: string;
  descriptionEs: string;
  descriptionEn: string;
  image: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  // index will be used for staggered animations in the future
  void index;

  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const cardElement = cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = cardElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(cardElement, {
        rotateX: (y / rect.height - 0.5) * -5,
        rotateY: (x / rect.width - 0.5) * 5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cardElement, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    if (isHovered) {
      document.addEventListener("mousemove", handleMouseMove);
      cardElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cardElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="pj-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform",
      }}
    >
      <ProjectImage image={project.image} title={project.title} />
      <ProjectInfo
        title={project.title}
        descriptionEs={project.descriptionEs}
        descriptionEn={project.descriptionEn}
      />
      <ProjectTags tags={project.tags} />
    </div>
  );
};

import gsap from "gsap";
