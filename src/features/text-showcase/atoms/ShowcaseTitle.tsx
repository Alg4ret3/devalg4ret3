import React, { forwardRef } from "react";

interface ShowcaseTitleProps {
  text1: string;
  text2: string;
}

export const ShowcaseTitle = forwardRef<HTMLHeadingElement, ShowcaseTitleProps>(
  ({ text1, text2 }, ref) => {
    return (
      <h1 ref={ref} className="ts-text">
        {text1}
        <span>{text2}</span>
      </h1>
    );
  }
);

ShowcaseTitle.displayName = "ShowcaseTitle";
