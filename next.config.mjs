/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,

    async rewrites() {
        const development = process.env.NEXT_PUBLIC_ENV === "development";
        const BASEURL = development
            ? process.env.NEXT_PUBLIC_DEV_URL
            : process.env.NEXT_PUBLIC_PROD_URL;

        return [
            {
                source: "/api/:path*/",
                destination: `${BASEURL}/api/:path*/`, // Proxy to the appropriate URL based on the environment
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "github.com",
                pathname: "/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
                pathname: "/media/Response-Image/**",
            },
        ],
    },
};

export default nextConfig;
