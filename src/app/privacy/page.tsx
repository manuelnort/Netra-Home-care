import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Netra Home Care collects, uses, protects and keeps personal information about households and house helps, and your rights under Ghana's Data Protection Act, 2012 (Act 843).",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      href="/privacy/"
      lead="What information Netra Home Care collects, why, who can see it, and the choices you have."
    >
      <h2>Who we are</h2>
      <p>
        Netra Home Care is a domestic staffing service based in Accra, Ghana. It connects households
        with screened domestic workers. In this policy, &quot;we&quot; means Netra Home Care and
        &quot;you&quot; means anyone who uses this website or our services, whether you&apos;re
        looking for help or applying to work.
      </p>
      <p>
        We handle personal data in line with Ghana&apos;s Data Protection Act, 2012 (Act 843).
      </p>

      <h2>What we collect</h2>
      <h3>If you&apos;re looking for help</h3>
      <ul>
        <li>Your name, phone number, email (if you give one) and how you&apos;d like to be contacted.</li>
        <li>
          Details of the help you need: the service, arrangement, general area, start date, working
          days and hours, duties, budget and anything else you choose to tell us.
        </li>
        <li>
          Your exact work address, but only once a placement is confirmed. Access to it is restricted.
        </li>
        <li>Records of your shortlists, bookings, agreements, payments, support requests and complaints.</li>
      </ul>
      <h3>If you&apos;re applying to work</h3>
      <ul>
        <li>
          Your contact details, the area you live in, languages, the work you can do, experience,
          training, availability and salary expectations.
        </li>
        <li>
          Identity documents and other documents your role needs, submitted through the secure upload
          in your account.
        </li>
        <li>
          Records of your verification: identity checks, references, background checks where lawful
          and consented to, interview and assessment outcomes, and approval decisions.
        </li>
      </ul>
      <h3>From everyone</h3>
      <ul>
        <li>Messages, reports and complaints you send us.</li>
        <li>Basic technical information needed to keep the website and accounts secure.</li>
      </ul>
      <p>We only ask for what we need to provide the service.</p>

      <h2>Why we use it</h2>
      <ul>
        <li>To review requests and match households with suitable approved workers.</li>
        <li>To verify applicants before they can be placed, and to review them over time.</li>
        <li>To arrange consultations, agreements, bookings and payments.</li>
        <li>To send notifications about your request, application, booking or report.</li>
        <li>To handle support requests, complaints and safety concerns.</li>
        <li>To keep accounts and records secure, and to meet our legal obligations.</li>
      </ul>

      <h2>Who can see it</h2>
      <p>
        Inside Netra Home Care, staff can only see the information their role needs. For example,
        verification staff don&apos;t automatically see payment records, and finance staff don&apos;t
        automatically see identity document images. Access to sensitive records is logged.
      </p>
      <p>
        Households see a limited professional profile for shortlisted candidates: an approved display
        name, skills, experience, availability, general work area and completed verification labels,
        plus a photo only if the worker has agreed. Legal names, ID numbers, ID images, home addresses
        and internal screening notes are never shown publicly. References are shared through a
        controlled process and with consent.
      </p>
      <p>
        We may share information with service providers who act for us, such as identity
        verification, payment, SMS and email providers, only for the service they provide. We share
        information with authorities when the law requires it. We don&apos;t sell personal
        information.
      </p>

      <h2>How we protect it</h2>
      <ul>
        <li>The whole site uses HTTPS.</li>
        <li>Identity documents are kept in private, encrypted storage, never in a public folder.</li>
        <li>Staff accounts with access to sensitive records use multi-factor authentication.</li>
        <li>Important actions on records are logged, and access is reviewed.</li>
        <li>We never store raw card details or Mobile Money PINs.</li>
        <li>
          Notifications contain as little personal information as possible. We don&apos;t send ID
          images or confidential customer details by ordinary SMS.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep personal information only as long as it&apos;s needed for the purpose it was collected
        for, or as long as the law requires. After that, it&apos;s deleted or anonymised under our
        retention schedule.
      </p>

      <h2>Your rights</h2>
      <p>Under the Data Protection Act, 2012 (Act 843), you can ask us to:</p>
      <ul>
        <li>Tell you what personal information we hold about you, and give you a copy.</li>
        <li>Correct information that&apos;s wrong or out of date.</li>
        <li>Delete information we no longer have a reason to keep.</li>
        <li>Stop using your information for a particular purpose, where the law allows.</li>
      </ul>
      <p>
        To make a request, <Link href="/contact/">contact us</Link>. You can also complain to Ghana&apos;s
        Data Protection Commission.
      </p>

      <h2>If something goes wrong</h2>
      <p>
        We have a documented procedure for security incidents. If a breach affects your information,
        we&apos;ll act quickly to contain it and tell you and the authorities as the law requires.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change this policy, we&apos;ll update the date at the top of this page. Significant
        changes will be shared with account holders directly.
      </p>
    </LegalPage>
  );
}
