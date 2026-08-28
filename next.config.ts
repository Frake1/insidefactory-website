import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: Boolean(basePath),
  images: {
    // Avoid /_next/image optimizer issues behind nginx subpath proxy
    unoptimized: Boolean(basePath),
  },
};

export default withNextIntl(nextConfig);
