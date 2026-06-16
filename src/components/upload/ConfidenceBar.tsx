import { confidenceBand } from "@/lib/labels";

const toneColor: Record<string, string> = {
  green: "bg-clinical-green",
  red: "bg-result-red",
  neutral: "bg-highlight",
};

/**
 * Confidence display. Always shows the numeric % and a qualitative band —
 * never communicates via color alone (accessibility requirement).
 */
export function ConfidenceBar({
  value,
  tone,
}: {
  value: number; // 0..100
  tone: "green" | "red" | "neutral";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-ink">Confidence</span>
        <span className="font-hand text-3xl text-ink">{value}%</span>
      </div>
      <div
        className="mt-1 h-3 w-full overflow-hidden rounded-full bg-paper-card"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Model confidence ${value} percent, ${confidenceBand(value)}`}
      >
        <div
          className={`animate-confidence-fill h-full rounded-full ${toneColor[tone]}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-muted-ink">{confidenceBand(value)}</p>
    </div>
  );
}
