import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, telHref } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { FormLoading } from "@/components/forms/FormLoading";
import { PreviewNotice } from "@/components/forms/PreviewNotice";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Contact Netra Home Care with a question, for help with a request or application, or to report a safety concern or complaint.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const { phone, whatsapp, email, office, hours } = site.contact;
  const rows = [
    { icon: Phone, label: "Phone", value: phone, href: phone ? telHref(phone) : undefined },
    { icon: MessageCircle, label: "WhatsApp", value: whatsapp ? `+${whatsapp}` : null, href: whatsapp ? `https://wa.me/${whatsapp}` : undefined },
    { icon: Mail, label: "Email", value: email, href: email ? `mailto:${email}` : undefined },
    { icon: MapPin, label: "Office", value: office },
    { icon: Clock, label: "Opening hours", value: hours },
  ];
  const anyDetails = rows.some((r) => r.value);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/contact/", label: "Contact us" }]}
        eyebrow="Contact us"
        title="Get in touch"
        photo="page-contact"
        lead="Questions about a request, an application, or a placement that's already started. Every message gets a reference number so it can be followed up."
      />
      <section className="section section--tight section--band">
        <div className="container split split--reverse">
          <div>
            <PreviewNotice />
            <Suspense fallback={<FormLoading />}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="sticky">
            <h2 className="h-sub">Other ways to reach us</h2>
            {anyDetails ? (
              <ul className="contact-list">
                {rows
                  .filter((r) => r.value)
                  .map(({ icon: Icon, label, value, href }) => (
                    <li key={label}>
                      <span className="icon-tile">
                        <Icon size={20} strokeWidth={1.75} aria-hidden />
                      </span>
                      <div>
                        <p className="label">{label}</p>
                        <p className="value">{href ? <a href={href}>{value}</a> : value}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="muted">
                Phone, WhatsApp, email and office details will be published here before launch. For
                now, please use the form.
              </p>
            )}
            <div className="callout callout--danger" style={{ marginTop: "1.5rem" }}>
              <Phone size={20} aria-hidden />
              <p>
                <strong>Emergencies</strong>
                If someone is in immediate danger, call 112 before contacting Netra Home Care.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
