/**
 * Utility function to handle paths correctly in development and production
 */

// Apply basePath only for production export builds (GitHub Pages)
// Dev should always use '' even if NEXT_EXPORT is set in the environment
const isProd = process.env.NODE_ENV === 'production';
const isExportFlag = process.env.NEXT_EXPORT === 'true';
const basePath = isProd && isExportFlag ? '/resume_md2website' : '';

export function getPath(path: string): string {
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // In development, return path as-is. In production, add basePath
  return basePath + cleanPath;
}

export function getBasePath(): string {
  return basePath;
}

// For use in components that need to check environment
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = isProd;
export const isExport = isExportFlag;