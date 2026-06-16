import { HandIcon } from "@/components/ui/HandIcon";
import { DISCLAIMER_TITLE, DISCLAIMER_BODY } from "@/lib/constants";

/**
 * Persistent safety disclaimer. `variant="brush"` is the black banner style;
 * `variant="strip"` (default) is the lighter paper strip.
 */
export function DisclaimerStrip({
  variant = "strip",
  className = "",
}: {
  variant?: "strip" | "brush";
  className?: string;
}) {
  if (variant === "brush") {
    return (
      <div
        className={`flex items-start gap-3 rounded-sm bg-black-brush px-5 py-4 text-white-chalk ${className}`}
        role="note"
      >
        <HandIcon name="shield" size={22} className="mt-0.5 shrink-0" />
        <p className="text-sm">
          <strong className="font-hand text-base">Not a diagnostic tool.</strong>{" "}
          Not a replacement for clinical judgment.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 rounded-card border border-line bg-paper-card px-5 py-4 ${className}`}
      role="note"
    >
      <HandIcon name="shield" size={22} className="mt-0.5 shrink-0 text-clinical-green" />
      <p className="text-sm text-ink">
        <strong className="font-hand text-base">{DISCLAIMER_TITLE}</strong>{" "}
        <span className="text-muted-ink">{DISCLAIMER_BODY}</span>
      </p>
    </div>
  );
}
