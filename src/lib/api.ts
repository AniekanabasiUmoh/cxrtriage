import type { PredictionResponse, PredictErrorKind } from "@/types/prediction";
import { ACCEPTED_TYPES, MAX_BYTES, MAX_MB_LABEL } from "@/lib/constants";

const BASE = process.env.NEXT_PUBLIC_API_URL;

/** Typed error carrying a user-safe message. */
export class PredictError extends Error {
  kind: PredictErrorKind;
  userMessage: string;
  constructor(kind: PredictErrorKind, userMessage: string) {
    super(userMessage);
    this.name = "PredictError";
    this.kind = kind;
    this.userMessage = userMessage;
  }
}

/** Client-side validation mirroring the backend (runs BEFORE upload). */
export function validateFile(file: File): PredictError | null {
  if (file.size === 0) {
    return new PredictError(
      "validation_empty",
      "That file is empty. Please choose a valid X-ray image.",
    );
  }
  if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
    return new PredictError(
      "validation_type",
      "Unsupported file type. Please upload a JPG or PNG image.",
    );
  }
  if (file.size > MAX_BYTES) {
    return new PredictError(
      "validation_size",
      `File is larger than ${MAX_MB_LABEL}. Please upload a smaller image.`,
    );
  }
  return null;
}

/** POST one chest X-ray to the backend and return the prediction. */
export async function predictChestXray(file: File): Promise<PredictionResponse> {
  const pre = validateFile(file);
  if (pre) throw pre;

  if (!BASE) {
    throw new PredictError(
      "server",
      "The app is not configured to reach the analysis service.",
    );
  }

  const form = new FormData();
  form.append("file", file); // field name must be "file"

  let res: Response;
  try {
    // Do NOT set Content-Type — the browser adds the multipart boundary.
    res = await fetch(`${BASE}/predict`, { method: "POST", body: form });
  } catch {
    throw new PredictError(
      "network",
      "Couldn't reach the analysis service. Check your connection and try again.",
    );
  }

  if (!res.ok) {
    switch (res.status) {
      case 415:
        throw new PredictError(
          "unsupported",
          "Unsupported file type. Please upload a JPG or PNG image.",
        );
      case 400:
        throw new PredictError(
          "bad_request",
          "The image couldn't be read. It may be corrupt, empty, or too large.",
        );
      case 422:
        throw new PredictError(
          "missing_file",
          "No image was received. Please choose a file and try again.",
        );
      default:
        throw new PredictError(
          "server",
          "Analysis failed on the server. Please try again in a moment.",
        );
    }
  }

  return (await res.json()) as PredictionResponse;
}

/** Lightweight liveness check used to surface backend availability. */
export async function checkHealth(): Promise<boolean> {
  if (!BASE) return false;
  try {
    const res = await fetch(`${BASE}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}
