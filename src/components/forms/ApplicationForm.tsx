"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lock, TriangleAlert } from "lucide-react";
import { services } from "@/lib/services";
import { formatDate, isEmail, isGhanaPhone, phoneError, phoneHint, submitForm, todayISO } from "@/lib/forms";
import {
  Checkbox,
  ChoiceGroup,
  ErrorSummary,
  Progress,
  SelectField,
  TextArea,
  ReviewBlock,
  TextField,
  type Errors,
} from "./fields";

const STEPS = ["About you", "Your work", "Availability", "Review"];

const LANGUAGES = ["English", "Twi", "Ga", "Ewe", "Fante", "Hausa", "Dagbani", "French"];

const EXPERIENCE = [
  { value: "none", label: "No paid experience yet" },
  { value: "under-1", label: "Less than 1 year" },
  { value: "1-3", label: "1 to 3 years" },
  { value: "3-5", label: "3 to 5 years" },
  { value: "5-plus", label: "More than 5 years" },
];

const CONTACT = [
  { value: "call", title: "Phone call" },
  { value: "whatsapp", title: "WhatsApp" },
  { value: "sms", title: "SMS" },
];

const RESIDENCE = [
  { value: "live-in", title: "Live-in" },
  { value: "live-out", title: "Live-out" },
  { value: "either", title: "Either" },
];

const HOURS = [
  { value: "full-time", title: "Full-time" },
  { value: "part-time", title: "Part-time" },
  { value: "either", title: "Either" },
];

const REFERENCES = [
  { value: "yes", title: "Yes" },
  { value: "one", title: "Only one" },
  { value: "no", title: "Not yet" },
];

type State = {
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  area: string;
  isAdult: boolean;
  languages: string[];
  otherLanguage: string;
  services: string[];
  experience: string;
  skills: string;
  training: string;
  references: string;
  residence: string;
  hours: string;
  startDate: string;
  salary: string;
  agreeChecks: boolean;
  agreePrivacy: boolean;
};

const initial: State = {
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
  area: "",
  isAdult: false,
  languages: [],
  otherLanguage: "",
  services: [],
  experience: "",
  skills: "",
  training: "",
  references: "",
  residence: "",
  hours: "",
  startDate: "",
  salary: "",
  agreeChecks: false,
  agreePrivacy: false,
};

const label = (list: { value: string; title?: string; label?: string }[], v: string) => {
  const item = list.find((x) => x.value === v);
  return item?.title ?? item?.label ?? "";
};

function validate(step: number, s: State): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (s.name.trim().length < 2) e.name = "Enter your full name.";
    if (!s.phone.trim()) e.phone = "Enter your phone number.";
    else if (!isGhanaPhone(s.phone)) e.phone = phoneError;
    if (s.email.trim() && !isEmail(s.email)) e.email = "Enter an email address like name@example.com.";
    if (!s.contactMethod) e.contactMethod = "Choose how you'd like to be contacted.";
    if (s.area.trim().length < 2) e.area = "Enter the area or town where you live.";
    if (!s.isAdult) e.isAdult = "You need to be 18 or older to apply.";
    if (s.languages.length === 0 && !s.otherLanguage.trim()) e.languages = "Choose at least one language you speak.";
  }
  if (step === 1) {
    if (s.services.length === 0) e.services = "Choose at least one kind of work.";
    if (!s.experience) e.experience = "Choose how much experience you have.";
    if (!s.references) e.references = "Choose an answer.";
  }
  if (step === 2) {
    if (!s.residence) e.residence = "Choose live-in, live-out or either.";
    if (!s.hours) e.hours = "Choose full-time, part-time or either.";
    if (!s.startDate) e.startDate = "Choose the earliest date you could start.";
    else if (s.startDate < todayISO()) e.startDate = "Choose a date from today onwards.";
    if (s.salary && !/^\d+$/.test(s.salary)) e.salary = "Enter an amount in cedis, using numbers only.";
  }
  if (step === 3) {
    if (!s.agreeChecks) e.agreeChecks = "Confirm that you understand the checks.";
    if (!s.agreePrivacy) e.agreePrivacy = "Confirm you've read how your information is used.";
  }
  return e;
}

export function ApplicationForm() {
  const [s, setS] = useState<State>(initial);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [result, setResult] = useState<{ reference: string; preview: boolean } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setS((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[key as string];
        return rest;
      });
    }
  };

  const focusTop = () =>
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      headingRef.current?.focus({ preventScroll: true });
    });

  const goTo = (n: number) => {
    setErrors({});
    setStep(n);
    focusTop();
  };

  const submit = async () => {
    setSending(true);
    setSendError("");
    const res = await submitForm("application", {
      name: s.name.trim(),
      phone: s.phone.trim(),
      email: s.email.trim(),
      contactMethod: s.contactMethod,
      area: s.area.trim(),
      languages: [...s.languages, s.otherLanguage.trim()].filter(Boolean),
      services: s.services,
      experience: s.experience,
      skills: s.skills.trim(),
      training: s.training.trim(),
      references: s.references,
      residence: s.residence,
      hours: s.hours,
      startDate: s.startDate,
      salaryExpectationGHS: s.salary,
    });
    setSending(false);
    if (res.ok) {
      setResult({ reference: res.reference, preview: res.preview });
      focusTop();
    } else setSendError(res.message);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(step, s);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }
    if (step < 3) goTo(step + 1);
    else submit();
  };

  if (result) {
    return (
      <div className="form-shell" ref={topRef}>
        <div className="done-panel">
          <div className="done-icon">
            <Check size={30} strokeWidth={2.5} aria-hidden />
          </div>
          <h2 ref={headingRef} tabIndex={-1}>
            {result.preview ? "Application ready" : "Application submitted"}
          </h2>
          <p className="muted">Your application reference is</p>
          <p className="reference">{result.reference}</p>
          {result.preview && (
            <div className="callout callout--gold">
              <TriangleAlert size={20} aria-hidden />
              <p>
                <strong>Preview only: nothing was sent</strong>
                This site isn&apos;t connected to Netra Home Care&apos;s system yet, so the
                application stayed in your browser and the reference above is only an example.
              </p>
            </div>
          )}
          <div className="next">
            <h3>What happens next</h3>
            <ul className="checklist">
              <li>
                <Check size={20} aria-hidden />
                <span>Your application starts with the status Submitted, then moves to Under Review.</span>
              </li>
              <li>
                <Check size={20} aria-hidden />
                <span>
                  Someone from Netra Home Care will contact you by{" "}
                  {s.contactMethod === "call" ? "phone" : label(CONTACT, s.contactMethod)} to confirm your number and help you
                  set up your account.
                </span>
              </li>
              <li>
                <Check size={20} aria-hidden />
                <span>
                  You&apos;ll upload your ID and other documents through the secure upload in your
                  account. Please don&apos;t send them by WhatsApp or SMS.
                </span>
              </li>
            </ul>
          </div>
          <div className="btn-row">
            <Link href="/become-a-house-help/" className="btn btn--secondary">
              Back to applying
            </Link>
            <Link href="/safety-and-verification/" className="btn btn--primary">
              How screening works
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-shell" ref={topRef}>
      <Progress steps={STEPS} current={step} />
      <form noValidate onSubmit={onSubmit}>
        <ErrorSummary errors={errors} attempt={attempt} />

        {step === 0 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              About you
            </h2>
            <p className="step-intro">
              Don&apos;t upload your ID here. That comes later, through your secure account.
            </p>
            <TextField id="name" label="Full name" value={s.name} onChange={(v) => set("name", v)} error={errors.name} autoComplete="name" maxLength={100} />
            <TextField
              id="phone"
              type="tel"
              label="Phone number"
              hint={phoneHint}
              value={s.phone}
              onChange={(v) => set("phone", v)}
              error={errors.phone}
              autoComplete="tel"
              inputMode="tel"
              maxLength={20}
            />
            <TextField id="email" type="email" label="Email" optional value={s.email} onChange={(v) => set("email", v)} error={errors.email} autoComplete="email" maxLength={120} />
            <ChoiceGroup
              id="contactMethod"
              label="How should we contact you?"
              type="radio"
              compact
              options={CONTACT}
              value={s.contactMethod}
              onChange={(v) => set("contactMethod", v as string)}
              error={errors.contactMethod}
            />
            <TextField
              id="area"
              label="Area or town where you live"
              hint="For example, Madina or Kasoa. This helps match you with homes you can reach."
              value={s.area}
              onChange={(v) => set("area", v)}
              error={errors.area}
              maxLength={80}
            />
            <ChoiceGroup
              id="languages"
              label="Languages you speak"
              type="checkbox"
              compact
              options={LANGUAGES.map((l) => ({ value: l, title: l }))}
              value={s.languages}
              onChange={(v) => set("languages", v as string[])}
              error={errors.languages}
            />
            <TextField id="otherLanguage" label="Other languages" optional value={s.otherLanguage} onChange={(v) => set("otherLanguage", v)} maxLength={80} />
            <Checkbox id="isAdult" label="I am 18 or older." checked={s.isAdult} onChange={(v) => set("isAdult", v)} error={errors.isAdult} />
          </div>
        )}

        {step === 1 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              Your work
            </h2>
            <p className="step-intro">Tell us the kinds of work you can do and what you&apos;ve done before.</p>
            <ChoiceGroup
              id="services"
              label="Kinds of work you'd like"
              hint="Choose all that apply. Childcare and elderly care include extra checks."
              type="checkbox"
              options={services.map((sv) => ({ value: sv.slug, title: sv.name }))}
              value={s.services}
              onChange={(v) => set("services", v as string[])}
              error={errors.services}
            />
            <SelectField id="experience" label="Paid household work experience" options={EXPERIENCE} value={s.experience} onChange={(v) => set("experience", v)} error={errors.experience} />
            <TextArea
              id="skills"
              label="Your skills and past work"
              optional
              hint="For example, the kinds of homes you've worked in, dishes you cook, or the ages of children you've cared for."
              value={s.skills}
              onChange={(v) => set("skills", v)}
              rows={4}
              maxLength={1500}
            />
            <TextArea
              id="training"
              label="Training or certificates"
              optional
              hint="Such as first aid, catering or childcare courses. You'll show proof later."
              value={s.training}
              onChange={(v) => set("training", v)}
              rows={3}
              maxLength={800}
            />
            <ChoiceGroup
              id="references"
              label="Can you give two work references?"
              hint="People you've worked for who can talk about your work. You'll add their details later."
              type="radio"
              compact
              options={REFERENCES}
              value={s.references}
              onChange={(v) => set("references", v as string)}
              error={errors.references}
            />
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              Availability
            </h2>
            <p className="step-intro">You can change this later in your account.</p>
            <ChoiceGroup id="residence" label="Live-in or live-out?" type="radio" compact options={RESIDENCE} value={s.residence} onChange={(v) => set("residence", v as string)} error={errors.residence} />
            <ChoiceGroup id="hours" label="Full-time or part-time?" type="radio" compact options={HOURS} value={s.hours} onChange={(v) => set("hours", v as string)} error={errors.hours} />
            <TextField id="startDate" type="date" label="Earliest start date" min={todayISO()} value={s.startDate} onChange={(v) => set("startDate", v)} error={errors.startDate} />
            <TextField
              id="salary"
              label="Monthly salary you're hoping for, in cedis (GH₵)"
              optional
              inputMode="numeric"
              value={s.salary}
              onChange={(v) => set("salary", v.replace(/[^\d]/g, ""))}
              error={errors.salary}
              maxLength={7}
            />
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              Check your application
            </h2>
            <p className="step-intro">Make sure everything is right before you send it.</p>
            <div className="review">
              <ReviewBlock
                title="About you"
                onEdit={() => goTo(0)}
                rows={[
                  ["Name", s.name],
                  ["Phone", s.phone],
                  ["Email", s.email],
                  ["Contact by", label(CONTACT, s.contactMethod)],
                  ["Area", s.area],
                  ["Languages", [...s.languages, s.otherLanguage.trim()].filter(Boolean).join(", ")],
                ]}
              />
              <ReviewBlock
                title="Your work"
                onEdit={() => goTo(1)}
                rows={[
                  ["Work", s.services.map((v) => services.find((x) => x.slug === v)?.name).join(", ")],
                  ["Experience", label(EXPERIENCE, s.experience)],
                  ["Skills", s.skills],
                  ["Training", s.training],
                  ["Two references", label(REFERENCES, s.references)],
                ]}
              />
              <ReviewBlock
                title="Availability"
                onEdit={() => goTo(2)}
                rows={[
                  ["Live-in or live-out", label(RESIDENCE, s.residence)],
                  ["Hours", label(HOURS, s.hours)],
                  ["Earliest start", formatDate(s.startDate)],
                  ["Salary hoped for", s.salary ? `GH₵ ${Number(s.salary).toLocaleString("en-GB")} a month` : ""],
                ]}
              />
            </div>
            <div className="callout" style={{ marginBottom: "1.5rem" }}>
              <Lock size={20} aria-hidden />
              <p>
                Your details are only seen by Netra Home Care staff who need them for your
                application. They&apos;re never shown publicly. <Link href="/privacy/">Privacy policy</Link>
              </p>
            </div>
            <Checkbox
              id="agreeChecks"
              label="I understand Netra Home Care will check my identity and references, and may carry out background checks with my consent, before I can be placed."
              checked={s.agreeChecks}
              onChange={(v) => set("agreeChecks", v)}
              error={errors.agreeChecks}
            />
            <Checkbox
              id="agreePrivacy"
              label="I've read how my information will be used."
              checked={s.agreePrivacy}
              onChange={(v) => set("agreePrivacy", v)}
              error={errors.agreePrivacy}
            />
            {sendError && (
              <div className="callout callout--danger" role="alert" style={{ marginTop: "1rem" }}>
                <TriangleAlert size={20} aria-hidden />
                <p>{sendError}</p>
              </div>
            )}
          </div>
        )}

        <div className="form-nav">
          {step > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={() => goTo(step - 1)}>
              <ArrowLeft size={18} aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn--primary" disabled={sending} aria-busy={sending || undefined}>
            {step < 3 ? (
              <>
                Continue
                <ArrowRight size={18} aria-hidden />
              </>
            ) : sending ? (
              "Sending application…"
            ) : (
              "Send application"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
