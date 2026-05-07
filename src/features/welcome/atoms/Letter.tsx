"use client";

export const Letter = ({ char, index }: { char: string; index: number }) => (
  <div className={`wp-letter wp-L${index + 1}`}>
    {char}
  </div>
);
