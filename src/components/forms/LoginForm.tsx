"use client";

import Link from "next/link";
import { useState } from "react";
import { Info } from "lucide-react";
import { isEmail, isGhanaPhone } from "@/lib/forms";
import { ErrorSummary, TextField, type Errors } from "./fields";

/**
 * Sign-in form for the customer and house help accounts. Accounts live in the
 * staffing application, which isn't connected yet, so for now a valid
 * submission explains that instead of pretending to sign in. The password is
 * never stored or sent anywhere.
 */
export function LoginForm({ audience }: { audience: "customer" | "house-help" }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  const [notice, setNotice] = useState("");

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    const value = id.trim();
    if (!value) e.account = "Enter your phone number or email address.";
    else if (!isGhanaPhone(value) && !isEmail(value))
      e.account = "Enter a Ghana phone number or an email address like name@example.com.";
    if (!password) e.password = "Enter your password.";
    setErrors(e);
    setPassword("");
    if (Object.keys(e).length > 0) {
      setAttempt((n) => n + 1);
      setNotice("");
      return;
    }
    setNotice(
      audience === "customer"
        ? "Customer accounts open with the pilot launch. If you've sent a request, keep your reference number and a placement officer will contact you."
        : "House help accounts open with the pilot launch. If you've applied, keep your application reference and someone will contact you to set up your account.",
    );
  };

  return (
    <form className="form-shell" noValidate onSubmit={onSubmit}>
      <ErrorSummary errors={errors} attempt={attempt} />
      <TextField
        id="account"
        label="Phone number or email"
        value={id}
        onChange={setId}
        error={errors.account}
        autoComplete="username"
        maxLength={120}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="current-password"
        maxLength={200}
      />
      {notice && (
        <div className="callout" role="status" style={{ marginBottom: "1.25rem" }}>
          <Info size={20} aria-hidden />
          <p>
            <strong>Accounts aren&apos;t open yet</strong>
            {notice}
          </p>
        </div>
      )}
      <button type="submit" className="btn btn--primary" style={{ width: "100%" }}>
        Sign in
      </button>
      <p className="small muted" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
        Forgotten your password or can&apos;t get in? <Link href="/contact/">Contact us</Link>.
      </p>
    </form>
  );
}
