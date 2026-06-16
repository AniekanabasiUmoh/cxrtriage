import type { Metadata } from "next";
import Image from "next/image";
import { PaperCard } from "@/components/ui/PaperCard";
import { HighlightText } from "@/components/ui/HighlightText";

export const metadata: Metadata = {
  title: "About the Creator - CXR Triage",
  description:
    "Dr. Aniekanabasi Umoh — Machine Learning Engineer, Medical Doctor, and Technical Founder.",
};

const SOCIALS = [
  { label: "Email", value: "umohaniekanabasi@gmail.com", href: "mailto:umohaniekanabasi@gmail.com" },
  { label: "X / Twitter", value: "@drsilverstone", href: "https://x.com/drsilverstone" },
  { label: "LinkedIn", value: "aniekanabasi-umoh", href: "https://www.linkedin.com/in/aniekanabasi-umoh-/" },
  { label: "Facebook", value: "Umoh.Aniekanabasi", href: "https://web.facebook.com/Umoh.Aniekanabasi" },
];

const EXPERIENCE = [
  {
    role: "Founder — Illusion Services",
    when: "2021 – Present",
    detail:
      "Full-stack and Web3 deliverables for 50+ organizations; clinical RAG pipelines integrating medical protocols with AI; led teams across DeFi, logistics (Dzpatch), and delivery (FoodHunt) products.",
  },
  {
    role: "House Officer — UCTH",
    when: "Present",
    detail:
      "Clinical rotations in Internal Medicine and postings across multiple departments at the University of Calabar Teaching Hospital.",
  },
  {
    role: "AI Trainer / Evaluator — Outlier",
    when: "2025 – Present",
    detail:
      "High-precision medical data annotation and RLHF to keep clinical accuracy in AI model outputs.",
  },
  {
    role: "Country Lead — XION",
    when: "2024 – 2025",
    detail:
      "Directed ecosystem growth across Nigeria; ran 20 workshops/hackathons in 15 states supporting 50 active dev teams.",
  },
];

export default function CreatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-hand text-4xl text-ink">
        About the <HighlightText>Creator</HighlightText>
      </h1>

      {/* Intro: portrait + bio */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[210px_1fr]">
        <PaperCard tone="torn" rotate={-2} tape className="h-fit p-3">
          <Image
            src="/assets/creator.webp"
            alt="Dr. Aniekanabasi Umoh"
            width={600}
            height={600}
            className="aspect-square w-full rounded object-cover"
          />
          <p className="mt-2 text-center font-hand text-sm text-ink">
            Dr. Aniekanabasi Umoh
          </p>
          <p className="text-center text-xs text-muted-ink">
            ML Engineer &bull; Medical Doctor &bull; Founder
          </p>
        </PaperCard>

        <div>
          <h2 className="font-hand text-2xl text-ink">
            Medicine, machine learning, and building.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink">
            I am <strong>Aniekanabasi Umoh</strong> — a physician (MBBS,
            University of Calabar), machine learning engineer, and technical
            founder based in Calabar, Nigeria. I work at the intersection of
            clinical practice and applied AI, with a focus on systems that hold
            up in the real world.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-ink">
            CXR Triage comes from a simple clinical reality: in a busy
            department, the limiting factor is rarely knowledge — it is time and
            attention. It is part of an ongoing body of healthcare-AI work,
            including a clinical triage classifier on synthetic A&amp;E data and
            clinical RAG pipelines that pair medical protocols with AI.
          </p>
        </div>
      </div>

      {/* What I work on */}
      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">What I work on</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { t: "Healthcare AI", d: "Clinical ML, triage models, RAG pipelines, medical data annotation & RLHF." },
            { t: "Applied ML", d: "Neural networks (Keras, PyTorch), classification, agentic workflows, Monte Carlo." },
            { t: "Systems & Web3", d: "Python, Rust, Solidity; smart contracts across EVM & SVM; DeFi risk infra." },
          ].map((c) => (
            <PaperCard key={c.t} className="p-4">
              <h3 className="font-hand text-lg text-ink">{c.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-ink">{c.d}</p>
            </PaperCard>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Experience</h2>
        <div className="mt-4 space-y-3">
          {EXPERIENCE.map((e) => (
            <PaperCard key={e.role} className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="font-hand text-lg text-ink">{e.role}</h3>
                <span className="text-xs text-muted-ink">{e.when}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-ink">
                {e.detail}
              </p>
            </PaperCard>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-10">
        <h2 className="font-hand text-2xl text-ink">Education</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <PaperCard className="p-4">
            <p className="text-sm font-medium text-ink">
              MBBS — University of Calabar
            </p>
            <p className="text-xs text-muted-ink">Bachelor of Medicine, Bachelor of Surgery</p>
          </PaperCard>
          <PaperCard className="p-4">
            <p className="text-sm font-medium text-ink">
              IBM Machine Learning Professional Certificate
            </p>
            <p className="text-xs text-muted-ink">In progress</p>
          </PaperCard>
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
