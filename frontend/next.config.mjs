/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*/',
          destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*/`,
        },
        // {
        //   source: "/api/:path*/",
        //   destination: `https://steep-thunder-production-0a14.up.railway.app/:path*/`,
        // },
      ];
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'github.com',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: '127.0.0.1',
          port: '8000',
          pathname: '/media/Response-Image/**',
        },
      ],
    },
};

export default nextConfig;
