"use client";

import { useRef, useState, type DragEvent } from "react";
import { HandIcon } from "@/components/ui/HandIcon";
import { BrushButton } from "@/components/ui/BrushButton";
import { validateFile, PredictError } from "@/lib/api";
import { ACCEPT_ATTR, MAX_MB_LABEL } from "@/lib/constants";

interface UploadDropzoneProps {
  onFileAccepted: (file: File) => void;
  onReject: (error: PredictError) => void;
  disabled?: boolean;
}

export function UploadDropzone({
  onFileAccepted,
  onReject,
  disabled = false,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    const err = validateFile(file);
    if (err) {
      onReject(err);
      return;
    }
    onFileAccepted(file);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  }

  return (
    <div
      className={`dashed-dropzone flex flex-col items-center gap-3 px-6 py-10 text-center transition-colors ${
        dragOver ? "border-clinical-green bg-clinical-green-soft/40" : ""
      } ${disabled ? "opacity-60" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      aria-label="Upload a chest X-ray image"
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
    >
      <HandIcon name="upload" size={40} className="text-clinical-green" />
      <p className="font-hand text-lg text-ink">
        Drag and drop your chest X-ray here
      </p>
      <p className="text-sm text-muted-ink">or</p>

      <BrushButton
        variant="ghost"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        Choose File
      </BrushButton>

      <p className="mt-1 text-xs text-muted-ink">
        Supports JPG, PNG &bull; Max size {MAX_MB_LABEL}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="sr-only"
        disabled={disabled}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
