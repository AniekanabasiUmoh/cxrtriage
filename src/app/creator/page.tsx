import type { Metadata } from "next";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";
import { HandIcon } from "@/components/ui/HandIcon";

export const metadata: Metadata = {
  title: "About the Creator — CXR Triage",
  description: "The clinician behind CXR Triage and the journey from medicine to machine learning.",
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export default function CreatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hand text-4xl text-ink">
        About the <HighlightText>Creator</HighlightText>
      </h1>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[200px_1fr]">
        {/* Polaroid portrait placeholder */}
        <PaperCard tone="torn" rotate={-2} className="h-fit p-3">
          <div className="flex aspect-square items-center justify-center bg-paper-card">
            <HandIcon name="clinician" size={56} className="text-muted-ink" />
          </div>
          <p className="mt-2 text-center font-hand text-sm text-muted-ink">
            [ portrait ]
          </p>
        </PaperCard>

        <div>
          <h2 className="font-hand text-2xl text-ink">A doctor learning to build.</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            CXR Triage was built by a medical doctor transitioning into
            machine learning, with a focus on healthcare applications in
            low-resource African settings. The project grew out of a simple
            clinical reality: in a busy emergency department, the limiting factor
            is rarely knowledge — it is time and attention.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-ink">
            {/* TODO: replace with real bio */}
            {LOREM}
          </p>
        </div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="font-hand text-2xl text-ink">The journey</h2>
        {["From medicine to machine learning", "Why low-resource healthcare", "What comes next"].map(
          (title) => (
            <PaperCard key={title} className="p-5">
              <h3 className="font-hand text-lg text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-ink">
                {/* TODO: replace placeholder with real content */}
                {LOREM}
              </p>
            </PaperCard>
          ),
        )}
      </section>

      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Mission</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-ink">
          {/* TODO: replace placeholder with real content */}
          {LOREM} {LOREM}
        </p>
      </section>
    </div>
  );
}
