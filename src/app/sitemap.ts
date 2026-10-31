import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Public marketing pages only. Sign-in pages and anything private stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/services/",
    ...services.map((s) => `/services/${s.slug}/`),
    "/request/",
    "/how-it-works/",
    "/safety-and-verification/",
    "/become-a-house-help/",
    "/become-a-house-help/apply/",
    "/faqs/",
    "/contact/",
    "/privacy/",
    "/terms/",
  ];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path === "/request/" ? 0.8 : 0.6,
  }));
}
