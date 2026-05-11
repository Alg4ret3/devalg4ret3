import React, { forwardRef } from "react";
import { TEXT_SHOWCASE_DATA } from "@/constants";
import { ShowcaseTitle } from "../atoms/ShowcaseTitle";

export const ShowcaseList = forwardRef<HTMLElement>((_, ref) => (
  <section className="ts-section" ref={ref}>
    <div className="ts-container">
      {TEXT_SHOWCASE_DATA.map((item) => (
        <ShowcaseTitle 
          key={item.id}
          text1={item.text1}
          text2={item.text2}
        />
      ))}
    </div>
  </section>
));

ShowcaseList.displayName = "ShowcaseList";
