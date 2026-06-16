import { type ReactNode } from "react";

interface StickyNoteProps {
  children: ReactNode;
  /** Rotation in degrees for the hand-placed look. */
  rotate?: number;
  /** Show a tape strip at the top. */
  tape?: boolean;
  className?: string;
}

/** A torn-paper sticky note with optional tape — for result/annotation notes. */
export function StickyNote({
  children,
  rotate = -1.5,
  tape = true,
  className = "",
}: StickyNoteProps) {
  return (
    <div
      className={`torn-card relative p-5 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && (
        <span
          aria-hidden
          className="tape absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2 rounded-sm"
        />
      )}
      {children}
    </div>
  );
}
