import type { NextConfig } from "next";

// Static export: every page is pre-rendered to plain HTML in `out/`,
// so the public site can be hosted on any static host.
// NEXT_PUBLIC_BASE_PATH is only set when the site lives in a subfolder,
// e.g. "/Netra-Home-care" on GitHub Pages. Leave it unset on a real domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
