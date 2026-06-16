"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UploadDropzone } from "@/components/upload/UploadDropzone";
import { SampleImages } from "@/components/upload/SampleImages";
import { XrayPreviewCard } from "@/components/upload/XrayPreviewCard";
import { UploadChecklist } from "@/components/upload/UploadChecklist";
import { UploadStepper } from "@/components/upload/UploadStepper";
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

  const workspaceRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const currentStep: 1 | 2 | 3 =
    phase === "empty" ? 1 : phase === "complete" ? 3 : 2;

  // Auto-scroll: to the workspace when a file is picked, to the result when ready.
  useEffect(() => {
    if (phase === "selected" || phase === "analyzing") {
      workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (phase === "complete" || phase === "error") {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [phase]);

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
      setError(
        e instanceof PredictError ? e : new PredictError("server", "Something went wrong."),
      );
      setPhase("error");
    }
  }

  const hasFile = phase !== "empty" && file;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6">
      {/* Title */}
      <header className="mb-5">
        <h1 className="font-hand text-4xl text-ink">
          Upload a <HighlightText>Chest X-ray</HighlightText>
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-ink">
          Our AI analyzes the image and helps you make faster, more confident
          triage decisions. This is an educational prototype, not a diagnosis.
        </p>
      </header>

      {/* Stepper */}
      <div className="mb-5">
        <UploadStepper current={currentStep} />
      </div>

      {/* Top disclaimer */}
      <DisclaimerStrip className="mb-6" />

      {/* Live region for screen readers */}
      <p aria-live="polite" className="sr-only">
        {phase === "analyzing" ? "Analyzing image" : ""}
        {phase === "complete" && view ? `Result ready: ${view.headline}` : ""}
        {phase === "error" && error ? `Error: ${error.userMessage}` : ""}
      </p>

      {/* ---------- EMPTY STATE: dropzone + samples, nothing else ---------- */}
      {phase === "empty" && (
        <div className="mx-auto max-w-2xl space-y-5">
          <UploadDropzone onFileAccepted={onFileAccepted} onReject={onReject} />
          <SampleImages onPick={onFileAccepted} />
        </div>
      )}

      {/* ---------- WORKSPACE: once a file exists ---------- */}
      {hasFile && (
        <div ref={workspaceRef} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: preview + actions */}
          <div className="space-y-4">
            <XrayPreviewCard file={file} onChange={reset} />

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
            {(phase === "complete" || phase === "error") && (
              <BrushButton variant="ghost" onClick={reset} className="w-full">
                Upload another
              </BrushButton>
            )}

            <UploadChecklist analyzed={phase === "complete"} />
          </div>

          {/* Right: result (spans 2 cols on desktop for emphasis) */}
          <div ref={resultRef} className="lg:col-span-2">
            {phase === "error" ? (
              <ResultCard
                state="error"
                error={error ?? undefined}
                onRetry={analyze}
                onChooseAnother={reset}
              />
            ) : phase === "complete" && view ? (
              <div className="space-y-6">
                <ResultCard state="complete" view={view} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <InterpretationCard note={view.note} />
                  <HumanReviewCard />
                </div>
              </div>
            ) : (
              <ResultCard state="pending" />
            )}
          </div>
        </div>
      )}

      {/* Bottom disclaimer banner */}
      <div className="mt-10">
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
