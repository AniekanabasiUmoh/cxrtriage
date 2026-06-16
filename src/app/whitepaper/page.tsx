import type { Metadata } from "next";
import { DisclaimerStrip } from "@/components/layout/DisclaimerStrip";
import { HighlightText } from "@/components/ui/HighlightText";
import { PaperCard } from "@/components/ui/PaperCard";

export const metadata: Metadata = {
  title: "Whitepaper - CXR Triage",
  description:
    "Technical writeup: dataset, model journey from CNN to MedSigLIP, results, deployment, and limitations.",
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const MODELS = [
  {
    name: "Baseline CNN",
    sub: "trained from scratch",
    accuracy: 62.66,
    fp: 228,
    fn: 5,
    confusion: [
      [6, 228],
      [5, 385],
    ],
    note: "Catches pneumonia, but badly overcalls normal scans.",
  },
  {
    name: "MobileNetV2",
    sub: "transfer learning",
    accuracy: 76.12,
    fp: 148,
    fn: 1,
    confusion: [
      [86, 148],
      [1, 389],
    ],
    note: "A clear jump from pretrained features, still noisy on normal scans.",
  },
  {
    name: "MedSigLIP + LogReg",
    sub: "foundation-model embeddings",
    accuracy: 91.03,
    fp: 54,
    fn: 2,
    confusion: [
      [180, 54],
      [2, 388],
    ],
    note: "Best balance of sensitivity, specificity, and deployment simplicity.",
  },
];

const CONTENTS = [
  ["abstract", "Abstract"],
  ["problem", "Problem & framing"],
  ["data", "Data"],
  ["methodology", "Methodology"],
  ["results", "Results"],
  ["deployment", "Deployment"],
  ["limitations", "Limitations & future work"],
] as const;

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-hand text-2xl text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-ink">
        {children}
      </div>
    </section>
  );
}

function AccuracyBars() {
  return (
    <PaperCard className="p-5">
      <h3 className="font-hand text-lg text-ink">Test accuracy</h3>
      <div className="mt-4 space-y-3">
        {MODELS.map((m) => (
          <div key={m.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-ink">{m.name}</span>
              <span className="text-muted-ink">{m.accuracy.toFixed(1)}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-paper-card">
              <div
                className="h-full rounded-full bg-clinical-green"
                style={{ width: `${m.accuracy}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </PaperCard>
  );
}

function ConfusionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {MODELS.map((m) => (
        <PaperCard key={m.name} className="p-4">
          <h3 className="font-hand text-base text-ink">{m.name}</h3>
          <p className="text-xs text-muted-ink">{m.sub}</p>
          <div className="mt-3 grid grid-cols-2 gap-1.5 text-center text-sm">
            {m.confusion.flat().map((v, i) => (
              <div
                key={`${m.name}-${i}`}
                className={`rounded border border-line px-2 py-3 ${
                  i === 0 || i === 3
                    ? "bg-clinical-green-soft text-ink"
                    : "bg-paper-card text-muted-ink"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
          <p className="mt-1 text-[10px] text-muted-ink">
            rows: true N / P &bull; green = correct
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-ink">{m.note}</p>
        </PaperCard>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function WhitepaperPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {/* Header */}
      <p className="font-hand text-sm text-muted-ink">Technical writeup</p>
      <h1 className="mt-1 font-hand text-4xl text-ink">
        CXR Triage <HighlightText>Whitepaper</HighlightText>
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-ink">
        Predicting pneumonia-like patterns in chest X-rays for low-resource
        triage — a progression from a baseline CNN to transfer learning to
        medical foundation-model embeddings, ending in a deployed public
        inference API.
      </p>

      {/* Headline result band */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {MODELS.map((m) => (
          <PaperCard key={m.name} className="p-4 text-center">
            <p className="font-hand text-3xl text-ink">{m.accuracy.toFixed(0)}%</p>
            <p className="mt-1 text-xs text-muted-ink">{m.name}</p>
          </PaperCard>
        ))}
      </div>

      {/* Contents */}
      <PaperCard tone="card" className="mt-8 p-5">
        <h2 className="font-hand text-lg text-ink">Contents</h2>
        <ol className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-muted-ink sm:grid-cols-2">
          {CONTENTS.map(([id, title], i) => (
            <li key={id}>
              <a href={`#${id}`} className="hover:text-ink hover:underline">
                {i + 1}. {title}
              </a>
            </li>
          ))}
        </ol>
      </PaperCard>

      {/* Body */}
      <div className="mt-12 space-y-12">
        <Section id="abstract" title="Abstract">
          <p>
            CXR Triage is an educational healthcare-AI project for binary chest
            X-ray triage: NORMAL versus PNEUMONIA. It began as a learning
            exercise after an introductory deep-learning course, but was
            deliberately pushed beyond notebooks into a full product and
            deployment workflow.
          </p>
          <p>
            Three model families were built and compared — a baseline CNN, a
            MobileNetV2 transfer-learning model, and a MedSigLIP
            embeddings + logistic-regression pipeline. The foundation-model
            approach gave the strongest balance of accuracy, error profile, and
            deployment simplicity, and now powers the live demo.
          </p>
        </Section>

        <Section id="problem" title="Problem & framing">
          <p>
            The question is narrow and practical: can a chest X-ray be flagged as
            more consistent with a normal or a pneumonia-like pattern, in a way
            that supports triage-oriented review? The goal is prioritization
            support, not diagnosis.
          </p>
          <p>
            That framing is itself an engineering decision. Good healthcare ML
            includes deciding what <em>not</em> to claim. CXR Triage is presented
            as an AI-assisted educational prototype — not a radiologist
            replacement or a clinically validated device.
          </p>
        </Section>

        <Section id="data" title="Data">
          <p>
            The project uses the public Kaggle chest X-ray pneumonia dataset
            (labels: NORMAL, PNEUMONIA), with 5,216 training, 16 validation, and
            624 test images.
          </p>
          <p>
            Three data realities shaped everything downstream: the set is
            imbalanced toward pneumonia, the provided validation split is tiny
            (16 images), and the population does not represent a real African
            hospital deployment. These limits are part of the project&rsquo;s
            value as an honest case study.
          </p>
        </Section>

        <Section id="methodology" title="Methodology">
          <p>
            Rather than jumping straight to the strongest approach, three model
            families were compared in sequence — so the performance gains from
            each step stay visible instead of hidden behind one final number.
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Baseline CNN from scratch — a transparent starting point.</li>
            <li>MobileNetV2 transfer learning — pretrained visual features.</li>
            <li>
              MedSigLIP embeddings + logistic regression — a medical
              foundation-model workflow (image → 1152-d embedding → lightweight
              classifier).
            </li>
          </ul>
        </Section>

        <Section id="results" title="Results">
          <p>
            Accuracy rose at every stage, but the more important story is the{" "}
            <HighlightText>error profile</HighlightText>: the foundation-model
            pipeline kept false negatives low while sharply cutting false
            positives (228 → 148 → 54).
          </p>
          <div className="not-prose">
            <AccuracyBars />
          </div>
          <p className="pt-2">
            Confusion matrices keep the comparison clinically honest — the goal
            is low false negatives <em>and</em> fewer unnecessary escalations of
            normal scans:
          </p>
          <div className="not-prose">
            <ConfusionCards />
          </div>
        </Section>

        <Section id="deployment" title="Deployment">
          <p>
            The work was not left in notebooks. A FastAPI backend wraps the
            MedSigLIP inference path and the logistic-regression artifact,
            deployed publicly on a Hugging Face Space. The classifier was
            verified to reproduce its saved prediction probabilities exactly
            before going live.
          </p>
          <p>
            This frontend calls that live API directly — upload an X-ray, get a
            real prediction, confidence score, and a clinically careful triage
            interpretation.
          </p>
        </Section>

        <Section id="limitations" title="Limitations & future work">
          <p>
            This uses a public benchmark with a tiny validation split, possible
            label noise, and no external validation. It is not a clinically
            approved workflow and does not justify diagnostic claims — those
            boundaries are the point, not a footnote.
          </p>
          <p>
            Next steps: stronger external evaluation, threshold calibration,
            richer error slicing, optional research-only explainability views,
            and validation on data closer to the intended deployment setting.
          </p>
        </Section>
      </div>

      <div className="mt-12">
        <DisclaimerStrip />
      </div>
    </div>
  );
}
