import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { site, telHref } from "@/lib/site";
import { LogoLockup } from "./LogoLockup";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  const { phone, email } = site.contact;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Netra Home Care, home">
              <LogoLockup height={24} />
            </Link>
            <p>Screened house helps for households in {site.serviceArea}, matched by people.</p>
            {(phone || email) && (
              <p>
                {phone && <a href={telHref(phone)}>{phone}</a>}
                {phone && email && <br />}
                {email && <a href={`mailto:${email}`}>{email}</a>}
              </p>
            )}
          </div>

          <div>
            <h2>Households</h2>
            <ul>
              <li><Link href="/request/">Request a house help</Link></li>
              <li><Link href="/services/">Services</Link></li>
              <li><Link href="/how-it-works/">How it works</Link></li>
              <li><Link href="/login/">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <h2>House helps</h2>
            <ul>
              <li><Link href="/become-a-house-help/">Become a house help</Link></li>
              <li><Link href="/become-a-house-help/apply/">Apply now</Link></li>
              <li><Link href="/house-help-login/">Sign in</Link></li>
            </ul>
          </div>

          <div>
            <h2>Help</h2>
            <ul>
              <li><Link href="/faqs/">FAQs</Link></li>
              <li><Link href="/safety-and-verification/">Safety and verification</Link></li>
              <li><Link href="/contact/">Contact us</Link></li>
              <li><Link href="/contact/?topic=safety">Report a concern</Link></li>
            </ul>
          </div>

          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/privacy/">Privacy</Link></li>
              <li><Link href="/terms/">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-mark">
          <BrandMark />
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Netra Home Care. All rights reserved.</p>
          <div className="footer-pills">
            <span>
              <MapPin size={14} aria-hidden /> Accra, Ghana
            </span>
            <Link href="/safety-and-verification/">
              <ShieldCheck size={14} aria-hidden /> Screened house helps
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
