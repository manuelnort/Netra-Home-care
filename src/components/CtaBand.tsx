import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export function CtaBand({
  title = "Tell us what your household needs.",
  text = "Sending a request is free and takes about five minutes. A staff member reviews it and gets back to you, usually within one business day.",
  primary = { href: "/request/", label: "Request a house help" },
  secondary = { href: "/become-a-house-help/", label: "Become a house help" },
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
}) {
  return (
    <section className="section section--tight" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2 id="cta-title">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row">
            <Link href={primary.href} className="btn btn--primary">
              {primary.label}
              <span className="btn-icon">
                <Plus size={18} aria-hidden />
              </span>
            </Link>
            {secondary && (
              <Link href={secondary.href} className="btn btn--secondary">
                {secondary.label}
                <span className="btn-icon">
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            )}
          </div>
          <svg className="cta-arch" viewBox="0 0 256 256" aria-hidden>
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M52 212V124A76 76 0 0 1 204 124V212ZM94 212V124A34 37 0 0 1 162 124V212Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
