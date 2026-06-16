import { PaperCard } from "@/components/ui/PaperCard";
import { HandIcon } from "@/components/ui/HandIcon";

/**
 * Renders the backend's real triage_note verbatim. We deliberately do NOT
 * add fabricated anatomical detail — the model cannot localize findings.
 */
export function InterpretationCard({ note }: { note: string }) {
  return (
    <PaperCard className="p-5">
      <div className="mb-2 flex items-center gap-2">
        <HandIcon name="lungs" size={20} className="text-clinical-green" />
        <h3 className="font-hand text-lg text-ink">
          AI Interpretation (Triage-oriented)
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-ink">{note}</p>
    </PaperCard>
  );
}
