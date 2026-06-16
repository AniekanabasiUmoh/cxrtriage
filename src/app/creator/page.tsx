import type { Metadata } from "next";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";
import { HandIcon } from "@/components/ui/HandIcon";

export const metadata: Metadata = {
  title: "About the Creator - CXR Triage",
  description:
    "Dr. Aniekanabasi Umoh — medical doctor building healthcare ML for low-resource settings.",
};

const SOCIALS = [
  { label: "Email", value: "umohaniekanabasi@gmail.com", href: "mailto:umohaniekanabasi@gmail.com" },
  { label: "X / Twitter", value: "@drsilverstone", href: "https://x.com/drsilverstone" },
  { label: "LinkedIn", value: "aniekanabasi-umoh", href: "https://www.linkedin.com/in/aniekanabasi-umoh-/" },
  { label: "Facebook", value: "Umoh.Aniekanabasi", href: "https://web.facebook.com/Umoh.Aniekanabasi" },
];

export default function CreatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hand text-4xl text-ink">
        About the <HighlightText>Creator</HighlightText>
      </h1>

      {/* Intro: portrait + bio */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[200px_1fr]">
        <PaperCard tone="torn" rotate={-2} tape className="h-fit p-3">
          <div className="flex aspect-square items-center justify-center bg-paper-card">
            <HandIcon name="clinician" size={56} className="text-muted-ink" />
          </div>
          <p className="mt-2 text-center font-hand text-sm text-muted-ink">
            Dr. Aniekanabasi Umoh
          </p>
        </PaperCard>

        <div>
          <h2 className="font-hand text-2xl text-ink">
            A medical doctor learning to build.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            I am <strong>Dr. Aniekanabasi Umoh</strong>, a medical doctor
            (MBBS, University of Calabar, 2023) transitioning into machine
            learning, with a focus on healthcare applications in low-resource
            African settings.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-ink">
            CXR Triage grew out of a simple clinical reality: in a busy
            emergency department, the limiting factor is rarely knowledge — it is
            time and attention. I wanted to understand, hands-on, what modern AI
            can and cannot do for triage in places where radiologists are scarce,
            and to build it the honest way: real models, real deployment, clear
            limitations.
          </p>
        </div>
      </div>

      {/* Journey */}
      <section className="mt-10 space-y-4">
        <h2 className="font-hand text-2xl text-ink">The journey</h2>
        <PaperCard className="p-5">
          <h3 className="font-hand text-lg text-ink">From medicine to machine learning</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">
            Clinical training teaches structured reasoning under uncertainty —
            the same discipline good ML demands. I have been learning the
            engineering side deliberately: from understanding data, to building
            models from scratch, to transfer learning, to modern
            foundation-model workflows, and finally to deployment.
          </p>
        </PaperCard>
        <PaperCard className="p-5">
          <h3 className="font-hand text-lg text-ink">Why low-resource healthcare</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">
            Tools designed for well-resourced hospitals rarely fit the realities
            of African clinics. My interest is in AI that assists clinicians
            where support is thinnest — keeping human judgment central, not
            replacing it.
          </p>
        </PaperCard>
        <PaperCard className="p-5">
          <h3 className="font-hand text-lg text-ink">What comes next</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-ink">
            CXR Triage is the first in an ongoing portfolio of healthcare ML
            projects. The pneumonia triage model is a starting point; the
            framework is meant to extend to other conditions and richer
            clinical context over time.
          </p>
        </PaperCard>
      </section>

      {/* Background highlights */}
      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Background</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "MBBS — University of Calabar (2023)",
            "Leadership: Director of Welfare, Akwa Ibom State Medical Students (Unical Chapter)",
            "Representative — Nigerian Medical Students Association, Committee on Medical Education",
            "Award-winning writer & team lead; built professional websites and brand media",
          ].map((item) => (
            <PaperCard key={item} className="p-4">
              <p className="text-sm text-ink">{item}</p>
            </PaperCard>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Get in touch</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-between rounded-card border border-line bg-paper-light px-4 py-3 transition-colors hover:bg-paper-card"
            >
              <span className="text-sm font-medium text-ink">{s.label}</span>
              <span className="truncate pl-3 text-sm text-clinical-green">
                {s.value}
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
