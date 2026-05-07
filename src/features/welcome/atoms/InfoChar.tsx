"use client";

export const InfoChar = ({ char }: { char: string }) => (
  <span className="wp-info-char" style={{ display: "inline-block" }}>
    {char === " " ? "\u00A0" : char}
  </span>
);
