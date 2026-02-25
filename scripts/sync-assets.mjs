import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

async function syncAssets() {
  const root = process.cwd();
  const source = resolve(root, 'assets');
  const target = resolve(root, 'public', 'assets');

  await mkdir(resolve(root, 'public'), { recursive: true });
  await cp(source, target, { recursive: true });

  process.stdout.write('Synced assets/ to public/assets/\\n');
}

syncAssets().catch((error) => {
  process.stderr.write(`Failed to sync assets: ${error.message}\\n`);
  process.exit(1);
});
