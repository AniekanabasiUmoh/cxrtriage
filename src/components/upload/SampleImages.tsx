"use client";

import { useState } from "react";

interface Sample {
  src: string;
  filename: string;
  label: string;
}

const SAMPLES: Sample[] = [
  { src: "/samples/normal-1.jpg", filename: "sample-normal-1.jpg", label: "Normal A" },
  { src: "/samples/normal-2.jpg", filename: "sample-normal-2.jpg", label: "Normal B" },
  { src: "/samples/pneumonia-1.jpg", filename: "sample-pneumonia-1.jpg", label: "Pneumonia A" },
  { src: "/samples/pneumonia-2.jpg", filename: "sample-pneumonia-2.jpg", label: "Pneumonia B" },
];

/**
 * "Try a sample" strip. Clicking a thumbnail fetches the bundled image,
 * turns it into a File, and hands it to the upload flow (one-click trial).
 * Each also has a download link for the full upload experience.
 */
export function SampleImages({
  onPick,
}: {
  onPick: (file: File) => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  async function pick(sample: Sample) {
    try {
      setLoading(sample.filename);
      const res = await fetch(sample.src);
      const blob = await res.blob();
      const file = new File([blob], sample.filename, {
        type: blob.type || "image/jpeg",
      });
      onPick(file);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="rounded-card border border-line bg-paper-light/60 p-4">
      <p className="font-hand text-base text-ink">
        No X-ray handy? Try a sample
      </p>
      <p className="mt-0.5 text-xs text-muted-ink">
        Public teaching-dataset images, for demonstration only — not real
        patients.
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SAMPLES.map((s) => (
          <div key={s.filename} className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => pick(s)}
              disabled={loading !== null}
              className="group relative overflow-hidden rounded border border-line bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60"
              aria-label={`Analyze sample: ${s.label}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={`Sample chest X-ray (${s.label})`}
                className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
              />
              {loading === s.filename && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs text-white">
                  Loading…
                </span>
              )}
            </button>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-ink">{s.label}</span>
              <a
                href={s.src}
                download={s.filename}
                className="text-xs text-clinical-green hover:underline"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
