/**
 * Shared form helpers: validation, reference numbers and submission.
 *
 * The public site is a static export, so it has no server of its own.
 * Set NEXT_PUBLIC_FORMS_ENDPOINT to the staffing application's intake API and
 * every form will POST its data there as JSON. Until then the forms run in
 * preview mode: they validate and show the confirmation screen, but nothing
 * is sent and the confirmation says so.
 */

export type FormKind = "request" | "application" | "contact" | "complaint";

const REFERENCE_PREFIX: Record<FormKind, string> = {
  request: "REQ",
  application: "APP",
  contact: "MSG",
  complaint: "CMP",
};

export const formsEndpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";
export const isPreviewMode = formsEndpoint === "";

/**
 * Builds a reference in the format from the spec, e.g. NHC-REQ-2026-000123.
 * In production the backend issues the sequential number; this local version
 * is only used in preview mode.
 */
export function previewReference(kind: FormKind, now = new Date()) {
  const n = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, "0");
  return `NHC-${REFERENCE_PREFIX[kind]}-${now.getFullYear()}-${n}`;
}

export type SubmitResult =
  | { ok: true; reference: string; preview: boolean }
  | { ok: false; message: string };

export async function submitForm(
  kind: FormKind,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  if (isPreviewMode) {
    return { ok: true, reference: previewReference(kind), preview: true };
  }
  try {
    const res = await fetch(formsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, data }),
    });
    if (!res.ok) throw new Error(String(res.status));
    const body = (await res.json()) as { reference?: string };
    if (!body.reference) throw new Error("No reference returned");
    return { ok: true, reference: body.reference, preview: false };
  } catch {
    return {
      ok: false,
      message:
        "Your details couldn't be sent. Check your connection and try again. Nothing you've entered has been lost.",
    };
  }
}

/** Accepts Ghana numbers like 024 123 4567, 0241234567 or +233 24 123 4567. */
export function isGhanaPhone(value: string) {
  const digits = value.replace(/[\s().-]/g, "");
  return /^(?:\+?233|0)[2-5]\d{8}$/.test(digits);
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

export function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const phoneHint = "10 digits starting with 0, or starting with +233";
export const phoneError =
  "Enter a Ghana phone number with 10 digits starting with 0, or starting with +233.";
