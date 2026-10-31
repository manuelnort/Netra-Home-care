import type { Metadata } from "next";
import Link from "next/link";
import { Check, EyeOff, Phone, ShieldCheck, TriangleAlert, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { VerificationLabels } from "@/components/VerificationLabels";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Safety and verification",
  description:
    "How Netra Home Care screens house helps before they can be matched: identity verification, references, background checks, interviews and approval, plus how to report a concern.",
  alternates: { canonical: "/safety-and-verification/" },
};

const stages = [
  ["Account and contact check", "The applicant creates an account and confirms their phone number."],
  ["Work profile", "Services, experience, skills, languages, area, salary expectations, availability, references and any training."],
  ["Secure documents", "An acceptable identity document and any documents the role needs, uploaded securely through their account."],
  ["Identity verification", "Carried out by an authorised Netra Home Care officer or a suitable verification provider."],
  ["References and background checks", "Lawful, proportionate checks, with the applicant's consent where it's required."],
  ["Interview and skills assessment", "Including service-specific competency checks for childcare and elderly care."],
  ["Orientation", "Professional conduct, confidentiality, safety, workplace boundaries, agreed duties and how to report concerns."],
  ["Final approval", "Reviewed and approved by authorised staff. The approval is logged."],
  ["Profile goes live for matching", "Only now can the house help appear in a shortlist, with a limited professional profile."],
];

const shown = [
  "Approved display name",
  "Skills and experience",
  "Availability and general work area",
  "Verification labels for completed checks",
  "A professional photo, only with their consent",
];

const restricted = [
  "Legal name and ID numbers",
  "ID card images",
  "Home address",
  "Internal screening notes",
];

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/safety-and-verification/", label: "Safety and verification" }]}
        eyebrow="Safety and verification"
        title="How house helps are screened"
        photo="page-safety"
        lead="Nobody becomes eligible for placement until they've completed every screening stage their role requires and been approved by authorised staff. There are no shortcuts around this."
      />

      <section className="section" aria-labelledby="stages-title">
        <div className="container split">
          <div className="sticky">
            <h2 id="stages-title">The screening stages</h2>
            <p className="lead">
              Applicants work through these stages in order. Their status is tracked at each one,
              and some roles have extra steps.
            </p>
            <div className="callout">
              <ShieldCheck size={20} aria-hidden />
              <p>
                An applicant who hasn&apos;t passed the required checks never appears in the pool
                used for matching.
              </p>
            </div>
          </div>
          <ol className="numbered">
            {stages.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="labels-title">
        <div className="container">
          <div className="section-head">
            <h2 id="labels-title">What the verification labels mean</h2>
            <p>
              Profiles show precise labels for the checks that were actually completed. If a label
              isn&apos;t there, that check hasn&apos;t been done.
            </p>
          </div>
          <VerificationLabels />
          <div className="callout callout--gold" style={{ marginTop: "1.5rem" }}>
            <TriangleAlert size={20} aria-hidden />
            <p>
              Uploading an identity document isn&apos;t proof of identity on its own. Netra Home Care
              also won&apos;t say that someone has a clean criminal record unless an appropriate
              check was completed and supports it.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="privacy-title">
        <div className="container">
          <div className="section-head">
            <h2 id="privacy-title">What households see, and what stays private</h2>
            <p>
              House helps share personal documents to be verified. Those documents are protected
              just as carefully as your own details.
            </p>
          </div>
          <div className="grid grid--2">
            <div className="card">
              <h3>Shown on your shortlist</h3>
              <ul className="checklist" style={{ marginTop: "1rem" }}>
                {shown.map((s) => (
                  <li key={s}>
                    <Check size={20} aria-hidden />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="small" style={{ marginTop: "1rem" }}>
                References are shared through a controlled process, with consent.
              </p>
            </div>
            <div className="card">
              <h3>Restricted, never shown publicly</h3>
              <ul className="checklist checklist--cross" style={{ marginTop: "1rem" }}>
                {restricted.map((s) => (
                  <li key={s}>
                    <X size={20} aria-hidden />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="small" style={{ marginTop: "1rem" }}>
                Identity documents are kept in private, encrypted storage. Only staff whose role
                needs them can open them, and every access is logged.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="recheck-title">
        <div className="container split split--even">
          <div>
            <h2 id="recheck-title">Checks don&apos;t stop at approval</h2>
            <p className="lead">
              Approval isn&apos;t permanent. Profiles are reviewed over time, and a serious concern
              leads to a review straight away.
            </p>
          </div>
          <ul className="checklist card">
            <li><Check size={20} aria-hidden /><span>Documents with expiry dates are tracked and renewed.</span></li>
            <li><Check size={20} aria-hidden /><span>Profiles are reviewed periodically.</span></li>
            <li><Check size={20} aria-hidden /><span>Important changes in someone&apos;s details mean they&apos;re verified again.</span></li>
            <li><Check size={20} aria-hidden /><span>A complaint can trigger a review, and a temporary suspension where it&apos;s justified.</span></li>
            <li><Check size={20} aria-hidden /><span>A suspended house help has to be approved again before returning to placements.</span></li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="report-title">
        <div className="container">
          <div className="section-head">
            <h2 id="report-title">Reporting a concern</h2>
            <p>
              Households and house helps can both raise a concern at any time. Each report gets a
              reference number, goes to a named staff member and is followed through to a recorded
              outcome. Sensitive details are only seen by authorised staff.
            </p>
          </div>
          <div className="grid grid--3">
            <div className="card">
              <div className="icon-tile"><Phone size={22} strokeWidth={1.75} aria-hidden /></div>
              <h3>In an emergency</h3>
              <p>If someone is in immediate danger, call 112 first, then let Netra Home Care know.</p>
            </div>
            <div className="card">
              <div className="icon-tile"><ShieldCheck size={22} strokeWidth={1.75} aria-hidden /></div>
              <h3>Households</h3>
              <p>
                Report a problem with a placement or a safety worry through the{" "}
                <Link href="/contact/?topic=safety">contact form</Link>, or from your account.
              </p>
            </div>
            <div className="card">
              <div className="icon-tile"><EyeOff size={22} strokeWidth={1.75} aria-hidden /></div>
              <h3>House helps</h3>
              <p>
                Report unsafe conditions, mistreatment or a breach of your agreed terms. Your report
                is handled fairly and kept confidential.{" "}
                <Link href="/contact/?topic=safety">Report a concern</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
