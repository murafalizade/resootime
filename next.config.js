/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    reactStrictMode: true,
    output: 'standalone',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        domains: ['rmusayevr.pythonanywhere.com'],
    },
    productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
