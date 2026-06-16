import Image from "next/image";

/**
 * Rural-clinic watercolor illustration (compressed WebP). Decorative only.
 */
export function ClinicFooterIllustration({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`} aria-hidden>
      <Image
        src="/assets/clinic-footer.webp"
        alt=""
        width={720}
        height={225}
        className="h-auto w-full max-w-2xl mix-blend-multiply opacity-90"
      />
    </div>
  );
}
