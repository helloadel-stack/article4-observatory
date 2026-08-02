import type { NextConfig } from "next";

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
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // gumroad.js bootstraps assets.gumroad.com/js/gumroad-bundle.js
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co",
              "style-src 'self' 'unsafe-inline' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com",
              "img-src 'self' data: https:",
              "font-src 'self' data: https://gumroad.com https://*.gumroad.com https://assets.gumroad.com",
              "connect-src 'self' https://gumroad.com https://*.gumroad.com https://assets.gumroad.com https://gum.co https://waqfledger.tech",
              // Overlay iframe + checkout frames
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
