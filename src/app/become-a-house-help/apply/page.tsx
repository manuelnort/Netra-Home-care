import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { PreviewNotice } from "@/components/forms/PreviewNotice";

export const metadata: Metadata = {
  title: "Apply to be a house help",
  description:
    "Start your application to work with Netra Home Care as a house help, nanny, cook, cleaner or elderly care assistant.",
  alternates: { canonical: "/become-a-house-help/apply/" },
};

export default function ApplyPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { href: "/become-a-house-help/", label: "Become a house help" },
          { href: "/become-a-house-help/apply/", label: "Apply" },
        ]}
        title="Apply to be a house help"
        lead="Four short steps. Have your phone with you. You won't need your ID until later."
      />
      <section className="section section--tight section--band">
        <div className="container narrow">
          <PreviewNotice />
          <ApplicationForm />
        </div>
      </section>
    </>
  );
}
