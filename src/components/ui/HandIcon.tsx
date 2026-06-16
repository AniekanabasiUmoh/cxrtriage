type IconName =
  | "upload"
  | "lungs"
  | "clinician"
  | "shield"
  | "info"
  | "magnifier"
  | "trash"
  | "check"
  | "document"
  | "arrow";

interface HandIconProps {
  name: IconName;
  className?: string;
  size?: number;
  title?: string;
}

/**
 * Hand-drawn style icon set — stroke-based SVGs (crisp at any size,
 * no raster assets). Slightly irregular stroke for the notebook feel.
 */
export function HandIcon({ name, className = "", size = 24, title }: HandIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    role: title ? ("img" as const) : ("presentation" as const),
    "aria-hidden": title ? undefined : true,
  };

  return (
    <svg {...common}>
      {title ? <title>{title}</title> : null}
      {name === "upload" && (
        <>
          <path d="M12 16V4" />
          <path d="M7 9l5-5 5 5" />
          <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
        </>
      )}
      {name === "lungs" && (
        <>
          <path d="M12 3v8" />
          <path d="M9 7c0 4-2 5-3 9-.5 2 .5 3 2 3s2-1 2-3V9" />
          <path d="M15 7c0 4 2 5 3 9 .5 2-.5 3-2 3s-2-1-2-3V9" />
        </>
      )}
      {name === "clinician" && (
        <>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      )}
      {name === "info" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <path d="M12 8h.01" />
        </>
      )}
      {name === "magnifier" && (
        <>
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4.5-4.5" />
        </>
      )}
      {name === "trash" && (
        <>
          <path d="M4 7h16" />
          <path d="M9 7V4h6v3" />
          <path d="M6 7l1 13h10l1-13" />
        </>
      )}
      {name === "check" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </>
      )}
      {name === "document" && (
        <>
          <path d="M6 3h8l4 4v14a0 0 0 0 1 0 0H6a0 0 0 0 1 0 0V3z" />
          <path d="M14 3v4h4" />
          <path d="M9 13h6M9 17h6" />
        </>
      )}
      {name === "arrow" && <path d="M4 12h15M13 6l6 6-6 6" />}
    </svg>
  );
}
