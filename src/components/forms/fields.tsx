"use client";

import { useEffect, useRef } from "react";
import { CircleAlert } from "lucide-react";

export type Errors = Record<string, string>;

function describedBy(id: string, hint?: React.ReactNode, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p className="error" id={`${id}-error`}>
      <CircleAlert size={16} aria-hidden />
      <span>{error}</span>
    </p>
  );
}

function Label({ optional, children }: { optional?: boolean; children: React.ReactNode }) {
  return (
    <>
      {children}
      {optional && <span className="optional"> (optional)</span>}
    </>
  );
}

type BaseProps = {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  optional?: boolean;
};

export function TextField({
  id,
  label,
  hint,
  error,
  optional,
  value,
  onChange,
  type = "text",
  ...rest
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "id">) {
  return (
    <div className="field">
      <label htmlFor={id}>
        <Label optional={optional}>{label}</Label>
      </label>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
        {...rest}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function TextArea({
  id,
  label,
  hint,
  error,
  optional,
  value,
  onChange,
  ...rest
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "id">) {
  return (
    <div className="field">
      <label htmlFor={id}>
        <Label optional={optional}>{label}</Label>
      </label>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      <textarea
        id={id}
        name={id}
        className="textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
        {...rest}
      />
      <ErrorText id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  optional,
  value,
  onChange,
  options,
  placeholder = "Choose one",
}: BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        <Label optional={optional}>{label}</Label>
      </label>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      <select
        id={id}
        name={id}
        className="select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={optional ? undefined : true}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ErrorText id={id} error={error} />
    </div>
  );
}

export type ChoiceOption = {
  value: string;
  title: string;
  desc?: string;
  icon?: React.ReactNode;
};

/**
 * Radio or checkbox options shown as tiles. The first input carries the
 * group's id so the error summary can link to it.
 */
export function ChoiceGroup({
  id,
  label,
  hint,
  error,
  optional,
  type,
  options,
  value,
  onChange,
  compact,
}: BaseProps & {
  type: "radio" | "checkbox";
  options: ChoiceOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  compact?: boolean;
}) {
  const selected = Array.isArray(value) ? value : [value];
  const toggle = (v: string) => {
    if (type === "radio") return onChange(v);
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  };
  return (
    <fieldset
      className="field"
      aria-describedby={describedBy(id, hint, error)}
      aria-required={type === "radio" && !optional ? true : undefined}
    >
      <legend>
        <Label optional={optional}>{label}</Label>
      </legend>
      {hint && (
        <span className="hint" id={`${id}-hint`}>
          {hint}
        </span>
      )}
      <div className={`choices${compact ? " choices--compact" : ""}`}>
        {options.map((o, i) => (
          <label className="choice" key={o.value}>
            <input
              id={i === 0 ? id : undefined}
              type={type}
              name={id}
              value={o.value}
              checked={selected.includes(o.value)}
              onChange={() => toggle(o.value)}
              aria-invalid={error ? true : undefined}
            />
            <span className="choice-text">
              <span className="choice-title">{o.title}</span>
              {o.desc && <span className="choice-desc">{o.desc}</span>}
            </span>
            {o.icon && <span className="choice-icon">{o.icon}</span>}
          </label>
        ))}
      </div>
      <ErrorText id={id} error={error} />
    </fieldset>
  );
}

export function Checkbox({
  id,
  label,
  error,
  checked,
  onChange,
}: {
  id: string;
  label: React.ReactNode;
  error?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="field" style={{ marginBottom: "1rem" }}>
      <label className="choice" htmlFor={id}>
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <span className="choice-text">
          <span>{label}</span>
        </span>
      </label>
      <ErrorText id={id} error={error} />
    </div>
  );
}

/**
 * Lists every problem on the step and links to each field. It takes focus
 * only when `attempt` changes (a failed Continue), never while typing.
 */
export function ErrorSummary({ errors, attempt }: { errors: Errors; attempt: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const keys = Object.keys(errors);
  useEffect(() => {
    if (attempt === 0 || !ref.current) return;
    ref.current.scrollIntoView({ block: "start" });
    ref.current.focus({ preventScroll: true });
  }, [attempt]);
  if (keys.length === 0) return null;
  return (
    <div className="callout callout--danger error-summary" role="alert" tabIndex={-1} ref={ref}>
      <CircleAlert size={20} aria-hidden />
      <div>
        <p>
          <strong>
            {keys.length === 1 ? "There's 1 thing to fix" : `There are ${keys.length} things to fix`}
          </strong>
        </p>
        <ul>
          {keys.map((k) => (
            <li key={k}>
              <a
                href={`#${k}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(k);
                  el?.focus();
                  el?.scrollIntoView({ block: "center" });
                }}
              >
                {errors[k]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Progress({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="progress">
      <p className="progress-text">
        <span>
          Step {current + 1} of {steps.length}
        </span>
        <strong>{steps[current]}</strong>
      </p>
      <ol className="progress-bar" aria-hidden>
        {steps.map((s, i) => (
          <li key={s} className={i < current ? "done" : i === current ? "current" : undefined} />
        ))}
      </ol>
    </div>
  );
}

/** One section of a form's review step, with an Edit button that jumps back. */
export function ReviewBlock({
  title,
  rows,
  onEdit,
}: {
  title: string;
  rows: [string, string][];
  onEdit: () => void;
}) {
  const shown = rows.filter(([, v]) => v && v.trim() !== "");
  return (
    <section className="review-block" aria-label={title}>
      <div className="review-head">
        <h3>{title}</h3>
        <button type="button" className="btn btn--ghost btn--sm" onClick={onEdit}>
          Edit<span className="visually-hidden"> {title.toLowerCase()}</span>
        </button>
      </div>
      <dl>
        {shown.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
