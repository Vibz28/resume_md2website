// Replace the inline node -e command with a proper Bun script
import { copySync } from 'fs-extra';

try {
  copySync('out', 'docs', { overwrite: true });
  console.log('✓ Successfully copied build output to docs/');
} catch (error) {
  console.error('✗ Error copying build:', error);
  process.exit(1);
}
