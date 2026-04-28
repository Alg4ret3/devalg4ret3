"use client";

import { InfoChar } from "../atoms/InfoChar";

export const CargoText = () => {
  const text = "COMPUTER ENGINEER";
  return (
    <div className="info-text">
      {text.split("").map((char, i) => (
        <InfoChar key={i} char={char} />
      ))}
    </div>
  );
};
