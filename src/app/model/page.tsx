import type { Metadata } from "next";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";
import { HandIcon } from "@/components/ui/HandIcon";
import { BrushButton } from "@/components/ui/BrushButton";

export const metadata: Metadata = {
  title: "Model Journey — AfriCXR Triage",
  description:
    "From a baseline CNN to MobileNetV2 transfer learning to MedSigLIP embeddings.",
};

const STAGES = [
  {
    n: "1",
    title: "Baseline CNN (from scratch)",
    body: "A convolutional network trained from random weights on the chest X-ray dataset — the from-zero benchmark that every later model must beat.",
    note: "Learns everything from limited data; weakest generalization.",
  },
  {
    n: "2",
    title: "MobileNetV2 transfer learning",
    body: "A vision backbone pretrained on natural images, with a new classification head trained on chest X-rays. Stronger features, faster training.",
    note: "Better accuracy and probability separation than the baseline.",
  },
  {
    n: "3",
    title: "MedSigLIP embeddings + logistic regression",
    body: "A medical foundation model turns each X-ray into a rich 1152-dimensional embedding; a lightweight logistic regression classifies it. This pipeline powers the deployed demo.",
    note: "Best balance of pneumonia detection and reduced false positives.",
  },
] as const;

export default function ModelPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hand text-4xl text-ink">
        Model <HighlightText>Journey</HighlightText>
      </h1>
      <p className="mt-4 text-base text-muted-ink">
        AfriCXR Triage began as a comparison across three stages of computer
        vision in healthcare. Each stage is a real, evaluated model — not a
        marketing claim.
      </p>

      <ol className="mt-10 space-y-6">
        {STAGES.map((s) => (
          <li key={s.n}>
            <PaperCard className="p-6">
              <div className="flex items-start gap-4">
                <span className="font-hand text-4xl text-highlight">{s.n}</span>
                <div>
                  <h2 className="font-hand text-xl text-ink">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink">{s.body}</p>
                  <p className="mt-3 flex items-center gap-2 text-xs text-muted-ink">
                    <HandIcon name="info" size={16} />
                    {s.note}
                  </p>
                </div>
              </div>
            </PaperCard>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <BrushButton as="link" href="/whitepaper" variant="ghost">
          Read the Whitepaper
        </BrushButton>
        <BrushButton as="link" href="/upload" variant="green">
          Try the Demo
        </BrushButton>
      </div>
    </div>
  );
}
