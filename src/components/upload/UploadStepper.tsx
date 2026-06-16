import { HandIcon } from "@/components/ui/HandIcon";

type Step = 1 | 2 | 3;

const STEPS: { n: Step; label: string }[] = [
  { n: 1, label: "Upload" },
  { n: 2, label: "Analyze" },
  { n: 3, label: "Review" },
];

/** Compact 3-step progress indicator for the upload flow. */
export function UploadStepper({ current }: { current: Step }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Progress">
      {STEPS.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <li key={s.n} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                active
                  ? "border-clinical-green bg-clinical-green text-white"
                  : done
                    ? "border-clinical-green bg-clinical-green-soft text-clinical-green"
                    : "border-line bg-paper-light text-muted-ink"
              }`}
              aria-current={active ? "step" : undefined}
            >
              {done ? <HandIcon name="check" size={14} /> : s.n}
            </span>
            <span
              className={`${active ? "text-ink" : "text-muted-ink"} ${
                active ? "font-medium" : ""
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <span className="mx-1 h-px w-5 bg-line sm:w-8" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
