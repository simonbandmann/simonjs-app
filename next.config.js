/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.CMS_BASE_HOSTNAME,
            },
        ],
    },
}

module.exports = nextConfig
