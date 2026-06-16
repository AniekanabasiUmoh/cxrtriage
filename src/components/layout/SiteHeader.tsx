"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrushButton } from "@/components/ui/BrushButton";
import { HandIcon } from "@/components/ui/HandIcon";
import { NAV_LINKS, CORE_LINE } from "@/lib/constants";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line/60 bg-paper-light/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo + tagline */}
        <Link href="/" className="flex items-center gap-2">
          <HandIcon name="lungs" size={28} className="text-clinical-green" />
          <span className="flex flex-col leading-tight">
            <span className="font-hand text-xl text-ink">
              AfriCXR Triage
              <span className="ml-2 rounded bg-highlight-soft px-1.5 py-0.5 align-middle font-ui text-[10px] font-semibold uppercase tracking-wide text-ink">
                Beta
              </span>
            </span>
            <span className="hidden text-xs text-muted-ink sm:block">
              {CORE_LINE}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium text-ink transition-colors hover:text-clinical-green ${
                  active ? "highlight-underline" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <BrushButton as="link" href="/upload" variant="brush" className="text-sm">
            Try the Demo
          </BrushButton>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-line/60 px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`text-base font-medium text-ink ${
                      active ? "highlight-underline" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-1">
              <BrushButton
                as="link"
                href="/upload"
                variant="brush"
                className="w-full"
              >
                Try the Demo
              </BrushButton>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
