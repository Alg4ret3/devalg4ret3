"use client";

import { Letter } from "../atoms/Letter";

export const LettersGroup = ({ displayName }: { displayName: string }) => (
  <>
    {displayName.split("").map((char, i) => (
      <Letter key={`${displayName}-${i}`} char={char} index={i} />
    ))}
  </>
);
