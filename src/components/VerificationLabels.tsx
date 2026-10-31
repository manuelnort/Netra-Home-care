import { BadgeCheck } from "lucide-react";

export const verificationLabels = [
  { label: "Phone Verified", meaning: "The applicant completed phone verification." },
  {
    label: "Identity Verified",
    meaning: "Their identity was checked under Netra Home Care's documented procedure.",
  },
  {
    label: "References Checked",
    meaning: "The required employment references were contacted and reviewed.",
  },
  {
    label: "Qualifications Verified",
    meaning: "Relevant qualifications they submitted were checked.",
  },
  {
    label: "Background Check Completed",
    meaning: "The specified background check process was completed.",
  },
  {
    label: "Netra Approved",
    meaning: "They passed the full onboarding process for the service they're offered for.",
  },
];

export function VerificationLabels() {
  return (
    <dl className="labels">
      {verificationLabels.map((item, i) => {
        const last = i === verificationLabels.length - 1;
        return (
          <div key={item.label}>
            <dt>
              <span className={`badge${last ? " badge--gold" : ""}`}>
                <BadgeCheck size={18} aria-hidden />
                {item.label}
              </span>
            </dt>
            <dd>{item.meaning}</dd>
          </div>
        );
      })}
    </dl>
  );
}
