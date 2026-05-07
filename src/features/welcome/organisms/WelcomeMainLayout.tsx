import React, { forwardRef } from "react";
import { LettersGroup } from "../molecules/LettersGroup";
import { ScrollIndicator } from "../molecules/ScrollIndicator";

export const WelcomeMainLayout = forwardRef<HTMLElement, { displayName: string; isMounted: boolean }>(
  ({ displayName, isMounted }, ref) => (
    <section className="wp-section" id="welcome" ref={ref}>
      <div className="wp-container wp-plain">
        {isMounted && displayName && <LettersGroup displayName={displayName} />}
        <div className="wp-mobile-break"></div>
      </div>
      <ScrollIndicator />
    </section>
  )
);

WelcomeMainLayout.displayName = "WelcomeMainLayout";
