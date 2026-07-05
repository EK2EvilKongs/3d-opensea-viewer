/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      /* ================= API (METADATA) ================= */
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },

      /* ================= VIEWER (IFRAME SAFE) ================= */
      {
        source: '/viewer/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src *",
              "script-src * 'unsafe-inline' 'unsafe-eval'",
              "style-src * 'unsafe-inline'",
              "img-src * data: blob: https:",
              "connect-src * blob: https:",
              "media-src * blob: https:",
              "worker-src * blob:",
              "frame-ancestors *",
            ].join('; '),
          },
        ],
      },

      /* ================= REST OF SITE ================= */
      {
        source: '/((?!api|viewer).*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https: data: blob:",
              "connect-src 'self' https: wss:",
              "font-src 'self'",
              "frame-ancestors *",
            ].join('; '),
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
