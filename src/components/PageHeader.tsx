import Link from "next/link";
import { photos } from "@/lib/photos";

type Crumb = { href: string; label: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  crumbs,
  photo,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: Crumb[];
  /** Key in src/lib/photos.ts, shown beside the heading on wide screens. */
  photo?: string;
  children?: React.ReactNode;
}) {
  const img = photo ? photos[photo] : undefined;
  return (
    <header className={`page-header${img ? " page-header--photo" : ""}`}>
      <div className="container">
        <div>
          {crumbs && (
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li><Link href="/">Home</Link></li>
                {crumbs.map((c) => (
                  <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
                ))}
              </ol>
            </nav>
          )}
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {img && (
          <figure className="page-photo">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized */}
            <img src={img.src} alt={img.alt} fetchPriority="high" />
          </figure>
        )}
      </div>
    </header>
  );
}
