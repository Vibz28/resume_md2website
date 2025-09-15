/**
 * Utility function to handle paths correctly in development and production
 */

// In development, basePath is empty. In production/export, it's '/resume_md2website'
const basePath = process.env.NODE_ENV === 'production' || process.env.NEXT_EXPORT === 'true' 
  ? '/resume_md2website' 
  : '';

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
export const isProduction = process.env.NODE_ENV === 'production';
export const isExport = process.env.NEXT_EXPORT === 'true';