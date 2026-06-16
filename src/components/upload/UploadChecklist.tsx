import { PaperCard } from "@/components/ui/PaperCard";
import { HandIcon } from "@/components/ui/HandIcon";

interface UploadChecklistProps {
  /** Whether the analysis has completed (checks the "Analyzed" item). */
  analyzed?: boolean;
}

/** Small "upload complete" checklist shown in selected + complete states. */
export function UploadChecklist({ analyzed = false }: UploadChecklistProps) {
  const items: { label: string; done: boolean }[] = [
    { label: "Image received", done: true },
    { label: "Analyzed", done: analyzed },
    { label: "Secure & private — not stored", done: true },
  ];

  return (
    <PaperCard className="p-4">
      <h3 className="mb-2 font-hand text-base text-ink">
        {analyzed ? "Analysis complete" : "Upload complete"}
      </h3>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li key={it.label} className="flex items-center gap-2 text-sm">
            <HandIcon
              name="check"
              size={16}
              className={it.done ? "text-clinical-green" : "text-line"}
            />
            <span className={it.done ? "text-ink" : "text-muted-ink"}>
              {it.label}
            </span>
          </li>
        ))}
      </ul>
    </PaperCard>
  );
}
