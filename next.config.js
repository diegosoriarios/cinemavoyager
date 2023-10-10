/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'flags.fmcdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
