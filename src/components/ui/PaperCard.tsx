import { type ReactNode } from "react";

type Tone = "light" | "card" | "torn";

interface PaperCardProps {
  children: ReactNode;
  tone?: Tone;
  /** Small decorative rotation in degrees (decorative content only). */
  rotate?: number;
  /** Show a decorative tape strip at the top. */
  tape?: boolean;
  className?: string;
}

const toneClass: Record<Tone, string> = {
  light: "paper-card",
  card: "paper-card",
  torn: "torn-card",
};

export function PaperCard({
  children,
  tone = "light",
  rotate = 0,
  tape = false,
  className = "",
}: PaperCardProps) {
  return (
    <div
      className={`relative ${toneClass[tone]} ${className}`}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {tape && (
        <span
          aria-hidden
          className="tape absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 rounded-sm"
        />
      )}
      {children}
    </div>
  );
}
