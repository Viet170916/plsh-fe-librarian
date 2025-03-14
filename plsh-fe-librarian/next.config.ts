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
        ignoreBuildErrors: false
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
            rules:{

            }
        },
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
            }, {
                protocol: "https",
                hostname: "randomuser.me",
            },
        ],
    },
};
export default nextConfig;
