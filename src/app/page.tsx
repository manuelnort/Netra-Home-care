import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Baby,
  CalendarCheck,
  ClipboardList,
  CookingPot,
  FileCheck,
  HeartHandshake,
  House,
  Lock,
  MessageCircle,
  Plus,
  ShieldCheck,
  Sparkles,
  Sprout,
  UserCheck,
} from "lucide-react";
import { services } from "@/lib/services";
import { faqGroups } from "@/lib/faqs";
import { site } from "@/lib/site";
import { photos } from "@/lib/photos";
import { ServiceCard } from "@/components/ServiceCard";
import { Trail } from "@/components/Trail";
import { FaqList } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { VerificationLabels } from "@/components/VerificationLabels";
import { BrandMark } from "@/components/BrandMark";

const steps = [
  {
    title: "Tell us what you need",
    text: "Pick a service, then describe the duties, days and general area. It's free and takes about five minutes.",
  },
  {
    title: "Staff find your matches",
    text: "A placement officer reviews your request and only looks at house helps who've been screened and approved.",
  },
  {
    title: "Choose and meet",
    text: "You get a shortlist, pick someone and talk to them by phone, video or in person.",
  },
  {
    title: "Agree it in writing",
    text: "Duties, salary and fees are written down before anyone pays. Then your house help starts, and we follow up.",
  },
];

const reasons = [
  {
    icon: UserCheck,
    title: "A person checks every match",
    text: "Software narrows the list. A placement officer decides who you see.",
  },
  {
    icon: ClipboardList,
    title: "You choose from a shortlist",
    text: "Talk to the candidate you prefer before anything is confirmed.",
  },
  {
    icon: CalendarCheck,
    title: "Nothing to pay upfront",
    text: "Sending a request is free. The placement fee comes after you've chosen, and you see it in writing first.",
  },
  {
    icon: HeartHandshake,
    title: "Support after the start date",
    text: "Follow-up calls, a way to raise problems, and replacement terms in your agreement.",
  },
  {
    icon: Lock,
    title: "Your details stay private",
    text: "Only the staff who need your information can see it. Your exact address waits until a placement is confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Checks you can read",
    text: "Each profile shows labels for the checks that were actually completed, and nothing more.",
  },
];

const homeFaqs = [
  faqGroups[0].items[0],
  faqGroups[0].items[1],
  faqGroups[1].items[2],
  faqGroups[2].items[1],
  faqGroups[3].items[2],
];

const orbit = [
  { icon: CookingPot, top: "6%", left: "56%" },
  { icon: Baby, top: "26%", left: "92%" },
  { icon: Sparkles, top: "78%", left: "86%" },
  { icon: HeartHandshake, top: "88%", left: "30%" },
  { icon: House, top: "36%", left: "13%" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <span className="eyebrow">
            <ShieldCheck size={14} aria-hidden />
            Netra Home Care, Accra
          </span>
          <h1>
            Reliable house helps. Greater <span className="accent">peace of mind</span>.
          </h1>
          <p className="lead">
            Find domestic workers for your household through a structured process designed around
            verification, suitability, and ongoing support.
          </p>
          <div className="btn-row">
            <Link href="/request/" className="btn btn--accent">
              Request a house help
              <span className="btn-icon">
                <Plus size={18} aria-hidden />
              </span>
            </Link>
            <Link href="/become-a-house-help/" className="btn btn--primary">
              Become a house help
              <span className="btn-icon">
                <ArrowRight size={18} aria-hidden />
              </span>
            </Link>
          </div>
          <ul className="hero-meta" aria-label="What you get">
            <li>
              <BadgeCheck size={16} aria-hidden /> Identity checked
            </li>
            <li>
              <UserCheck size={16} aria-hidden /> Matched by people
            </li>
            <li>
              <FileCheck size={16} aria-hidden /> Terms in writing
            </li>
          </ul>
        </div>
      </section>

      <section className="strip" aria-label="Services">
        <ul className="strip-track">
          {[...services, ...services].map((s, n) => {
            const copy = n >= services.length;
            return (
              <li key={`${s.slug}-${n}`} aria-hidden={copy ? true : undefined}>
                <Link href={`/services/${s.slug}/`} className="strip-card" tabIndex={copy ? -1 : undefined}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
                  <img src={photos[s.slug].src} alt="" loading={n < 4 ? "eager" : "lazy"} />
                  <span className="tag">
                    {s.name}
                    <span className="arrow">
                      <ArrowUpRight size={16} aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section section--band" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Services</span>
              <h2 id="services-title">
                Help for every part of the home, <span className="accent">full-time or part-time</span>.
              </h2>
            </div>
            <div className="side">
              <p>
                Living in or living out, for a day or for years. Every house help put forward has been
                screened and approved for that service.
              </p>
            </div>
          </div>
          <div className="tray">
            <div className="grid grid--4">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">How it works</span>
              <h2 id="how-title">
                From your request to a <span className="accent">settled placement</span>.
              </h2>
            </div>
            <div className="side">
              <p>Four steps, with a person reviewing every one of them.</p>
              <Link href="/how-it-works/" className="btn btn--primary">
                The full process
                <span className="btn-icon">
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            </div>
          </div>
          <div className="tray bento">
            <div className="tracker bento-tall" aria-label="Example of how a request is tracked">
              <div className="tracker-top">
                <div>
                  <p className="tracker-label">Example request</p>
                  <p className="tracker-ref">NHC-REQ-2026-000123</p>
                </div>
                <span className="pill pill--gold">Candidates available</span>
              </div>
              <p className="tracker-service">Nanny, full-time, live-out</p>
              <Trail
                items={[
                  { title: "Request submitted", desc: "Reference number sent to you", state: "done" },
                  { title: "Under review", desc: "A placement officer checks the details", state: "done" },
                  { title: "Matching in progress", desc: "Only approved house helps are considered", state: "done" },
                  { title: "Candidates available", desc: "Your shortlist is ready to look at", state: "current" },
                  { title: "Candidate selected", state: "todo" },
                  { title: "Booking confirmed", state: "todo" },
                ]}
              />
              <p className="tracker-caption">An example of how a request moves.</p>
            </div>
            {steps.map((step, i) => (
              <div className="card" key={step.title}>
                <span className="step-chip" aria-hidden>
                  {i + 1}
                </span>
                <h3>
                  <span className="visually-hidden">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--band" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Why Netra Home Care</span>
              <h2 id="why-title">
                Peace of mind, <span className="accent">at every step</span>.
              </h2>
            </div>
            <div className="side">
              <p>
                Finding help through word of mouth works until it doesn&apos;t. A managed process gives
                you checks, records and someone to call.
              </p>
            </div>
          </div>
          <div className="tray">
            <div className="grid grid--3">
              <figure className="photo-card photo-card--wide">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
                <img src={photos["page-request"].src} alt={photos["page-request"].alt} loading="lazy" />
              </figure>
              {reasons.map(({ icon: Icon, title, text }) => (
                <div className="card" key={title}>
                  <span className="icon-circle">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="verify-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">Verification</span>
              <h2 id="verify-title">
                Nobody is matched until <span className="accent">they&apos;re approved</span>.
              </h2>
            </div>
            <div className="side">
              <p>
                Identity checks, references, an interview and orientation come first. A label only shows
                when that check was actually done.
              </p>
              <Link href="/safety-and-verification/" className="btn btn--secondary">
                How screening works
                <span className="btn-icon">
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            </div>
          </div>
          <div className="verify-grid">
            <VerificationLabels />
            <figure className="photo-card">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
              <img src={photos["page-safety"].src} alt={photos["page-safety"].alt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="pros-title">
        <div className="container">
          <div className="panel">
            <div>
              <span className="eyebrow">For house helps</span>
              <h2 id="pros-title">
                Work with <span className="accent">Netra Home Care</span>.
              </h2>
              <p className="lead">
                Get screened once, then hear about households that need your skills. Everything you agree
                to is written down before you start.
              </p>
              <ul className="feature-list">
                <li>
                  <span className="icon-circle">
                    <FileCheck size={18} aria-hidden />
                  </span>
                  <div>
                    <strong>Clear terms</strong>
                    <span>Duties, salary, hours and rest days agreed in writing.</span>
                  </div>
                </li>
                <li>
                  <span className="icon-circle">
                    <BadgeCheck size={18} aria-hidden />
                  </span>
                  <div>
                    <strong>You choose</strong>
                    <span>Accept or decline the placements you&apos;re offered.</span>
                  </div>
                </li>
                <li>
                  <span className="icon-circle">
                    <MessageCircle size={18} aria-hidden />
                  </span>
                  <div>
                    <strong>Someone to call</strong>
                    <span>Report unsafe conditions or broken terms at any time.</span>
                  </div>
                </li>
              </ul>
              <Link href="/become-a-house-help/apply/" className="btn btn--primary">
                Start your application
                <span className="btn-icon">
                  <ArrowRight size={18} aria-hidden />
                </span>
              </Link>
            </div>
            <div className="rings" aria-hidden>
              <span className="ring" />
              <span className="ring" />
              <span className="ring" />
              <span className="center">
                <BrandMark />
              </span>
              {orbit.map(({ icon: Icon, top, left }, n) => (
                <span key={n} className="orbit" style={{ top, left }}>
                  <Icon size={18} strokeWidth={1.75} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="voices-title">
        <div className="container">
          {site.testimonials.length > 0 ? (
            <>
              <h2 id="voices-title">What customers say</h2>
              <div className="tray">
                <div className="grid grid--3">
                  {site.testimonials.map((t) => (
                    <figure className="card quote" key={t.name}>
                      <blockquote>{t.quote}</blockquote>
                      <figcaption>
                        {t.name}, {t.context}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="tray">
              <div className="pilot">
                <span className="icon-circle">
                  <Sprout size={20} strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <h2 id="voices-title">Starting with a small pilot in Accra</h2>
                  <p>
                    Netra Home Care is opening with a limited number of households and house helps, so
                    each placement gets proper attention. Reviews from real customers will go here once
                    there are some to share.
                  </p>
                </div>
                <Link href="/request/" className="btn btn--primary">
                  Join the pilot
                  <span className="btn-icon">
                    <ArrowRight size={18} aria-hidden />
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section section--band" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <span className="eyebrow">FAQs</span>
              <h2 id="faq-title">
                Questions, <span className="accent">answered</span>.
              </h2>
            </div>
            <div className="side">
              <p>
                <strong>Can&apos;t find your answer?</strong>
                <br />
                Send a message and someone from the team will get back to you.
              </p>
              <Link href="/contact/" className="btn btn--primary">
                Contact us
                <span className="btn-icon">
                  <Plus size={18} aria-hidden />
                </span>
              </Link>
            </div>
          </div>
          <FaqList items={homeFaqs} />
          <p style={{ marginTop: "1.25rem" }}>
            <Link href="/faqs/" className="text-link">
              All FAQs <ArrowRight size={18} aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
