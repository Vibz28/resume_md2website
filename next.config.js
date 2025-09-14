/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/resume_md2website',
  assetPrefix: '/resume_md2website',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig