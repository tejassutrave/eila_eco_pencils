/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/payment/create-order',
        destination: '/api/payment/create-order',
      },
      {
        source: '/api/v1/payment/verify',
        destination: '/api/payment/verify',
      },
      {
        source: '/api/v1/inquiry',
        destination: '/api/inquiry',
      },
    ];
  },
};

export default nextConfig;
