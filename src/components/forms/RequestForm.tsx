"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info, Lock, TriangleAlert } from "lucide-react";
import { getService, services, type Service } from "@/lib/services";
import { formatDate, isEmail, isGhanaPhone, phoneError, phoneHint, submitForm, todayISO } from "@/lib/forms";
import { ServiceIcon } from "@/components/icons";
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

const STEPS = ["Service", "Arrangement", "Requirements", "Contact details", "Review"];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CONTACT_METHODS = [
  { value: "call", title: "Phone call" },
  { value: "whatsapp", title: "WhatsApp" },
  { value: "sms", title: "SMS" },
  { value: "email", title: "Email" },
];

const CONSULT_TIMES = [
  { value: "weekday-morning", label: "Weekday morning (8am to 12pm)" },
  { value: "weekday-afternoon", label: "Weekday afternoon (12pm to 5pm)" },
  { value: "weekday-evening", label: "Weekday evening (5pm to 7pm)" },
  { value: "saturday", label: "Saturday" },
  { value: "any", label: "Any time" },
];

const EXPERIENCE = [
  { value: "any", label: "No preference" },
  { value: "1", label: "At least 1 year" },
  { value: "3", label: "At least 3 years" },
  { value: "5", label: "At least 5 years" },
];

const DURATIONS = [
  { value: "up-to-2-weeks", label: "Up to 2 weeks" },
  { value: "2-to-4-weeks", label: "2 to 4 weeks" },
  { value: "1-to-3-months", label: "1 to 3 months" },
  { value: "over-3-months", label: "More than 3 months" },
];

const OTHER_ARRANGEMENTS = [
  { value: "live-in", title: "Live-in" },
  { value: "live-out", title: "Live-out" },
  { value: "full-time", title: "Full-time" },
  { value: "part-time", title: "Part-time" },
  { value: "one-time", title: "One-time" },
  { value: "recurring", title: "Recurring" },
  { value: "temporary", title: "Temporary" },
];

type State = {
  service: string;
  otherService: string;
  residence: string;
  hours: string;
  frequency: string;
  temporaryType: string;
  duration: string;
  otherArrangement: string;
  area: string;
  startDate: string;
  days: string[];
  startTime: string;
  endTime: string;
  duties: string[];
  otherDuties: string;
  accommodation: string;
  experience: string;
  budgetMin: string;
  budgetMax: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  contactMethod: string;
  consultTime: string;
  confirmAccurate: boolean;
  agreePrivacy: boolean;
};

const initialState: State = {
  service: "",
  otherService: "",
  residence: "",
  hours: "",
  frequency: "",
  temporaryType: "",
  duration: "",
  otherArrangement: "",
  area: "",
  startDate: "",
  days: [],
  startTime: "",
  endTime: "",
  duties: [],
  otherDuties: "",
  accommodation: "",
  experience: "",
  budgetMin: "",
  budgetMax: "",
  details: "",
  name: "",
  phone: "",
  email: "",
  contactMethod: "",
  consultTime: "",
  confirmAccurate: false,
  agreePrivacy: false,
};

function kindOf(s: State): Service["arrangementKind"] | "other" | null {
  if (s.service === "other") return "other";
  return getService(s.service)?.arrangementKind ?? null;
}

function isLiveIn(s: State) {
  const kind = kindOf(s);
  return (
    kind === "live-in" ||
    (kind === "residence-and-hours" && s.residence === "live-in") ||
    (kind === "other" && s.otherArrangement === "live-in")
  );
}

function isOneTime(s: State) {
  return kindOf(s) === "frequency" && s.frequency === "one-time";
}

function serviceName(s: State) {
  return s.service === "other" ? s.otherService || "Another service" : getService(s.service)?.name ?? "";
}

function arrangementSummary(s: State) {
  switch (kindOf(s)) {
    case "live-in":
      return "Live-in, full-time";
    case "live-out":
      return `Live-out, ${s.hours}`;
    case "residence-and-hours":
      return s.residence === "live-in" ? "Live-in, full-time" : `Live-out, ${s.hours}`;
    case "frequency":
      return s.frequency === "one-time" ? "One-time" : "Recurring";
    case "temporary": {
      const d = DURATIONS.find((x) => x.value === s.duration)?.label.toLowerCase();
      return `${s.temporaryType === "contract" ? "Contract-based" : "Temporary"}${d ? `, ${d}` : ""}`;
    }
    case "other":
      return OTHER_ARRANGEMENTS.find((a) => a.value === s.otherArrangement)?.title ?? "";
    default:
      return "";
  }
}

function budgetLabel(s: State) {
  if (kindOf(s) === "frequency") return s.frequency === "one-time" ? "Budget for the clean" : "Budget per visit";
  if (kindOf(s) === "temporary") return "Budget for the whole period";
  return "Monthly salary budget";
}

function validate(step: number, s: State): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!s.service) e.service = "Choose the service you need.";
    if (s.service === "other" && s.otherService.trim().length < 3)
      e.otherService = "Describe the help you need in a few words.";
  }
  if (step === 1) {
    const kind = kindOf(s);
    if (kind === "residence-and-hours") {
      if (!s.residence) e.residence = "Choose live-in or live-out.";
      if (s.residence === "live-out" && !s.hours) e.hours = "Choose full-time or part-time.";
    }
    if (kind === "live-out" && !s.hours) e.hours = "Choose full-time or part-time.";
    if (kind === "frequency" && !s.frequency) e.frequency = "Choose one-time or recurring.";
    if (kind === "temporary") {
      if (!s.temporaryType) e.temporaryType = "Choose temporary or contract-based.";
      if (!s.duration) e.duration = "Choose roughly how long you need help.";
    }
    if (kind === "other" && !s.otherArrangement) e.otherArrangement = "Choose the arrangement that fits best.";
  }
  if (step === 2) {
    if (s.area.trim().length < 2) e.area = "Enter the area or neighbourhood, for example East Legon.";
    if (!s.startDate) e.startDate = isOneTime(s) ? "Choose a date for the clean." : "Choose a start date.";
    else if (s.startDate < todayISO()) e.startDate = "Choose a date from today onwards.";
    if (!isOneTime(s) && s.days.length === 0) e.days = "Choose at least one working day.";
    if (s.startTime && s.endTime && s.endTime <= s.startTime)
      e.endTime = "The finish time needs to be later than the start time.";
    if (s.service !== "other" && s.duties.length === 0 && s.otherDuties.trim() === "")
      e.duties = "Choose at least one duty, or describe the duties below.";
    if (s.service === "other" && s.otherDuties.trim() === "") e.otherDuties = "Describe the duties.";
    if (isLiveIn(s) && !s.accommodation) e.accommodation = "Choose the accommodation you'll provide.";
    const min = Number(s.budgetMin);
    const max = Number(s.budgetMax);
    if (s.budgetMin && (!Number.isFinite(min) || min < 0)) e.budgetMin = "Enter an amount in cedis, using numbers only.";
    if (s.budgetMax && (!Number.isFinite(max) || max < 0)) e.budgetMax = "Enter an amount in cedis, using numbers only.";
    if (!e.budgetMin && !e.budgetMax && s.budgetMin && s.budgetMax && max < min)
      e.budgetMax = "The highest amount needs to be the same as or more than the lowest.";
  }
  if (step === 3) {
    if (s.name.trim().length < 2) e.name = "Enter your full name.";
    if (!s.phone.trim()) e.phone = "Enter your phone number.";
    else if (!isGhanaPhone(s.phone)) e.phone = phoneError;
    if (s.email.trim() && !isEmail(s.email)) e.email = "Enter an email address like name@example.com.";
    if (!s.contactMethod) e.contactMethod = "Choose how you'd like to be contacted.";
    if (s.contactMethod === "email" && !s.email.trim())
      e.email = "Enter your email address, or choose another way to be contacted.";
    if (!s.consultTime) e.consultTime = "Choose a time that suits you for a call.";
  }
  if (step === 4) {
    if (!s.confirmAccurate) e.confirmAccurate = "Confirm that the details are correct.";
    if (!s.agreePrivacy) e.agreePrivacy = "Confirm you've read how your information is used.";
  }
  return e;
}

/** Only the fields that apply to the chosen service and arrangement are sent. */
function payload(s: State) {
  const live = isLiveIn(s);
  return {
    service: s.service,
    serviceName: serviceName(s),
    arrangement: arrangementSummary(s),
    area: s.area.trim(),
    startDate: s.startDate,
    days: isOneTime(s) ? [] : s.days,
    hours: live ? "" : [s.startTime, s.endTime].filter(Boolean).join(" to "),
    duties: s.duties,
    otherDuties: s.otherDuties.trim(),
    accommodation: live ? s.accommodation : "",
    experience: s.experience,
    budgetGHS: { min: s.budgetMin, max: s.budgetMax, basis: budgetLabel(s) },
    details: s.details.trim(),
    contact: {
      name: s.name.trim(),
      phone: s.phone.trim(),
      email: s.email.trim(),
      method: s.contactMethod,
      consultTime: s.consultTime,
    },
  };
}

export function RequestForm() {
  const params = useSearchParams();
  const [s, setS] = useState<State>(() => {
    const pre = params.get("service");
    return pre && getService(pre) ? { ...initialState, service: pre } : initialState;
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [result, setResult] = useState<{ reference: string; preview: boolean } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof State>(key: K, value: State[K]) => {
    setS((prev) => {
      const next = { ...prev, [key]: value };
      // A different service has different arrangements and duties.
      if (key === "service" && value !== prev.service) {
        Object.assign(next, {
          residence: "",
          hours: "",
          frequency: "",
          temporaryType: "",
          duration: "",
          otherArrangement: "",
          duties: [],
          accommodation: "",
        });
      }
      return next;
    });
    if (errors[key as string]) {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[key as string];
        return rest;
      });
    }
  };

  const goTo = (n: number) => {
    setErrors({});
    setStep(n);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      headingRef.current?.focus({ preventScroll: true });
    });
  };

  const next = () => {
    const e = validate(step, s);
    setErrors(e);
    if (Object.keys(e).length === 0) goTo(step + 1);
    else setAttempt((n) => n + 1);
  };

  const submit = async () => {
    const e = validate(4, s);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }
    setSending(true);
    setSendError("");
    const res = await submitForm("request", payload(s));
    setSending(false);
    if (res.ok) {
      setResult({ reference: res.reference, preview: res.preview });
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ block: "start" });
        headingRef.current?.focus({ preventScroll: true });
      });
    } else {
      setSendError(res.message);
    }
  };

  const service = getService(s.service);
  const kind = kindOf(s);
  const method = CONTACT_METHODS.find((m) => m.value === s.contactMethod)?.title ?? "";

  if (result) {
    return (
      <div className="form-shell" ref={topRef}>
        <div className="done-panel">
          <div className="done-icon">
            <Check size={30} strokeWidth={2.5} aria-hidden />
          </div>
          <h2 ref={headingRef} tabIndex={-1}>
            {result.preview ? "Request ready" : "Request received"}
          </h2>
          <p className="muted">Your reference number is</p>
          <p className="reference">{result.reference}</p>
          {result.preview && (
            <div className="callout callout--gold">
              <TriangleAlert size={20} aria-hidden />
              <p>
                <strong>Preview only: nothing was sent</strong>
                This site isn&apos;t connected to Netra Home Care&apos;s system yet, so the request
                stayed in your browser and the reference above is only an example.
              </p>
            </div>
          )}
          <div className="next">
            <h3>What happens next</h3>
            <ul className="checklist">
              <li>
                <Check size={20} aria-hidden />
                <span>A placement officer reviews your request, usually within one business day.</span>
              </li>
              <li>
                <Check size={20} aria-hidden />
                <span>
                  They&apos;ll get in touch by {method === "Phone call" ? "phone" : method === "Email" ? "email" : method} to
                  go over anything that&apos;s missing. Your phone number is confirmed before any
                  placement goes ahead.
                </span>
              </li>
              <li>
                <Check size={20} aria-hidden />
                <span>When suitable candidates are available, you&apos;ll get a shortlist to choose from.</span>
              </li>
            </ul>
            <p className="small muted" style={{ marginTop: "1rem" }}>
              Keep your reference number. You&apos;ll need it if you contact Netra Home Care about
              this request.
            </p>
          </div>
          <div className="btn-row">
            <Link href="/" className="btn btn--secondary">
              Back to home
            </Link>
            <Link href="/how-it-works/" className="btn btn--primary">
              See what happens next
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const serviceOptions = [
    ...services.map((sv) => ({
      value: sv.slug,
      title: sv.name,
      desc: sv.summary,
      icon: <ServiceIcon name={sv.icon} size={20} />,
    })),
    { value: "other", title: "Something else", desc: "Another kind of household help." },
  ];

  return (
    <div className="form-shell" ref={topRef}>
      <Progress steps={STEPS} current={step} />
      <form
        noValidate
        onSubmit={(ev) => {
          ev.preventDefault();
          if (step < 4) next();
          else submit();
        }}
      >
        <ErrorSummary errors={errors} attempt={attempt} />

        {step === 0 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              What kind of help do you need?
            </h2>
            <p className="step-intro">Choose the closest match. You can add details later.</p>
            <ChoiceGroup
              id="service"
              label="Service"
              type="radio"
              options={serviceOptions}
              value={s.service}
              onChange={(v) => set("service", v as string)}
              error={errors.service}
            />
            {s.service === "other" && (
              <TextField
                id="otherService"
                label="What help do you need?"
                value={s.otherService}
                onChange={(v) => set("otherService", v)}
                error={errors.otherService}
                maxLength={120}
              />
            )}
            {service?.extraChecks && (
              <div className="callout">
                <Info size={20} aria-hidden />
                <p>{service.extraChecks}</p>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              How would you like it to work?
            </h2>
            <p className="step-intro">{serviceName(s)}</p>

            {kind === "residence-and-hours" && (
              <>
                <ChoiceGroup
                  id="residence"
                  label="Where will they stay?"
                  type="radio"
                  options={[
                    { value: "live-in", title: "Live-in", desc: "Lives at your home and works full-time" },
                    { value: "live-out", title: "Live-out", desc: "Travels in and goes home each day" },
                  ]}
                  value={s.residence}
                  onChange={(v) => set("residence", v as string)}
                  error={errors.residence}
                />
                {s.residence === "live-out" && (
                  <ChoiceGroup
                    id="hours"
                    label="Full-time or part-time?"
                    type="radio"
                    options={[
                      { value: "full-time", title: "Full-time" },
                      { value: "part-time", title: "Part-time" },
                    ]}
                    value={s.hours}
                    onChange={(v) => set("hours", v as string)}
                    error={errors.hours}
                  />
                )}
              </>
            )}

            {kind === "live-in" && (
              <div className="callout">
                <Info size={20} aria-hidden />
                <p>
                  <strong>Live-in, full-time</strong>
                  A live-in house help stays at your home and works full-time. You&apos;ll describe
                  the accommodation in the next step.
                </p>
              </div>
            )}

            {kind === "live-out" && (
              <ChoiceGroup
                id="hours"
                label="Full-time or part-time?"
                type="radio"
                options={[
                  { value: "full-time", title: "Full-time" },
                  { value: "part-time", title: "Part-time" },
                ]}
                value={s.hours}
                onChange={(v) => set("hours", v as string)}
                error={errors.hours}
              />
            )}

            {kind === "frequency" && (
              <ChoiceGroup
                id="frequency"
                label="How often?"
                type="radio"
                options={[
                  { value: "one-time", title: "One-time", desc: "A single clean, such as a deep clean" },
                  { value: "recurring", title: "Recurring", desc: "Regular visits on set days" },
                ]}
                value={s.frequency}
                onChange={(v) => set("frequency", v as string)}
                error={errors.frequency}
              />
            )}

            {kind === "temporary" && (
              <>
                <ChoiceGroup
                  id="temporaryType"
                  label="Type of arrangement"
                  type="radio"
                  options={[
                    { value: "temporary", title: "Temporary", desc: "Short-term cover" },
                    { value: "contract", title: "Contract-based", desc: "A fixed contract for a set period" },
                  ]}
                  value={s.temporaryType}
                  onChange={(v) => set("temporaryType", v as string)}
                  error={errors.temporaryType}
                />
                <SelectField
                  id="duration"
                  label="Roughly how long?"
                  options={DURATIONS}
                  value={s.duration}
                  onChange={(v) => set("duration", v)}
                  error={errors.duration}
                />
              </>
            )}

            {kind === "other" && (
              <ChoiceGroup
                id="otherArrangement"
                label="Which arrangement fits best?"
                type="radio"
                compact
                options={OTHER_ARRANGEMENTS}
                value={s.otherArrangement}
                onChange={(v) => set("otherArrangement", v as string)}
                error={errors.otherArrangement}
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              Tell us about the job
            </h2>
            <p className="step-intro">
              The more you share, the better the match. Only what&apos;s needed for matching is asked
              for here.
            </p>

            <TextField
              id="area"
              label="Area or neighbourhood"
              hint="Just the general area for now, such as East Legon or Tema Community 25. Please don't enter your house address."
              value={s.area}
              onChange={(v) => set("area", v)}
              error={errors.area}
              autoComplete="address-level3"
              maxLength={80}
            />

            <TextField
              id="startDate"
              type="date"
              label={isOneTime(s) ? "Date of the clean" : "Start date"}
              value={s.startDate}
              min={todayISO()}
              onChange={(v) => set("startDate", v)}
              error={errors.startDate}
            />

            {!isOneTime(s) && (
              <ChoiceGroup
                id="days"
                label="Working days"
                type="checkbox"
                compact
                options={DAYS.map((d) => ({ value: d, title: d }))}
                value={s.days}
                onChange={(v) => set("days", v as string[])}
                error={errors.days}
              />
            )}

            {!isLiveIn(s) && (
              <div className="field-row">
                <TextField
                  id="startTime"
                  type="time"
                  label="Start time"
                  optional
                  value={s.startTime}
                  onChange={(v) => set("startTime", v)}
                />
                <TextField
                  id="endTime"
                  type="time"
                  label="Finish time"
                  optional
                  value={s.endTime}
                  onChange={(v) => set("endTime", v)}
                  error={errors.endTime}
                />
              </div>
            )}

            {service && (
              <ChoiceGroup
                id="duties"
                label="Duties"
                hint="Choose all that apply."
                type="checkbox"
                options={service.duties.map((d) => ({ value: d, title: d }))}
                value={s.duties}
                onChange={(v) => set("duties", v as string[])}
                error={errors.duties}
              />
            )}

            <TextArea
              id="otherDuties"
              label={service ? "Other duties" : "Duties"}
              optional={!!service}
              value={s.otherDuties}
              onChange={(v) => set("otherDuties", v)}
              error={errors.otherDuties}
              rows={3}
              maxLength={600}
            />

            {isLiveIn(s) && (
              <ChoiceGroup
                id="accommodation"
                label="Accommodation"
                type="radio"
                options={[
                  { value: "private-room", title: "A private room" },
                  { value: "shared-room", title: "A shared room" },
                  { value: "to-discuss", title: "I'd like to discuss it" },
                ]}
                value={s.accommodation}
                onChange={(v) => set("accommodation", v as string)}
                error={errors.accommodation}
              />
            )}

            <SelectField
              id="experience"
              label="Experience you're looking for"
              optional
              options={EXPERIENCE}
              value={s.experience}
              onChange={(v) => set("experience", v)}
            />

            <fieldset className="field">
              <legend>
                {budgetLabel(s)} in cedis (GH₵)<span className="optional"> (optional)</span>
              </legend>
              <span className="hint">A range helps staff match people whose expectations fit.</span>
              <div className="field-row">
                <TextField
                  id="budgetMin"
                  label="From"
                  inputMode="numeric"
                  optional
                  value={s.budgetMin}
                  onChange={(v) => set("budgetMin", v.replace(/[^\d]/g, ""))}
                  error={errors.budgetMin}
                  maxLength={7}
                />
                <TextField
                  id="budgetMax"
                  label="To"
                  inputMode="numeric"
                  optional
                  value={s.budgetMax}
                  onChange={(v) => set("budgetMax", v.replace(/[^\d]/g, ""))}
                  error={errors.budgetMax}
                  maxLength={7}
                />
              </div>
            </fieldset>

            <TextArea
              id="details"
              label="Anything else that would help"
              optional
              hint={
                service
                  ? `For example: ${service.requestTips.join("; ").toLowerCase()}.`
                  : "Who lives in the home, routines, or anything the house help should know."
              }
              value={s.details}
              onChange={(v) => set("details", v)}
              rows={4}
              maxLength={1500}
            />
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              How can we reach you?
            </h2>
            <p className="step-intro">A placement officer will contact you about this request.</p>
            <TextField
              id="name"
              label="Full name"
              value={s.name}
              onChange={(v) => set("name", v)}
              error={errors.name}
              autoComplete="name"
              maxLength={100}
            />
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
            <TextField
              id="email"
              type="email"
              label="Email"
              optional={s.contactMethod !== "email"}
              value={s.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
              autoComplete="email"
              maxLength={120}
            />
            <ChoiceGroup
              id="contactMethod"
              label="How would you like to be contacted?"
              type="radio"
              compact
              options={CONTACT_METHODS}
              value={s.contactMethod}
              onChange={(v) => set("contactMethod", v as string)}
              error={errors.contactMethod}
            />
            <SelectField
              id="consultTime"
              label="Best time for a call"
              options={CONSULT_TIMES}
              value={s.consultTime}
              onChange={(v) => set("consultTime", v)}
              error={errors.consultTime}
            />
          </div>
        )}

        {step === 4 && (
          <div className="form-step">
            <h2 ref={headingRef} tabIndex={-1}>
              Check your request
            </h2>
            <p className="step-intro">Make sure everything is right before you send it.</p>
            <div className="review">
              <ReviewBlock
                title="Service"
                onEdit={() => goTo(0)}
                rows={[
                  ["Service", serviceName(s)],
                  ["Arrangement", arrangementSummary(s)],
                ]}
              />
              <ReviewBlock
                title="Requirements"
                onEdit={() => goTo(2)}
                rows={[
                  ["Area", s.area],
                  [isOneTime(s) ? "Date" : "Start date", formatDate(s.startDate)],
                  ["Working days", isOneTime(s) ? "" : s.days.join(", ")],
                  [
                    "Hours",
                    !isLiveIn(s) && (s.startTime || s.endTime)
                      ? [s.startTime, s.endTime].filter(Boolean).join(" to ")
                      : "",
                  ],
                  ["Duties", [...s.duties, s.otherDuties.trim()].filter(Boolean).join(", ")],
                  [
                    "Accommodation",
                    isLiveIn(s)
                      ? { "private-room": "A private room", "shared-room": "A shared room", "to-discuss": "To discuss" }[
                          s.accommodation
                        ] ?? ""
                      : "",
                  ],
                  ["Experience", EXPERIENCE.find((x) => x.value === s.experience)?.label ?? ""],
                  [
                    budgetLabel(s),
                    s.budgetMin || s.budgetMax
                      ? `GH₵ ${[s.budgetMin, s.budgetMax]
                          .filter(Boolean)
                          .map((n) => Number(n).toLocaleString("en-GB"))
                          .join(" to ")}`
                      : "",
                  ],
                  ["Other details", s.details],
                ]}
              />
              <ReviewBlock
                title="Contact details"
                onEdit={() => goTo(3)}
                rows={[
                  ["Name", s.name],
                  ["Phone", s.phone],
                  ["Email", s.email],
                  ["Contact by", method],
                  ["Best time", CONSULT_TIMES.find((c) => c.value === s.consultTime)?.label ?? ""],
                ]}
              />
            </div>

            <div className="callout" style={{ marginBottom: "1.5rem" }}>
              <Lock size={20} aria-hidden />
              <p>
                Your details are only used to handle this request and are only seen by Netra Home
                Care staff who need them. Your exact address is only asked for once a placement is
                confirmed. <Link href="/privacy/">Privacy policy</Link>
              </p>
            </div>

            <Checkbox
              id="confirmAccurate"
              label="The details above are correct."
              checked={s.confirmAccurate}
              onChange={(v) => set("confirmAccurate", v)}
              error={errors.confirmAccurate}
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
            {step < 4 ? (
              <>
                Continue
                <ArrowRight size={18} aria-hidden />
              </>
            ) : sending ? (
              "Sending request…"
            ) : (
              "Send request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
