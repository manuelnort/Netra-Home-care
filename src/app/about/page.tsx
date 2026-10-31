import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Netra Home Care is a domestic staffing service in Accra that connects households with screened, approved house helps through a managed, human-reviewed process.",
  alternates: { canonical: "/about/" },
};

const standards = [
  "Recruitment is managed. House helps aren't listed publicly for anyone to contact.",
  "Requests are short, guided and only ask for what's needed to find a good match.",
  "The system helps sort candidates, and a person reviews every match.",
  "Personal information is protected from the start, not as an afterthought.",
  "Employment and payment arrangements are written down and easy to understand.",
  "Households and house helps both have a safe way to report problems.",
  "New areas and services are added only when there's capacity to screen properly for them.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/about/", label: "About us" }]}
        eyebrow="About Netra Home Care"
        title="A more careful way to find help at home"
        photo="page-about"
        lead="Netra Home Care connects households with domestic workers who have been screened and approved. Customers tell us what they need, staff review the requirements and match suitable workers, and the support continues after the placement starts."
      />

      <section className="section">
        <div className="container grid grid--2">
          <div className="card">
            <p className="eyebrow">Mission</p>
            <h2 className="h-sub">Make finding domestic help simpler</h2>
            <p>
              Through structured recruitment, identity verification, professional screening,
              careful matching and ongoing support.
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Vision</p>
            <h2 className="h-sub">A staffing service households can trust</h2>
            <p>
              Connecting households with qualified, verified domestic workers through a platform
              that is secure, convenient and open about how it works.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="standards-title">
        <div className="container split">
          <div>
            <h2 id="standards-title">How we work</h2>
            <p className="lead">
              These are the standards behind every request and every placement.
            </p>
          </div>
          <ul className="checklist card">
            {standards.map((s) => (
              <li key={s}>
                <Check size={20} aria-hidden />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="where-title">
        <div className="container narrow">
          <h2 id="where-title">Starting in {site.serviceArea}</h2>
          <p className="lead">
            Netra Home Care is launching with a pilot in {site.serviceArea}: a limited number of
            requests, an initial group of fully screened house helps, and close attention to how
            each placement goes.
          </p>
          <p>
            More service areas in Ghana, and more types of help, will follow as recruitment and
            verification grow. Expanding only when there are enough properly screened people to
            serve a new area keeps standards where they should be.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
