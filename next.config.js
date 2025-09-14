/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isExport = process.env.NEXT_EXPORT === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: true,
  basePath: (isProd || isExport) ? '/resume_md2website' : '',
  assetPrefix: (isProd || isExport) ? '/resume_md2website' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig