/** Upload constraints — MUST mirror the backend exactly (JPG/PNG, 10MB). */
export const ACCEPTED_TYPES = ["image/jpeg", "image/png"] as const;
export const ACCEPTED_EXT = [".jpg", ".jpeg", ".png"];
export const ACCEPT_ATTR = ".jpg,.jpeg,.png,image/jpeg,image/png";
export const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const MAX_MB_LABEL = "10MB";

/** Persistent safety copy. */
export const DISCLAIMER_TITLE = "This is not a diagnostic tool.";
export const DISCLAIMER_BODY =
  "AfriCXR Triage is for educational and research purposes only. Final decisions must be made by qualified healthcare professionals.";
export const HUMAN_REVIEW_COPY =
  "AI provides a second opinion, not a diagnosis. Please submit for human review and clinical correlation.";

/** Primary brand lines. */
export const CORE_LINE = "AI that assists. People who decide.";
export const SECONDARY_LINE = "Triage insight, not final diagnosis.";

/** Nav links used by the header. */
export const NAV_LINKS = [
  { href: "/upload", label: "Upload" },
  { href: "/model", label: "Model Journey" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/about", label: "About" },
  { href: "/creator", label: "Creator" },
] as const;
