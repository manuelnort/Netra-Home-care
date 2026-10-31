import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Info, Wallet } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Netra Home Care goes from your house help request to a confirmed placement: review, matching by staff, your shortlist, agreed terms and follow-up.",
  alternates: { canonical: "/how-it-works/" },
};

const journey = [
  {
    title: "You send a request",
    text: "Choose the service and arrangement, then describe the duties, schedule and general area. It's free, and you'll get a reference number straight away.",
  },
  {
    title: "A placement officer reviews it",
    text: "They read through your request and contact you if anything needs clarifying. Your phone number is confirmed at this stage.",
  },
  {
    title: "Staff look for matches",
    text: "The system narrows down approved house helps by service, area, availability and arrangement. A placement officer then reviews each possible match by hand.",
  },
  {
    title: "You get a shortlist",
    text: "You see each candidate's approved display name, skills, experience, availability and general work area, along with the checks they've completed. You pick the one you'd like.",
  },
  {
    title: "You talk before anything is final",
    text: "Netra Home Care confirms the candidate is still available and sets up a conversation by phone, video or in person.",
  },
  {
    title: "Terms are written down",
    text: "Duties, salary, schedule and the other terms are agreed and recorded in a written agreement.",
  },
  {
    title: "You pay the placement fee and the booking is confirmed",
    text: "You see a placement summary with the fee before paying. Once payment is recorded, everyone gets a booking confirmation.",
  },
  {
    title: "Your house help starts",
    text: "They begin on the agreed date, doing the agreed work.",
  },
  {
    title: "Follow-up and support",
    text: "Netra Home Care checks in after the start, helps with any concerns, and applies the replacement or termination terms in your agreement if they're needed.",
  },
];

const agreed = [
  "Duties",
  "Salary and how it's paid",
  "Working days and hours",
  "Rest periods and days off",
  "Accommodation, for live-in roles",
  "How long the contract runs",
  "How either side can end it",
  "How complaints are handled",
  "Replacement terms, if offered",
];

const statuses = [
  ["Request Submitted", "Your request has arrived and has a reference number."],
  ["Under Review", "A placement officer is checking the details."],
  ["Consultation Required", "Staff need to talk with you before matching can start."],
  ["Matching in Progress", "Staff are looking through approved house helps."],
  ["Candidates Available", "Your shortlist is ready."],
  ["Candidate Selected", "You've chosen someone and availability is being confirmed."],
  ["Placement Terms Pending", "The agreement is being prepared for you to review."],
  ["Awaiting Payment", "Shown only when a fee is due before confirmation."],
  ["Booking Confirmed", "Everything is agreed and the start date is set."],
  ["Placement Active", "Your house help has started work."],
  ["Completed", "The placement has ended as agreed."],
  ["Cancelled", "The request or booking was cancelled."],
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/how-it-works/", label: "How it works" }]}
        eyebrow="How it works"
        title="From your request to a settled placement"
        photo="page-how-it-works"
        lead="Netra Home Care is a managed service, not a list of workers to browse. You say what you need, staff find suitable approved candidates, and you make the choice."
      >
        <div className="btn-row">
          <Link href="/request/" className="btn btn--primary">
            Request a house help
            <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="journey-title">
        <div className="container split">
          <div className="sticky">
            <h2 id="journey-title">The steps, in order</h2>
            <p className="lead">
              Nobody is placed on the strength of a form alone. Each match is checked by a person
              before it reaches you.
            </p>
          </div>
          <ol className="numbered">
            {journey.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="agreed-title">
        <div className="container split split--even">
          <div>
            <h2 id="agreed-title">What gets agreed before the start date</h2>
            <p className="lead">
              Both you and your house help should know exactly what&apos;s expected. These points are
              agreed and written down before the placement begins.
            </p>
            <p className="muted">
              The written agreement has to describe the real working arrangement and follow the
              law in Ghana.
            </p>
          </div>
          <ul className="checklist two-col card">
            {agreed.map((a) => (
              <li key={a}>
                <Check size={20} aria-hidden />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="fees-title">
        <div className="container narrow">
          <h2 id="fees-title">Fees and salary are kept separate</h2>
          <p className="lead">
            The placement fee is what you pay Netra Home Care for finding and placing your house
            help. The salary is what your house help earns, and it&apos;s a separate amount agreed
            between you.
          </p>
          <div className="callout callout--gold">
            <Wallet size={20} aria-hidden />
            <p>
              You&apos;ll see the fee, cancellation conditions, refund rules and who is responsible
              for paying the salary before you&apos;re asked to pay anything. Netra Home Care never
              asks for your Mobile Money PIN or full card details.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="status-title">
        <div className="container">
          <div className="section-head">
            <h2 id="status-title">Following your request</h2>
            <p>
              Each request has a status, so you always know where it is. These are the ones you
              may see in your account.
            </p>
          </div>
          <dl className="labels">
            {statuses.map(([name, meaning]) => (
              <div key={name}>
                <dt>
                  <span className="pill pill--brand">{name}</span>
                </dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="after-title">
        <div className="container narrow">
          <h2 id="after-title">If something isn&apos;t working</h2>
          <p>
            Get in touch early. A lot of problems come down to duties or hours that need another
            conversation, and staff can help with that. If a placement has to end, the replacement
            terms in your agreement explain whether you&apos;re eligible for a replacement, how long
            cover lasts, any fee and what happens if nobody suitable is available.
          </p>
          <div className="callout">
            <Info size={20} aria-hidden />
            <p>
              Every complaint gets a reference number, is assigned to a staff member and is
              followed to a recorded outcome. Serious safety concerns are escalated straight away.{" "}
              <Link href="/contact/?topic=safety">Report a concern</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
