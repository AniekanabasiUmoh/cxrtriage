"use client";

import { useEffect, useState } from "react";
import { HandIcon } from "@/components/ui/HandIcon";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Polaroid-style preview of the selected X-ray. */
export function XrayPreviewCard({
  file,
  onChange,
}: {
  file: File;
  onChange: () => void;
}) {
  // Read the file into a data URL. Unlike createObjectURL there is nothing to
  // revoke, so it is immune to the React Strict Mode mount -> cleanup -> mount
  // cycle that was revoking the URL before the <img> could load (the black-box
  // bug). The `cancelled` guard prevents setting state after unmount.
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const reader = new FileReader();
    reader.onload = () => {
      if (!cancelled && typeof reader.result === "string") {
        setUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
    return () => {
      cancelled = true;
      reader.abort();
    };
  }, [file]);

  return (
    <div className="torn-card -rotate-1 p-3">
      {/* polaroid frame */}
      <div className="bg-white p-2 pb-8 shadow-inner">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt="Selected chest X-ray preview"
            className="aspect-square w-full bg-paper-card object-contain"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-paper-card text-sm text-muted-ink">
            Loading preview…
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 px-1">
        <div className="flex min-w-0 items-center gap-2">
          <HandIcon name="check" size={18} className="shrink-0 text-clinical-green" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{file.name}</p>
            <p className="text-xs text-muted-ink">
              {file.type.replace("image/", "").toUpperCase()} &bull;{" "}
              {formatSize(file.size)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onChange}
          className="flex shrink-0 items-center gap-1 text-xs text-muted-ink hover:text-result-red"
        >
          <HandIcon name="trash" size={16} />
          Change
        </button>
      </div>
    </div>
  );
}
