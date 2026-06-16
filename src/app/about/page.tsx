import type { Metadata } from "next";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";
import { DisclaimerStrip } from "@/components/layout/DisclaimerStrip";

export const metadata: Metadata = {
  title: "About — CXR Triage",
  description:
    "What CXR Triage is, how it should be used, and our responsible-AI framing.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hand text-4xl text-ink">
        About <HighlightText>CXR Triage</HighlightText>
      </h1>
      <p className="mt-4 text-base text-muted-ink">
        CXR Triage is an educational healthcare-AI prototype that helps
        triage chest X-ray images into likely-normal or likely-pneumonia
        patterns, using a medical foundation-model workflow. It demonstrates the
        full path from model training to a deployed inference API.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="font-hand text-2xl text-ink">What it is</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "An AI-assisted educational triage prototype",
            "A portfolio-grade healthcare ML project",
            "A demonstration from model training to deployed inference",
            "A human-in-the-loop workflow — clinicians make the final call",
          ].map((t) => (
            <PaperCard key={t} className="p-4">
              <p className="text-sm text-ink">{t}</p>
            </PaperCard>
          ))}
        </div>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="font-hand text-2xl text-ink">What it is not</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "A diagnostic device",
            "A radiologist replacement",
            "A clinically validated decision system",
            "A tool that makes final medical decisions",
          ].map((t) => (
            <PaperCard key={t} tone="card" className="p-4">
              <p className="text-sm text-ink">{t}</p>
            </PaperCard>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Responsible AI</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-ink">
          Results are always presented as a triage insight, never a diagnosis.
          We show the model&rsquo;s confidence, keep disclaimers visible before
          and after every result, and place the human reviewer at the centre of
          the workflow. The interpretation text reflects only what the model
          actually produces — it does not fabricate clinical findings.
        </p>
      </section>

      <div className="mt-10">
        <DisclaimerStrip />
      </div>
    </div>
  );
}
