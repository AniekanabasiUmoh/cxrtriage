/** Shape returned by the backend POST /predict (must match FastAPI schema). */
export interface PredictionResponse {
  predicted_class: "NORMAL" | "PNEUMONIA";
  confidence: number; // 0..1
  display_label: string;
  triage_note: string;
  model_name: string;
  uncertain: boolean;
  disclaimer: string;
}

export type PredictErrorKind =
  | "validation_type"
  | "validation_size"
  | "validation_empty"
  | "unsupported"
  | "bad_request"
  | "missing_file"
  | "server"
  | "network";

/** Result variants the UI renders. */
export type ResultVariant =
  | "normal"
  | "pneumonia"
  | "low_confidence"
  | "unsupported"
  | "failed";

/** View model produced from a PredictionResponse for the ResultCard. */
export interface ResultView {
  variant: ResultVariant;
  headline: string;
  confidencePct: number;
  note: string;
  disclaimer: string;
  tone: "green" | "red" | "neutral";
}
