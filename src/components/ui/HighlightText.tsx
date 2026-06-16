import { type ReactNode } from "react";

/** Wraps text in a yellow highlighter underline. */
export function HighlightText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`highlight-underline px-0.5 ${className}`}>{children}</span>
  );
}
