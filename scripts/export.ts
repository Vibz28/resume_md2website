// Export script for Bun runtime
import { execSync } from 'child_process';
import { cpSync, existsSync, rmSync } from 'fs';

const BUN_PATH = 'C:\\Users\\Vibhor Janey\\.bun\\bin\\bun.exe';

try {
  console.log('Building with static export...');
  
  // Set environment variable and build
  process.env.NEXT_EXPORT = 'true';
  execSync(`"${BUN_PATH}" x --bun next build`, { stdio: 'inherit' });
  
  console.log('Copying build output to docs/...');
  
  // Remove existing docs directory and recreate
  if (existsSync('docs')) {
    rmSync('docs', { recursive: true, force: true });
  }
  
  cpSync('out', 'docs', { recursive: true });
  
  console.log('✓ Successfully exported static site to docs/');
} catch (error) {
  console.error('✗ Error during export:', error);
  process.exit(1);
}
