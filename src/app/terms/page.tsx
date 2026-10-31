import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms for using Netra Home Care: requests, shortlists, fees, cancellations, applications, conduct, complaints and disputes.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      href="/terms/"
      lead="The ground rules for households and house helps who use Netra Home Care."
    >
      <h2>About these terms</h2>
      <p>
        These terms apply to this website and to Netra Home Care&apos;s request, matching and
        placement services. Each placement also has its own written agreement. If that agreement says
        something different from these terms, the agreement applies to that placement.
      </p>

      <h2>What Netra Home Care does</h2>
      <p>
        Netra Home Care reviews requests from households, screens and approves domestic workers, and
        matches the two through a managed process with human review. The written agreement for each
        placement sets out the working relationship, including who the employer is and who pays the
        salary.
      </p>

      <h2>Requests</h2>
      <ul>
        <li>Sending a request is free.</li>
        <li>Please give accurate information. It&apos;s used to find a suitable match.</li>
        <li>
          Sending a request doesn&apos;t guarantee a placement. Matching depends on approved
          candidates being available for your needs and area.
        </li>
      </ul>

      <h2>Shortlists and selection</h2>
      <ul>
        <li>You choose from a shortlist of approved candidates reviewed by staff.</li>
        <li>Availability is confirmed, and you can talk with the candidate, before any booking.</li>
        <li>
          Candidate information is shared with you only to make a hiring decision. Please don&apos;t
          share it with anyone else.
        </li>
      </ul>

      <h2>Fees and payment</h2>
      <ul>
        <li>
          The placement fee is separate from the worker&apos;s salary and from any recurring managed
          service charge.
        </li>
        <li>You&apos;ll see the fee and what it covers in your placement summary before you pay.</li>
        <li>Your agreement states the salary, how it&apos;s paid and who is responsible for paying it.</li>
      </ul>

      <h2>Cancellations, refunds and replacements</h2>
      <p>
        Cancellation conditions, refund rules and replacement terms are given to you in writing before
        you pay. Replacement terms cover whether you&apos;re eligible, how long cover lasts, any fee,
        expected matching time and what happens if no replacement is available. They also take into
        account cases where a worker leaves because of unsafe conditions, mistreatment or a serious
        breach of the agreed terms.
      </p>

      <h2>Applying to work</h2>
      <ul>
        <li>Applicants must give accurate information and genuine documents.</li>
        <li>
          Nobody can be matched with a household until they&apos;ve completed the screening their role
          needs and been approved by authorised staff.
        </li>
        <li>Approval isn&apos;t guaranteed, and approved profiles are reviewed over time.</li>
        <li>
          A profile may be suspended while a serious concern is looked into, and must be approved again
          before returning to placements.
        </li>
      </ul>

      <h2>Conduct and safety</h2>
      <p>
        Households and house helps are expected to treat each other with respect and to keep to the
        agreed duties, hours, rest periods and terms. Either side can report a concern at any time.
        If anyone is in immediate danger, call 112.
      </p>

      <h2>Complaints and disputes</h2>
      <p>
        Every complaint gets a reference number and is assigned to a staff member, who investigates,
        records the actions taken and tells you the outcome. Serious safety concerns are escalated
        straight away. To raise one, <Link href="/contact/?topic=complaint">contact us</Link>.
      </p>

      <h2>Your information</h2>
      <p>
        How we handle personal information is explained in the{" "}
        <Link href="/privacy/">privacy policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Ghana.</p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top of this page shows when they last changed.
        Changes don&apos;t affect placement agreements that are already signed.
      </p>
    </LegalPage>
  );
}
