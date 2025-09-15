/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: true,
  // Remove basePath and assetPrefix for GitHub Pages main branch deployment
  // GitHub Actions configure-pages will handle path configuration automatically
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig