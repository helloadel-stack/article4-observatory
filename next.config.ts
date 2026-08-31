import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const scriptSrc = isProd
  ? "script-src 'self' 'unsafe-inline' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co"
  : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co";

const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://gumroad.com https://*.gumroad.com https://assets.gumroad.com",
              "connect-src 'self' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co https://waqfledger.tech",
              "frame-src 'self' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
} satisfies NextConfig;

export default nextConfig;
