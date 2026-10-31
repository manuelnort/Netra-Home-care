import type { MetadataRoute } from "next";
import { absoluteUrl, basePath } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: [`${basePath}/login/`, `${basePath}/house-help-login/`] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
