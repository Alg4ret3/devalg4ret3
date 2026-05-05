"use client";

import { LettersGroup } from "../molecules/LettersGroup";
import { CargoText } from "../molecules/CargoText";
import { ScrollIndicator } from "../molecules/ScrollIndicator";

export const WelcomeMainLayout = ({ displayName, isMounted }: { displayName: string; isMounted: boolean }) => (
  <section className="wp-section" id="welcome">
    <div className="wp-container wp-plain">
      {isMounted && displayName && <LettersGroup displayName={displayName} />}
      <div className="wp-mobile-break"></div>
      {isMounted && <CargoText />}
    </div>
    <ScrollIndicator />
  </section>
);
