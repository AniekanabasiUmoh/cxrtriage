import Link from "next/link";
import { HandIcon } from "@/components/ui/HandIcon";
import { NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line/60 bg-paper-light/60">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <HandIcon name="lungs" size={22} className="text-clinical-green" />
          <span className="font-hand text-lg">AfriCXR Triage</span>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-ink">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="max-w-sm text-xs text-muted-ink">
          Built for communities. Designed with care. An educational healthcare ML
          prototype — not a medical diagnostic device.
        </p>
      </div>
    </footer>
  );
}
