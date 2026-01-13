import { getAllPosts } from '@/lib/post-utils';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const baseUrl = 'https://theridwanade.me';
  const blogsDir = path.join(process.cwd(), 'src/contents/blogs');
  const pagesDir = path.join(process.cwd(), 'src/contents/pages');
  const projectsDir = path.join(process.cwd(), 'src/contents/projects');
  const docsDir = path.join(process.cwd(), 'src/contents/docs');

  // Get all published blogs
  const blogs = getAllPosts(blogsDir, false);

  // Helper to get markdown files from a directory
  function getMarkdownFiles(dir: string): Array<{ path: string; date: string }> {
    const files: Array<{ path: string; date: string }> = [];
    
    function scanDir(currentDir: string) {
      try {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          
          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else if (entry.name.endsWith('.md')) {
            // Get file modification time
            const stats = fs.statSync(fullPath);
            const relativePath = path.relative(dir, fullPath).replace(/\\/g, '/');
            const slug = relativePath.replace(/index\.md$/, '').replace(/\.md$/, '').replace(/\/$/, '');
            
            files.push({
              path: slug,
              date: stats.mtime.toISOString().split('T')[0],
            });
          }
        }
      } catch (e) {
        // Directory doesn't exist
      }
    }
    
    scanDir(dir);
    return files;
  }

  const pages = getMarkdownFiles(pagesDir);
  const projects = getMarkdownFiles(projectsDir);
  const docs = getMarkdownFiles(docsDir);

  // Build XML sitemap
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add homepage with highest priority
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';

  // Add blog posts with high priority
  for (const blog of blogs) {
    const date = blog.frontmatter?.date ? new Date(blog.frontmatter.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blogs/${blog.slug}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    xml += '  </url>\n';
  }

  // Add main blog listing page
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/blogs</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.9</priority>\n';
  xml += '  </url>\n';

  // Add regular pages
  for (const page of pages) {
    const pathName = page.path === '' ? 'pages' : `${page.path}`;
    if (!['404', 'docs', 'posts', 'home'].includes(pathName)) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${pathName}</loc>\n`;
      xml += `    <lastmod>${page.date}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }
  }

  // Add projects
  for (const project of projects) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/projects/${project.path}</loc>\n`;
    xml += `    <lastmod>${project.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    xml += '  </url>\n';
  }

  // Add docs
  for (const doc of docs) {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/docs/${doc.path}</loc>\n`;
    xml += `    <lastmod>${doc.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.6</priority>\n';
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
}
