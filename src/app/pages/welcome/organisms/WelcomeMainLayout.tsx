"use client";

import { LettersGroup } from "../molecules/LettersGroup";
import { CargoText } from "../molecules/CargoText";
import { ScrollIndicator } from "../molecules/ScrollIndicator";

export const WelcomeMainLayout = ({ displayName, isMounted }: { displayName: string; isMounted: boolean }) => (
  <section className="welcome" id="welcome">
    <div className="flip-container plain">
      {isMounted && displayName && <LettersGroup displayName={displayName} />}
      <div className="mobile-break"></div>
      {isMounted && <CargoText />}
    </div>
    <ScrollIndicator />
  </section>
);
