import type { Metadata } from "next";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";
import { HandIcon } from "@/components/ui/HandIcon";
import { DisclaimerStrip } from "@/components/layout/DisclaimerStrip";

export const metadata: Metadata = {
  title: "Whitepaper — CXR Triage",
  description:
    "Technical writeup: data, methodology, model journey, results, and limitations.",
};

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.";

const SECTIONS = [
  { id: "abstract", title: "Abstract", figure: false },
  { id: "data", title: "Data", figure: false },
  { id: "methodology", title: "Methodology", figure: false },
  { id: "model-journey", title: "Model Journey", figure: true },
  { id: "results", title: "Results", figure: true },
  { id: "limitations", title: "Limitations", figure: false },
  { id: "future-work", title: "Future Work", figure: false },
] as const;

export default function WhitepaperPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="font-hand text-sm text-muted-ink">Technical writeup &bull; draft</p>
      <h1 className="mt-1 font-hand text-4xl text-ink">
        CXR Triage <HighlightText>Whitepaper</HighlightText>
      </h1>
      <p className="mt-3 text-sm text-muted-ink">
        Predicting pneumonia patterns in chest X-rays for low-resource triage —
        a comparison from baseline CNN to medical foundation-model embeddings.
      </p>

      {/* Table of contents */}
      <PaperCard tone="card" className="mt-8 p-5">
        <h2 className="font-hand text-lg text-ink">Contents</h2>
        <ol className="mt-2 list-inside list-decimal text-sm text-muted-ink">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="hover:text-ink hover:underline">
                {s.title}
              </a>
            </li>
          ))}
        </ol>
      </PaperCard>

      {/* Sections */}
      <div className="mt-10 space-y-12">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="font-hand text-2xl text-ink">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-ink">
              {/* TODO: replace lorem ipsum with real content */}
              {LOREM}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-ink">{LOREM}</p>

            {s.figure && (
              <figure className="mt-5">
                <div className="flex aspect-[16/9] items-center justify-center rounded-card border-2 border-dashed border-line bg-paper-light text-muted-ink">
                  <span className="flex items-center gap-2 font-hand">
                    <HandIcon name="document" size={20} /> [ figure placeholder ]
                  </span>
                </div>
                <figcaption className="mt-2 text-xs text-muted-ink">
                  Figure for {s.title} — to be added.
                </figcaption>
              </figure>
            )}
          </section>
        ))}
      </div>

      <div className="mt-12">
        <DisclaimerStrip />
      </div>
    </div>
  );
}
