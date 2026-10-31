import type { NextConfig } from "next";

// Static export: every page is pre-rendered to plain HTML in `out/`,
// so the public site can be hosted on any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
