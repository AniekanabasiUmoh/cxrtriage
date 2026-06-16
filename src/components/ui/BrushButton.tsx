import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "brush" | "green" | "highlight" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  brush:
    "bg-black-brush text-white-chalk rounded-[4px] px-5 py-3 -rotate-1 hover:rotate-0 hover:scale-[1.02]",
  green:
    "bg-clinical-green text-white rounded-lg px-5 py-3 font-bold hover:brightness-110",
  highlight:
    "bg-highlight text-ink rounded-lg px-5 py-3 font-bold hover:brightness-105",
  ghost:
    "bg-transparent text-ink rounded-lg px-5 py-3 border border-line hover:bg-paper-card",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & {
  as?: "button";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type LinkProps = CommonProps & {
  as: "link";
  href: string;
};

export function BrushButton(props: ButtonProps | LinkProps) {
  const { variant = "brush", className = "", children } = props;
  const cls = `${base} ${variants[variant]} ${className}`;

  if (props.as === "link") {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={cls}
    >
      {children}
    </button>
  );
}
