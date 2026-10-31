import type { Metadata } from "next";
import { faqGroups } from "@/lib/faqs";
import { PageHeader } from "@/components/PageHeader";
import { FaqList } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers about Netra Home Care fees, how house helps are verified, bookings, cancellations, refunds, replacements and applying to work.",
  alternates: { canonical: "/faqs/" },
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/faqs/", label: "FAQs" }]}
        eyebrow="FAQs"
        title="Questions and answers"
        photo="page-faqs"
        lead="Fees, checks, bookings, and what happens if your plans change. If your question isn't here, get in touch."
      />
      <section className="section section--band">
        <div className="container narrow">
          <nav className="faq-nav" aria-label="FAQ topics">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.title}
              </a>
            ))}
          </nav>
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} className="faq-group" aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`}>{g.title}</h2>
              <FaqList items={g.items} />
            </section>
          ))}
        </div>
      </section>
      <CtaBand
        title="Still have a question?"
        text="Send a message and a member of the team will get back to you."
        primary={{ href: "/contact/", label: "Contact us" }}
        secondary={{ href: "/request/", label: "Request a house help" }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqGroups.flatMap((g) =>
            g.items.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          ),
        }}
      />
    </>
  );
}
