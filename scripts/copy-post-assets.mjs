import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  // project root is one level up from scripts/ when executed via npm scripts
  const projectRoot = path.resolve(__dirname, '..');
  const postsDir = path.join(projectRoot, 'src', 'contents', 'blogs');
  const publicBlogsDir = path.join(projectRoot, 'public', 'blogs');

  copyDirectory(postsDir, publicBlogsDir);
  console.log('Copied post assets to public/blogs');
}

main();
