import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { RequestForm } from "@/components/forms/RequestForm";
import { FormLoading } from "@/components/forms/FormLoading";
import { PreviewNotice } from "@/components/forms/PreviewNotice";
import { photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Request a house help",
  description:
    "Tell Netra Home Care what help your household needs. A free, guided request for a house help, nanny, cook, cleaner or elderly care assistant in Accra.",
  alternates: { canonical: "/request/" },
};

export default function RequestPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/request/", label: "Request a house help" }]}
        title="Request a house help"
        lead="Five short steps, about five minutes. Sending a request is free, and you don't need an account."
      />
      <section className="section section--tight section--band">
        <div className="container split split--reverse">
          <div>
            <PreviewNotice />
            <Suspense fallback={<FormLoading />}>
              <RequestForm />
            </Suspense>
          </div>
          <aside className="sticky">
            <figure className="service-photo">
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
              <img src={photos["page-request"].src} alt={photos["page-request"].alt} loading="lazy" />
            </figure>
            <div className="aside-card">
              <h2>After you send it</h2>
              <ol className="small" style={{ paddingLeft: "1.1rem", margin: 0 }}>
                <li>You get a reference number straight away.</li>
                <li>A placement officer reviews your request and calls if anything is unclear.</li>
                <li>Staff match approved house helps and send you a shortlist.</li>
                <li>You choose, talk to the candidate, then agree terms in writing.</li>
              </ol>
            </div>
            <div className="aside-card">
              <h2>What this costs</h2>
              <p>
                Nothing to send a request. A placement fee only applies once you&apos;ve chosen a
                candidate, and you&apos;ll see it before paying.{" "}
                <Link href="/faqs/#fees">Fees and payment</Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
