"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Phone, TriangleAlert } from "lucide-react";
import { isEmail, isGhanaPhone, phoneError, phoneHint, submitForm } from "@/lib/forms";
import { ErrorSummary, SelectField, TextArea, TextField, type Errors } from "./fields";

const TOPICS = [
  { value: "question", label: "A general question" },
  { value: "request", label: "Help with a request" },
  { value: "application", label: "Applying to work" },
  { value: "safety", label: "Report a safety concern" },
  { value: "complaint", label: "Complaint about a placement" },
  { value: "other", label: "Something else" },
];

const isReport = (topic: string) => topic === "safety" || topic === "complaint";

export function ContactForm() {
  const params = useSearchParams();
  const [topic, setTopic] = useState(() => {
    const t = params.get("topic") ?? "";
    return TOPICS.some((x) => x.value === t) ? t : "";
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [result, setResult] = useState<{ reference: string; preview: boolean } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const clear = (key: string) =>
    errors[key] &&
    setErrors((prev) => {
      const rest = { ...prev };
      delete rest[key];
      return rest;
    });

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    if (!topic) e.topic = "Choose what your message is about.";
    if (name.trim().length < 2) e.name = "Enter your name.";
    if (!phone.trim() && !email.trim()) e.phone = "Enter a phone number or an email address so we can reply.";
    if (phone.trim() && !isGhanaPhone(phone)) e.phone = phoneError;
    if (email.trim() && !isEmail(email)) e.email = "Enter an email address like name@example.com.";
    if (message.trim().length < 10) e.message = "Write a short message, at least a sentence.";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setAttempt((n) => n + 1);
      return;
    }
    setSending(true);
    setSendError("");
    const res = await submitForm(isReport(topic) ? "complaint" : "contact", {
      topic,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      relatedReference: reference.trim(),
      message: message.trim(),
    });
    setSending(false);
    if (res.ok) {
      setResult({ reference: res.reference, preview: res.preview });
      requestAnimationFrame(() => headingRef.current?.focus());
    } else setSendError(res.message);
  };

  if (result) {
    return (
      <div className="form-shell">
        <div className="done-panel">
          <div className="done-icon">
            <Check size={30} strokeWidth={2.5} aria-hidden />
          </div>
          <h2 ref={headingRef} tabIndex={-1}>
            {result.preview ? "Message ready" : isReport(topic) ? "Report received" : "Message sent"}
          </h2>
          <p className="muted">Your reference number is</p>
          <p className="reference">{result.reference}</p>
          {result.preview && (
            <div className="callout callout--gold">
              <TriangleAlert size={20} aria-hidden />
              <p>
                <strong>Preview only: nothing was sent</strong>
                This site isn&apos;t connected to Netra Home Care&apos;s system yet, so your message
                stayed in your browser and the reference above is only an example.
              </p>
            </div>
          )}
          <p className="muted" style={{ maxWidth: "34rem", margin: "0 auto" }}>
            {isReport(topic)
              ? "Your report is assigned to a staff member, and you'll get updates as it's looked into. Serious safety concerns are escalated straight away."
              : "A member of the team will get back to you, usually within one business day."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-shell" noValidate onSubmit={onSubmit}>
      <ErrorSummary errors={errors} attempt={attempt} />
      <SelectField
        id="topic"
        label="What's it about?"
        options={TOPICS}
        value={topic}
        onChange={(v) => {
          setTopic(v);
          clear("topic");
        }}
        error={errors.topic}
      />
      {isReport(topic) && (
        <div className="callout callout--danger" style={{ marginBottom: "1.5rem" }}>
          <Phone size={20} aria-hidden />
          <p>
            <strong>If anyone is in immediate danger, call 112 now.</strong>
            Then use this form so Netra Home Care can follow up. Reports are only seen by authorised
            staff.
          </p>
        </div>
      )}
      <TextField id="name" label="Your name" value={name} onChange={(v) => { setName(v); clear("name"); }} error={errors.name} autoComplete="name" maxLength={100} />
      <div className="field-row">
        <TextField
          id="phone"
          type="tel"
          label="Phone number"
          optional={!!email.trim()}
          hint={phoneHint}
          value={phone}
          onChange={(v) => { setPhone(v); clear("phone"); }}
          error={errors.phone}
          autoComplete="tel"
          inputMode="tel"
          maxLength={20}
        />
        <TextField
          id="email"
          type="email"
          label="Email"
          optional
          hint="Add one if you'd rather get a reply by email."
          value={email}
          onChange={(v) => { setEmail(v); clear("email"); clear("phone"); }}
          error={errors.email}
          autoComplete="email"
          maxLength={120}
        />
      </div>
      <TextField
        id="reference"
        label="Request, application or booking reference"
        optional
        hint="For example, NHC-REQ-2026-000123"
        value={reference}
        onChange={setReference}
        maxLength={40}
        autoCapitalize="characters"
      />
      <TextArea
        id="message"
        label="Message"
        value={message}
        onChange={(v) => { setMessage(v); clear("message"); }}
        error={errors.message}
        rows={6}
        maxLength={3000}
      />
      {sendError && (
        <div className="callout callout--danger" role="alert" style={{ marginBottom: "1rem" }}>
          <TriangleAlert size={20} aria-hidden />
          <p>{sendError}</p>
        </div>
      )}
      <button type="submit" className="btn btn--primary" disabled={sending} aria-busy={sending || undefined}>
        {sending ? "Sending…" : isReport(topic) ? "Send report" : "Send message"}
      </button>
    </form>
  );
}
