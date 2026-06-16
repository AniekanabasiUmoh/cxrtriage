/** A small decorative pencil-scribble accent (corner/underline flourish). */
export function PencilScribble({
  className = "",
  width = 90,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 90 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M2 8c10-4 18 2 28-1s18-5 28-1 18 4 30 1" />
    </svg>
  );
}
