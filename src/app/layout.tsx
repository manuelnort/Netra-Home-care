import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

// Inter's optical-size axis gives large headings the tighter "display" cut.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Netra Home Care | Screened house helps in Accra",
    template: "%s | Netra Home Care",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_GH",
    title: "Netra Home Care | Screened house helps in Accra",
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Netra Home Care: reliable house helps, greater peace of mind" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f1f1f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={inter.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            slogan: site.tagline,
            description: site.description,
            areaServed: { "@type": "City", name: "Accra" },
            ...(site.contact.email ? { email: site.contact.email } : {}),
            ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
          }}
        />
      </body>
    </html>
  );
}
