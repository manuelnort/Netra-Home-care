import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <p className="eyebrow">Page not found</p>
      <h1>This page doesn&apos;t exist</h1>
      <p className="lead">The link may be old, or the address may have a typo.</p>
      <div className="btn-row" style={{ marginTop: "1rem" }}>
        <Link href="/" className="btn btn--primary">
          Go to the home page
        </Link>
        <Link href="/contact/" className="btn btn--secondary">
          Contact us
        </Link>
      </div>
    </section>
  );
}
