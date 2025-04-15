import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
    // webpack: (config, {isServer}) => {
    //     if (isServer) {
    //         config.externals = [...config.externals, "canvas"];
    //     }
    //     return config;
    // },
    // swcMinify: true,
    trailingSlash: false,
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: false,
    },
    modularizeImports: {
        "@mui/material": {
            transform: "@mui/material/{{member}}",
        },
        "lodash": {
            transform: "lodash/{{member}}",
        },
    },
    experimental: {
        turbo: {
            rules: {},
        },
        middlewarePrefetch: "strict",
    },
    images: {
        remotePatterns: [
            // {
            //     protocol: "https",
            //     hostname: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME ?? "https://book-hive-api.space/static/v1",
            // },
            // {
            // 				protocol: "https",
            // 				hostname: "https://book-hive-api.space/static/v1",
            // }, {
            // 				protocol: "https",
            // 				hostname: "book-hive-api.space",
            // }, {
            // 				protocol: "https",
            // 				hostname: "via.placeholder.com",
            // }, {
            // 				protocol: "https",
            // 				hostname: "randomuser.me",
            // }, {
            // 				protocol: "https",
            // 				hostname: "books.google.com",
            // }, {
            // 				protocol: "http",
            // 				hostname: "books.google.com",
            // },
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
    env: {
        NEXT_PUBLIC_SERVER_API_URL: process.env.NEXT_PUBLIC_SERVER_API_URL,
        NEXT_PUBLIC_STATIC_FILE_SERVER_API_URL: process.env.NEXT_PUBLIC_STATIC_FILE_SERVER_API_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXT_PUBLIC_IMAGE_HOST_NAME: process.env.NEXT_PUBLIC_IMAGE_HOST_NAME,
    },
};
export default nextConfig;
