import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    trailingSlash: false,
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false
    },
    experimental: {
        middlewarePrefetch: "strict",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME ?? "i.redd.it",
            },
            {
                protocol: "https",
                hostname: "i.redd.it",
            }, {
                protocol: "https",
                hostname: "via.placeholder.com",
            },
        ],
    },
};
export default nextConfig;
