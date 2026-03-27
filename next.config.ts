import type { NextConfig } from "next";

const securityHeaders = [
  // Запрет встраивания сайта в iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Запрет угадывания MIME-типа браузером
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Политика реферера — только origin при переходе на другой домен
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Запрет доступа к камере, микрофону, геолокации
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Принудительный HTTPS (2 года, включая поддомены)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // Если добавите Sanity CDN — добавьте cdn.sanity.io в img-src
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-* требуется для Next.js
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
