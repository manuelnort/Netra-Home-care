import type { Metadata } from "next";
import { Info } from "lucide-react";
import { services } from "@/lib/services";
import { PageHeader } from "@/components/PageHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "House help services in Accra",
  description:
    "General, live-in and live-out house helps, nannies, cooks, elderly care assistants, cleaners and temporary help in Accra. Every worker is screened and approved first.",
  alternates: { canonical: "/services/" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/services/", label: "Services" }]}
        eyebrow="Our services"
        title="Help for the way your home runs"
        photo="page-services"
        lead="Pick the kind of help you need and the arrangement that suits you. Every house help put forward has been screened and approved for that service."
      />
      <section className="section section--band">
        <div className="container">
          <div className="grid grid--4">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} headingLevel={2} />
            ))}
          </div>
          <div className="callout" style={{ marginTop: "2.5rem", maxWidth: "48rem" }}>
            <Info size={20} aria-hidden />
            <div>
              <p>
                <strong>Childcare and elderly care need extra checks</strong>
                Nannies and elderly care assistants complete additional competency checks before
                they&apos;re approved for those roles. Netra Home Care doesn&apos;t offer medical or
                nursing services.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CtaBand
        title="Not sure which service fits?"
        text="Describe what you need in the request form, or get in touch. A staff member will help you work it out."
        secondary={{ href: "/contact/", label: "Contact us" }}
      />
    </>
  );
}
