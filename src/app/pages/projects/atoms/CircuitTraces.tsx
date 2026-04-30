"use client";

import React from "react";

export const CircuitTraces = () => {
  return (
    <div className="circuit-container">
      <svg className="circuit-svg" viewBox="0 0 100 4000" preserveAspectRatio="none">
        {/* --- NIVEL 1: 1 trazo de Card 1 a Card 2 --- */}
        <path className="trace level-1" d="M 80 400 L 80 600 L 20 800 L 20 1000" fill="none" />
        <circle className="node n1" cx="80" cy="400" r="5" />
        <circle className="node n1" cx="20" cy="1000" r="5" />

        {/* --- NIVEL 2: 2 trazos de Card 2 a Card 3 --- */}
        <path className="trace level-2" d="M 20 1300 L 20 1500 L 80 1700 L 80 1900" fill="none" />
        <path className="trace level-2" d="M 25 1350 L 25 1550 L 85 1750 L 85 1950" fill="none" />
        <circle className="node n2" cx="20" cy="1300" r="4" />
        <circle className="node n2" cx="80" cy="1950" r="4" />

        {/* --- NIVEL 3: 3 trazos de Card 3 a Card 4 --- */}
        <path className="trace level-3" d="M 80 2300 L 80 2500 L 20 2700 L 20 2900" fill="none" />
        <path className="trace level-3" d="M 85 2350 L 85 2550 L 25 2750 L 25 2950" fill="none" />
        <path className="trace level-3" d="M 75 2250 L 75 2450 L 15 2650 L 15 2850" fill="none" />
        <circle className="node n3" cx="80" cy="2300" r="3" />
        <circle className="node n3" cx="20" cy="2950" r="3" />
      </svg>
    </div>
  );
};
