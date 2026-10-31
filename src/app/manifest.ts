import type { MetadataRoute } from "next";
import { asset } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Netra Home Care",
    short_name: "Netra",
    description: "Screened house helps for households in Accra.",
    start_url: asset("/"),
    display: "standalone",
    theme_color: "#0F5C4D",
    background_color: "#F1F1F0",
    icons: [
    { src: asset("/icon-192.png"), sizes: "192x192", type: "image/png" },
    { src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" },
    { src: asset("/maskable-512.png"), sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
