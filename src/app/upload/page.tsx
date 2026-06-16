"use client";

import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { SampleImages } from "@/components/upload/SampleImages";
import { XrayPreviewCard } from "@/components/upload/XrayPreviewCard";
import { XrayPreviewPlaceholder } from "@/components/upload/XrayPreviewPlaceholder";
import { UploadChecklist } from "@/components/upload/UploadChecklist";
import { ResultCard } from "@/components/upload/ResultCard";
import { InterpretationCard } from "@/components/upload/InterpretationCard";
import { HumanReviewCard } from "@/components/upload/HumanReviewCard";
import { DisclaimerStrip } from "@/components/layout/DisclaimerStrip";
import { ClinicFooterIllustration } from "@/components/layout/ClinicFooterIllustration";
import { BrushButton } from "@/components/ui/BrushButton";
import { HighlightText } from "@/components/ui/HighlightText";
import { predictChestXray, PredictError } from "@/lib/api";
import { toResultView } from "@/lib/labels";
import type { ResultView } from "@/types/prediction";

type Phase = "empty" | "selected" | "analyzing" | "complete" | "error";

export default function UploadPage() {
  const [phase, setPhase] = useState<Phase>("empty");
  const [file, setFile] = useState<File | null>(null);
  const [view, setView] = useState<ResultView | null>(null);
  const [error, setError] = useState<PredictError | null>(null);

  function reset() {
    setPhase("empty");
    setFile(null);
    setView(null);
    setError(null);
  }

  function onFileAccepted(f: File) {
    setFile(f);
    setView(null);
    setError(null);
    setPhase("selected");
  }

  function onReject(err: PredictError) {
    setError(err);
    setView(null);
    setPhase("error");
  }

  async function analyze() {
    if (!file) return;
    setPhase("analyzing");
    setError(null);
    try {
      const res = await predictChestXray(file);
      setView(toResultView(res));
      setPhase("complete");
    } catch (e) {
      setError(e instanceof PredictError ? e : new PredictError("server", "Something went wrong."));
      setPhase("error");
    }
  }

  const showPreview = phase !== "empty" && file;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
      {/* Title */}
      <header className="mb-6">
        <h1 className="font-hand text-4xl text-ink">
          Upload a <HighlightText>Chest X-ray</HighlightText>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-ink">
          Our AI analyzes the image and helps you make faster, more confident
          triage decisions. This is an educational prototype — not a diagnosis.
        </p>
      </header>

      {/* Top disclaimer (before result) */}
      <DisclaimerStrip className="mb-6" />

      {/* Live region for phase changes */}
      <p aria-live="polite" className="sr-only">
        {phase === "analyzing" ? "Analyzing image" : ""}
        {phase === "complete" && view ? `Result ready: ${view.headline}` : ""}
        {phase === "error" && error ? `Error: ${error.userMessage}` : ""}
      </p>

      {/* Top row: upload / preview / result */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Upload panel */}
        <div className="space-y-4">
          <UploadDropzone
            onFileAccepted={onFileAccepted}
            onReject={onReject}
            disabled={phase === "analyzing"}
          />
          {phase === "selected" && (
            <BrushButton variant="green" onClick={analyze} className="w-full">
              Start Analysis
            </BrushButton>
          )}
          {phase === "analyzing" && (
            <BrushButton variant="green" disabled className="w-full">
              Analyzing image…
            </BrushButton>
          )}
          {(phase === "selected" ||
            phase === "analyzing" ||
            phase === "complete") && (
            <UploadChecklist analyzed={phase === "complete"} />
          )}
        </div>

        {/* Preview */}
        <div>
          {showPreview ? (
            <XrayPreviewCard file={file} onChange={reset} />
          ) : (
            <XrayPreviewPlaceholder />
          )}
        </div>

        {/* Result */}
        <div>
          {phase === "error" ? (
            <ResultCard
              state="error"
              error={error ?? undefined}
              onRetry={analyze}
              onChooseAnother={reset}
            />
          ) : phase === "complete" && view ? (
            <ResultCard state="complete" view={view} />
          ) : (
            <ResultCard state="pending" />
          )}
        </div>
      </div>

      {/* Try-a-sample strip (hidden once a result is showing to reduce noise) */}
      {phase !== "complete" && (
        <div className="mt-6">
          <SampleImages onPick={onFileAccepted} />
        </div>
      )}

      {/* Interpretation + human review (only when complete) */}
      {phase === "complete" && view && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <InterpretationCard note={view.note} />
          <HumanReviewCard />
        </div>
      )}

      {/* Bottom disclaimer (after result) — designed non-diagnostic banner */}
      <div className="mt-8">
        <Image
          src="/assets/non-diagnostic-banner.webp"
          alt="This is not a diagnostic tool. For educational and research purposes only."
          width={1000}
          height={333}
          className="mx-auto h-auto w-full max-w-3xl"
        />
      </div>

      <ClinicFooterIllustration className="mt-8" />
    </div>
  );
}
