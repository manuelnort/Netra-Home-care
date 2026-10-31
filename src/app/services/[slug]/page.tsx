import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Info } from "lucide-react";
import { getService, services } from "@/lib/services";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ServiceIcon } from "@/components/icons";
import { CtaBand } from "@/components/CtaBand";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/services/", label: "Services" },
          { href: `/services/${service.slug}/`, label: service.name },
        ]}
        title={service.name}
        photo={service.slug}
        lead={service.intro}
      >
        <div className="btn-row">
          <Link href={`/request/?service=${service.slug}`} className="btn btn--primary">
            Request this service
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/how-it-works/" className="btn btn--secondary">
            How it works
          </Link>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container split split--reverse">
          <div className="stack-lg">
            <div>
              <h2 className="h-sub">What they can help with</h2>
              <ul className="checklist two-col">
                {service.duties.map((d) => (
                  <li key={d}>
                    <Check size={20} aria-hidden />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="muted small" style={{ marginTop: "1rem" }}>
                The exact duties are agreed with you and written into the placement agreement.
              </p>
            </div>

            <div>
              <h2 className="h-sub">Arrangement</h2>
              <p>{service.arrangement}</p>
            </div>

            {service.extraChecks && (
              <div className="callout">
                <Info size={20} aria-hidden />
                <p>
                  <strong>Additional checks for this role</strong>
                  {service.extraChecks}
                </p>
              </div>
            )}
          </div>

          <aside className="sticky">
            <div className="aside-card">
              <div className="icon-tile">
                <ServiceIcon name={service.icon} />
              </div>
              <h2>When you request, mention</h2>
              <ul className="checklist small">
                {service.requestTips.map((t) => (
                  <li key={t}>
                    <Check size={18} aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/request/?service=${service.slug}`}
                className="btn btn--primary"
                style={{ marginTop: "1.5rem", width: "100%" }}
              >
                Start a request
              </Link>
            </div>
            <div className="aside-card">
              <h2>Every candidate is approved first</h2>
              <p>
                Identity checks, references, an interview and orientation come before anyone is
                matched with a household.{" "}
                <Link href="/safety-and-verification/">Read about screening</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="other-title">
        <div className="container">
          <h2 id="other-title" className="h-sub" style={{ marginBottom: "1.5rem" }}>
            Other services
          </h2>
          <div className="grid grid--4">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
