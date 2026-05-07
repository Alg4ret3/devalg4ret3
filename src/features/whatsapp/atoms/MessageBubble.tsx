import React, { forwardRef } from "react";

interface MessageBubbleProps {
  text: string;
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(({ text }, ref) => (
  <div className="wa-bubble" ref={ref} style={{ opacity: 0, transform: "scale(0)" }}>
    {text}
  </div>
));

MessageBubble.displayName = "MessageBubble";
