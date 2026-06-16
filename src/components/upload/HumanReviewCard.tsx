import { PaperCard } from "@/components/ui/PaperCard";
import { HandIcon } from "@/components/ui/HandIcon";
import { HUMAN_REVIEW_COPY } from "@/lib/constants";

/** Human-in-the-loop reminder — kept visually prominent (human decides). */
export function HumanReviewCard() {
  return (
    <PaperCard tone="card" className="border-2 border-clinical-green/30 p-5">
      <div className="mb-2 flex items-center gap-2">
        <HandIcon name="clinician" size={22} className="text-clinical-green" />
        <h3 className="font-hand text-lg text-ink">
          Remember: Human Review Matters
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-ink">{HUMAN_REVIEW_COPY}</p>
    </PaperCard>
  );
}
