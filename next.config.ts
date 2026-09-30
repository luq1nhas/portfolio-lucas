import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // CSS (Tailwind, ~8 KB) embutido no HTML: sem requisição bloqueando a primeira pintura.
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
