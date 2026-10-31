"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { mainNav } from "./nav";

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(href));
}

/** Floating "island" menu. On small screens it opens a panel just below. */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  // The menu remembers which page it was opened on, so it closes by itself
  // after navigating. Escape closes it too.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenOn(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="island">
        <Link href="/" className="island-logo" aria-label="Netra Home Care, home">
          <BrandMark />
        </Link>
        <span className="island-name" aria-hidden>
          Netra Home Care
        </span>

        <nav className="island-nav" aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login/" aria-current={pathname.startsWith("/login") ? "page" : undefined}>
                Sign in
              </Link>
            </li>
          </ul>
        </nav>

        <Link href="/request/" className="island-cta">
          Request a house help
          <span className="arrow">
            <ArrowUpRight size={16} aria-hidden />
          </span>
        </Link>

        <span className="island-mobile-spacer" />
        <button
          type="button"
          className="island-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="island-panel" aria-label="Main">
          <ul>
            {[{ href: "/", label: "Home" }, ...mainNav, { href: "/about/", label: "About us" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={(item.href === "/" ? pathname === "/" : isCurrent(pathname, item.href)) ? "page" : undefined}
                >
                  {item.label}
                  <ArrowUpRight size={18} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="btn-row">
            <Link href="/request/" className="btn btn--accent">
              Request a house help
            </Link>
            <Link href="/login/" className="btn btn--secondary">
              Sign in
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
