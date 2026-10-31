import { TriangleAlert } from "lucide-react";
import { site } from "@/lib/site";
import { PageHeader } from "./PageHeader";

export function LegalPage({
  title,
  href,
  lead,
  children,
}: {
  title: string;
  href: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader crumbs={[{ href, label: title }]} title={title} lead={lead}>
        <p className="small muted" style={{ marginTop: "1rem", marginBottom: 0 }}>
          Last updated {site.legalUpdated}
        </p>
      </PageHeader>
      <section className="section section--tight section--band">
        <div className="container">
          {site.legalDraft && (
            <div className="callout callout--gold" style={{ marginBottom: "2rem", maxWidth: "44rem" }}>
              <TriangleAlert size={20} aria-hidden />
              <p>
                <strong>Draft for legal review</strong>
                This page is a working draft. It will be reviewed by a Ghanaian lawyer before Netra
                Home Care opens to the public.
              </p>
            </div>
          )}
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
