import type { PredictionResponse, ResultView } from "@/types/prediction";

/**
 * Single source of truth mapping the backend response to the UI's safe
 * "Pattern" wording. IMPORTANT: `uncertain` is checked FIRST — a confident
 * class with uncertain=true must still read as "Low Confidence Result".
 *
 * The interpretation `note` is the backend's real triage_note verbatim.
 * We never fabricate clinical detail the model did not produce.
 */
export function toResultView(r: PredictionResponse): ResultView {
  if (r.uncertain) {
    return {
      variant: "low_confidence",
      headline: "Low Confidence Result",
      confidencePct: Math.round(r.confidence * 100),
      note: r.triage_note,
      disclaimer: r.disclaimer,
      tone: "neutral",
    };
  }

  if (r.predicted_class === "PNEUMONIA") {
    return {
      variant: "pneumonia",
      headline: "Likely Pneumonia Pattern",
      confidencePct: Math.round(r.confidence * 100),
      note: r.triage_note,
      disclaimer: r.disclaimer,
      tone: "red",
    };
  }

  return {
    variant: "normal",
    headline: "Likely Normal Pattern",
    confidencePct: Math.round(r.confidence * 100),
    note: r.triage_note,
    disclaimer: r.disclaimer,
    tone: "green",
  };
}

/** Qualitative band shown alongside the numeric confidence (never color-only). */
export function confidenceBand(pct: number): string {
  if (pct >= 85) return "High confidence";
  if (pct >= 70) return "Moderate confidence";
  if (pct >= 55) return "Low–moderate confidence";
  return "Low confidence";
}
