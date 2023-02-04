/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'
  }
}

module.exports = nextConfig
