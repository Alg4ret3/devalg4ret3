"use client";

import React, { useEffect, useRef, useState } from "react";
import { T } from "../../../context/LanguageContext";

export const BackendTitle = () => {
  const [inView, setInView] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -5% 0px"
      }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <h2
      className={`tb-title ${inView ? "tb-animate-in" : ""}`}
      ref={titleRef}
    >
      <T es="Tecnologías Backend" en="Backend Technologies" />
    </h2>
  );
};
