import { HandIcon } from "@/components/ui/HandIcon";

/** Empty-state polaroid frame shown before a file is selected. */
export function XrayPreviewPlaceholder() {
  return (
    <div className="torn-card -rotate-1 p-3">
      <div className="bg-white p-2 pb-8 shadow-inner">
        <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 bg-paper-card text-muted-ink">
          <HandIcon name="document" size={40} />
          <span className="font-hand text-base">X-ray preview</span>
        </div>
      </div>
      <p className="mt-3 px-1 text-center text-xs text-muted-ink">
        Your X-ray will appear here after upload
      </p>
    </div>
  );
}
