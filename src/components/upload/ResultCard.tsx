import { PaperCard } from "@/components/ui/PaperCard";
import { StickyNote } from "@/components/ui/StickyNote";
import { HandIcon } from "@/components/ui/HandIcon";
import { ConfidenceBar } from "@/components/upload/ConfidenceBar";
import type { ResultView } from "@/types/prediction";
import type { PredictError } from "@/lib/api";

type State = "pending" | "complete" | "error";

interface ResultCardProps {
  state: State;
  view?: ResultView;
  error?: PredictError;
  onRetry?: () => void;
  onChooseAnother?: () => void;
}

const headlineTone: Record<string, string> = {
  green: "text-clinical-green",
  red: "text-result-red",
  neutral: "text-highlight",
};

export function ResultCard({
  state,
  view,
  error,
  onRetry,
  onChooseAnother,
}: ResultCardProps) {
  // --- Pending (before analysis) ---
  if (state === "pending") {
    return (
      <StickyNote rotate={1.2}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-ink">
            <HandIcon name="info" size={18} /> AI Triage Result
          </span>
          <span className="rounded bg-paper-light px-2 py-0.5 text-xs font-semibold text-muted-ink">
            Pending
          </span>
        </div>
        <p className="mt-6 text-center font-hand text-2xl text-muted-ink">
          Awaiting Analysis…
        </p>
      </StickyNote>
    );
  }

  // --- Error (unsupported file / analysis failed) ---
  if (state === "error" && error) {
    const isUnsupported =
      error.kind === "unsupported" ||
      error.kind === "validation_type" ||
      error.kind === "validation_size" ||
      error.kind === "validation_empty";

    return (
      <PaperCard tone="torn" className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <HandIcon name="info" size={20} className="text-danger-red" />
          <h3 className="font-hand text-lg text-danger-red">
            {isUnsupported ? "Unsupported File" : "Analysis Failed"}
          </h3>
        </div>
        <p className="text-sm text-ink">{error.userMessage}</p>
        <div className="mt-4 flex gap-3">
          {!isUnsupported && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="rounded-lg bg-clinical-green px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Try again
            </button>
          )}
          {onChooseAnother && (
            <button
              type="button"
              onClick={onChooseAnother}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-paper-card"
            >
              Choose another file
            </button>
          )}
        </div>
      </PaperCard>
    );
  }

  // --- Complete (normal / pneumonia / low confidence) ---
  if (state === "complete" && view) {
    return (
      <StickyNote rotate={-1.5} className="animate-paper-slide-in">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-muted-ink">
            <HandIcon name="info" size={18} /> AI Triage Result
          </span>
          <span className="rounded bg-clinical-green-soft px-2 py-0.5 text-xs font-semibold text-clinical-green">
            Completed
          </span>
        </div>

        <h2 className={`mt-3 font-hand text-3xl ${headlineTone[view.tone]}`}>
          {view.headline}
        </h2>

        <div className="mt-4">
          <ConfidenceBar value={view.confidencePct} tone={view.tone} />
        </div>
      </StickyNote>
    );
  }

  return null;
}
