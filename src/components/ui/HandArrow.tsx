interface HandArrowProps {
  className?: string;
  /** Rough direction of the arrow. */
  direction?: "right" | "down" | "down-left";
  size?: number;
}

/** A curved, hand-drawn arrow for annotations and flow connectors. */
export function HandArrow({
  className = "",
  direction = "right",
  size = 56,
}: HandArrowProps) {
  const paths: Record<string, string> = {
    right: "M4 20c14-10 30-10 46-4 M40 8l10 8-9 7",
    down: "M16 4c10 12 10 26 4 44 M6 38l10 10 10-9",
    "down-left": "M48 6C36 16 22 24 8 40 M20 38l-12 4 3-12",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[direction]} />
    </svg>
  );
}
