import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { LoginForm } from "./forms/LoginForm";
import { photos } from "@/lib/photos";

export function AccountPage({
  audience,
  title,
  lead,
  features,
  switchText,
  switchHref,
  switchLabel,
  noAccountText,
  noAccountHref,
  noAccountLabel,
}: {
  audience: "customer" | "house-help";
  title: string;
  lead: string;
  features: string[];
  switchText: string;
  switchHref: string;
  switchLabel: string;
  noAccountText: string;
  noAccountHref: string;
  noAccountLabel: string;
}) {
  return (
    <>
      <PageHeader title={title} lead={lead} />
      <section className="section section--tight section--band">
        <div className="container split split--even">
          <div>
            <LoginForm audience={audience} />
            <p className="small" style={{ marginTop: "1.25rem" }}>
              {switchText} <Link href={switchHref}>{switchLabel}</Link>
            </p>
          </div>
          <aside>
            <figure className="service-photo">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
              <img src={photos["page-login"].src} alt={photos["page-login"].alt} loading="lazy" />
            </figure>
            <div className="aside-card">
              <h2>In your account</h2>
              <ul className="checklist small">
                {features.map((f) => (
                  <li key={f}>
                    <Check size={18} aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aside-card">
              <h2>No account yet?</h2>
              <p>{noAccountText}</p>
              <Link href={noAccountHref} className="btn btn--secondary btn--sm" style={{ marginTop: "0.5rem" }}>
                {noAccountLabel}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
