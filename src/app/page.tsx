import Image from "next/image";
import { BrushButton } from "@/components/ui/BrushButton";
import { HighlightText } from "@/components/ui/HighlightText";
import { PaperCard } from "@/components/ui/PaperCard";
import { StickyNote } from "@/components/ui/StickyNote";
import { HandArrow } from "@/components/ui/HandArrow";
import { HandIcon } from "@/components/ui/HandIcon";
import { DisclaimerStrip } from "@/components/layout/DisclaimerStrip";
import { ClinicFooterIllustration } from "@/components/layout/ClinicFooterIllustration";

const QUICK_FEATURES = [
  { icon: "upload", label: "Upload" },
  { icon: "magnifier", label: "Get AI insight" },
  { icon: "clinician", label: "You decide" },
] as const;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6">
      {/* ---------- Hero ---------- */}
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-hand text-5xl leading-tight text-ink sm:text-6xl">
            AI that <HighlightText>assists</HighlightText>.
            <br />
            People who decide.
          </h1>
          <p className="mt-5 max-w-md text-base text-muted-ink">
            AfriCXR Triage is an educational prototype building AI workflows for
            chest X-ray triage in low-resource healthcare settings.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <BrushButton as="link" href="/upload" variant="brush">
              Try the Demo
            </BrushButton>
            <BrushButton as="link" href="/model" variant="ghost">
              View Model Journey
            </BrushButton>
          </div>

          <Image
            src="/assets/brush-disclaimer.webp"
            alt="Not a diagnostic tool. Not a radiologist replacement."
            width={700}
            height={233}
            className="mt-6 h-auto w-72"
          />

          {/* Quick-feature row */}
          <ul className="mt-8 flex flex-wrap gap-6">
            {QUICK_FEATURES.map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-sm text-ink">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper-card">
                  <HandIcon name={f.icon} size={18} className="text-clinical-green" />
                </span>
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Hero collage: watercolor clinic + taped X-ray + sticky result + arrow */}
        <div className="relative mx-auto w-full max-w-md">
          {/* watercolor clinic scene behind */}
          <Image
            src="/assets/rural-clinic.webp"
            alt=""
            aria-hidden
            width={560}
            height={700}
            priority
            className="pointer-events-none absolute -right-4 top-6 w-[78%] opacity-60"
          />

          {/* taped X-ray polaroid */}
          <PaperCard tone="torn" rotate={-3} tape className="relative w-[68%] p-3">
            <Image
              src="/assets/xray-collage.webp"
              alt="Sample chest X-ray from a public teaching dataset"
              width={560}
              height={700}
              priority
              className="h-auto w-full rounded"
            />
          </PaperCard>

          {/* sticky result note */}
          <StickyNote
            rotate={4}
            className="absolute bottom-2 right-0 w-44"
          >
            <p className="font-hand text-base text-result-red">
              Likely Pneumonia Pattern
            </p>
            <p className="mt-1 text-xs text-muted-ink">Confidence</p>
            <p className="font-hand text-2xl text-ink">87%</p>
          </StickyNote>

          {/* hand-drawn annotation */}
          <div className="absolute -bottom-10 left-2 flex items-center gap-1 text-muted-ink">
            <HandArrow direction="down-left" size={44} />
            <span className="font-hand text-sm">
              Triage insight, not final diagnosis.
            </span>
          </div>
        </div>
      </section>

      {/* ---------- How the triage flow works ---------- */}
      <section className="mt-20">
        <h2 className="font-hand text-3xl text-ink">How the triage flow works.</h2>
        <Image
          src="/assets/triage-flow.webp"
          alt="Triage flow: 1. Upload chest X-ray, 2. AI triage prediction, 3. Triage interpretation, 4. Human review by a clinician."
          width={1400}
          height={788}
          className="mt-6 h-auto w-full"
        />
        <p className="mt-2 text-xs text-muted-ink">
          The live demo accepts JPG and PNG images.
        </p>
      </section>

      {/* ---------- Model journey ---------- */}
      <section className="mt-20">
        <h2 className="font-hand text-3xl text-ink">
          From baseline models to <HighlightText>foundation-model</HighlightText>{" "}
          workflow.
        </h2>
        <Image
          src="/assets/model-progression.webp"
          alt="Model progression: baseline CNN trained from scratch, then MobileNetV2 transfer learning, then MedSigLIP embeddings with logistic regression — the best balance of pneumonia detection and reduced false positives."
          width={1400}
          height={788}
          className="mt-6 h-auto w-full"
        />
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative mt-20">
        <Image
          src="/assets/cta-banner.webp"
          alt=""
          aria-hidden
          width={1400}
          height={788}
          className="h-auto w-full"
        />
        {/* Real, clickable CTAs overlaid on the lower area of the banner */}
        <div className="absolute inset-x-0 bottom-[12%] flex justify-center gap-4 px-4">
          <BrushButton as="link" href="/upload" variant="highlight">
            Explore the Demo
          </BrushButton>
          <BrushButton
            as="link"
            href="/model"
            variant="ghost"
            className="border-white-chalk/40 text-white-chalk"
          >
            View Model Journey
          </BrushButton>
        </div>
        {/* Accessible text equivalent of the banner */}
        <p className="sr-only">
          Early insight. Human judgment. Explore a portfolio-grade healthcare ML
          project demonstrating the path from model training to deployed
          inference API.
        </p>
      </section>

      <div className="mt-12">
        <DisclaimerStrip />
      </div>
      <ClinicFooterIllustration className="mt-6" />
    </div>
  );
}
