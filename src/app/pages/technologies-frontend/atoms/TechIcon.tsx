"use client";

import React from "react";

interface TechIconProps {
  name: string;
}

export const TechIcon = ({ name }: TechIconProps) => {
  const icons: { [key: string]: React.ReactNode } = {
    "React": (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="1em" height="1em" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    "GSAP": (
      <svg viewBox="0 0 100 100" width="1em" height="1em" fill="currentColor">
        <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 88c-21 0-38-17-38-38s17-38 38-38 38 17 38 38-17 38-38 38z"/>
        <circle cx="50" cy="50" r="15"/>
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 180 180" width="1em" height="1em" fill="currentColor">
        <path d="M141 16.3L94.4 75.8V126h10.4V83.1l43.2-54.8c-1.3-.9-2.7-1.7-4.1-2.4l-2.9 10.4z" />
        <path d="M163.5 35.8c-1.6-1.5-3.3-2.9-5-4.2l-2.6 9.3c1.4 1.1 2.8 2.2 4.1 3.5l3.5-8.6z" />
        <path d="M110.1 166.7c1.7.3 3.4.5 5.2.5 45.4 0 82.3-36.9 82.3-82.3 0-14.7-3.9-28.5-10.7-40.4l-5.7 13.9c4.1 8.2 6.4 17.5 6.4 27.2 0 34.3-27.8 62.1-62.1 62.1-1.3 0-2.5-.1-3.7-.2l-11.7 19.2z" />
        <path d="M84 126V54H73.6v72H84z" />
      </svg>
    ),
    "Three.js": (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
        <path d="M12 2L1 21h22L12 2zm0 3.83L19.42 19H4.58L12 5.83zM12 9l-3 5h6l-3-5z" />
      </svg>
    ),
  };

  return (
    <div className="tf-icon">
      {icons[name] || null}
    </div>
  );
};
