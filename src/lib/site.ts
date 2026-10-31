/**
 * Company details shown across the site.
 *
 * Anything left as `null` has not been confirmed by Netra Home Care yet.
 * Components hide or soften those lines instead of showing made-up details,
 * so fill these in before launch (see README, "Before launch").
 */
export const site = {
  name: "Netra Home Care",
  tagline: "Reliable house helps. Greater peace of mind.",
  description:
    "Netra Home Care matches households in Accra with screened, approved house helps, nannies, cooks, cleaners and elderly care assistants, with human review at every step.",
  // Set NEXT_PUBLIC_SITE_URL to the real domain before building for production.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  serviceArea: "Accra",
  contact: {
    phone: null as string | null, // e.g. "+233 30 000 0000" once confirmed
    whatsapp: null as string | null, // international format without "+", e.g. "233200000000"
    email: null as string | null,
    office: null as string | null, // general office address, one line
    hours: null as string | null, // e.g. "Monday to Friday, 8am to 5pm"
  },
  // Show a "draft" note on the privacy policy and terms until a Ghanaian
  // lawyer has reviewed them (the project spec requires this before launch).
  legalDraft: true,
  legalUpdated: "30 October 2026",
  // Real, consented customer testimonials only. Leave empty until there are some.
  testimonials: [] as { quote: string; name: string; context: string }[],
} as const;

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
