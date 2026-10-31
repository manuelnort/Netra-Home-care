import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, FileCheck, MessageCircle, ShieldCheck, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Become a house help",
  description:
    "Apply to work as a house help, nanny, cook, cleaner or elderly care assistant with Netra Home Care in Accra. Clear agreements, fair treatment and support.",
  alternates: { canonical: "/become-a-house-help/" },
};

const eligibility = [
  "You're 18 or older",
  "You're allowed to work in Ghana",
  "You have skills or experience in at least one of the services",
  "You have a phone number you can be reached on",
  "You're willing to complete identity checks, references and an interview",
];

const stages = [
  ["Apply online", "Tell us about yourself, your work and when you're available. It takes about five minutes."],
  ["Set up your account", "Someone from Netra Home Care contacts you to confirm your phone number and set up your account."],
  ["Upload your documents", "Add your ID and any certificates through the secure upload in your account."],
  ["Identity check", "An authorised officer verifies your identity."],
  ["References and background checks", "Carried out lawfully, and with your consent where it's needed."],
  ["Interview and skills assessment", "A chance to show what you can do. Childcare and elderly care include extra competency checks."],
  ["Orientation", "Professional conduct, confidentiality, safety, workplace boundaries and how to report a concern."],
  ["Approval", "Once you're approved, you can be matched with households."],
  ["Placement opportunities", "When a household fits, you hear about it and choose whether to accept or decline."],
];

const statuses = [
  ["Draft", "Started but not yet sent."],
  ["Submitted", "Received by Netra Home Care."],
  ["Under Review", "Staff are looking at your application."],
  ["Documents Required", "Something is missing or needs correcting."],
  ["Identity Verification Pending", "Waiting for your identity check."],
  ["Background Checks Pending", "References or background checks are in progress."],
  ["Interview Pending", "Your interview is being arranged."],
  ["Training Pending", "Orientation is still to be completed."],
  ["Approved", "You can now be matched with households."],
  ["Rejected", "The application didn't go ahead this time."],
  ["Suspended", "Paused while something is reviewed."],
  ["Archived", "Closed and no longer active."],
];

const promises = [
  {
    icon: FileCheck,
    title: "Agreements in writing",
    text: "Duties, salary, working hours, rest periods and, for live-in roles, accommodation are agreed and written down before you start.",
  },
  {
    icon: Check,
    title: "You choose your placements",
    text: "You can accept or decline the opportunities you're offered.",
  },
  {
    icon: MessageCircle,
    title: "Someone to talk to",
    text: "Report unsafe conditions, mistreatment or broken terms at any time. Reports are taken seriously and handled fairly.",
  },
  {
    icon: ShieldCheck,
    title: "Your documents stay private",
    text: "Households never see your ID, ID number or home address. Only authorised staff can open your documents.",
  },
];

export default function BecomeAHouseHelpPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/become-a-house-help/", label: "Become a house help" }]}
        eyebrow="Become a house help"
        title="Find good household work, on clear terms"
        photo="page-become-a-house-help"
        lead="Apply once, get properly screened, and be matched with households that need your skills. Everything you agree to is written down before you start."
      >
        <div className="btn-row">
          <Link href="/become-a-house-help/apply/" className="btn btn--primary">
            Start your application
            <ArrowRight size={18} aria-hidden />
          </Link>
          <Link href="/house-help-login/" className="btn btn--secondary">
            Check my application
          </Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="promise-title">
        <div className="container">
          <div className="section-head">
            <h2 id="promise-title">What you can expect</h2>
            <p>Good placements last when both sides are treated well.</p>
          </div>
          <div className="grid grid--4">
            {promises.map(({ icon: Icon, title, text }) => (
              <div className="card" key={title}>
                <div className="icon-tile">
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="who-title">
        <div className="container split split--even">
          <div>
            <h2 id="who-title">Who can apply</h2>
            <p className="lead">
              You can apply for one kind of work or several. If you&apos;re new to paid household work
              but have the skills, you can still apply.
            </p>
          </div>
          <ul className="checklist card">
            {eligibility.map((e) => (
              <li key={e}>
                <Check size={20} aria-hidden />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container split">
          <div className="sticky">
            <h2 id="steps-title">From application to your first placement</h2>
            <p className="lead">
              Every applicant goes through the same steps. You can see where you are at any time.
            </p>
            <div className="callout callout--gold">
              <TriangleAlert size={20} aria-hidden />
              <p>
                Never send photos of your Ghana Card or other ID by WhatsApp or SMS. Netra Home Care
                staff won&apos;t ask you to.
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

      <section className="section section--tint" aria-labelledby="status-title">
        <div className="container">
          <div className="section-head">
            <h2 id="status-title">Application statuses</h2>
            <p>Your application always shows one of these, so you know what&apos;s happening.</p>
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

      <CtaBand
        title="Ready to apply?"
        text="It takes about five minutes. You won't need your ID for this part."
        primary={{ href: "/become-a-house-help/apply/", label: "Start your application" }}
        secondary={{ href: "/faqs/#workers", label: "Questions from applicants" }}
      />
    </>
  );
}
