"use client";

import { useState, useCallback, useEffect } from "react";
import Welcome from "./components/Welcome";
import Hero from "./components/Hero";

export default function Home() {
  const [isFinished, setIsFinished] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsFinished(true);
  }, []);

  useEffect(() => {
    if (!isFinished) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isFinished]);

  return (
    <main className={!isFinished ? "no-scroll" : ""}>
      <Welcome onAnimationComplete={handleAnimationComplete} />
      <Hero />
    </main>
  );
}
