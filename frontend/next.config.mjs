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
};

export default nextConfig;
