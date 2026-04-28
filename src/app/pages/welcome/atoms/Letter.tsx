"use client";

export const Letter = ({ char, index }: { char: string; index: number }) => (
  <div className={`letter L${index + 1}`}>
    {char}
  </div>
);
