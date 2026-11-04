/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["react-simple-maps"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'flags.fmcdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'flags.fmcdn.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
