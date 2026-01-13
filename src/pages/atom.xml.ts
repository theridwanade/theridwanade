import { getAllPosts } from '@/lib/post-utils';
import path from 'path';

export async function GET() {
  const baseUrl = 'https://theridwanade.me';
  const blogsDir = path.join(process.cwd(), 'src/contents/blogs');
  
  // Get all published blogs sorted by date
  const allBlogs = getAllPosts(blogsDir, false);
  const blogs = allBlogs
    .sort((a, b) => new Date(b.frontmatter?.date || 0).getTime() - new Date(a.frontmatter?.date || 0).getTime())
    .slice(0, 20); // Latest 20 posts

  const now = new Date().toISOString();

  // Build Atom feed
  let atom = '<?xml version="1.0" encoding="UTF-8"?>\n';
  atom += '<feed xmlns="http://www.w3.org/2005/Atom">\n';
  atom += '  <title>Ridwan Oyeniyi - Blog</title>\n';
  atom += `  <link href="${baseUrl}/blogs" rel="alternate" />\n`;
  atom += `  <link href="${baseUrl}/atom.xml" rel="self" />\n`;
  atom += '  <id>tag:theridwanade.me,2024:blog</id>\n';
  atom += `  <updated>${now}</updated>\n`;
  atom += '  <author>\n';
  atom += '    <name>Ridwan Oyeniyi</name>\n';
  atom += '    <email>ridwan@theridwanade.me</email>\n';
  atom += '  </author>\n';
  atom += '  <rights>Copyright © 2024-2026 Ridwan Oyeniyi. All rights reserved.</rights>\n';
  atom += '  <generator uri="https://astro.build/" version="5.16.7">Astro</generator>\n';

  // Add blog posts
  for (const blog of blogs) {
    const postUrl = `${baseUrl}/blogs/${blog.slug}`;
    const pubDate = blog.frontmatter?.date ? new Date(blog.frontmatter.date).toISOString() : now;
    const description = blog.frontmatter?.description || blog.content.substring(0, 200);

    atom += '  <entry>\n';
    atom += `    <title>${escapeXml(blog.frontmatter?.title || blog.slug)}</title>\n`;
    atom += `    <link href="${postUrl}" rel="alternate" />\n`;
    atom += `    <id>${postUrl}</id>\n`;
    atom += `    <published>${pubDate}</published>\n`;
    atom += `    <updated>${pubDate}</updated>\n`;
    atom += '    <author>\n';
    atom += '      <name>Ridwan Oyeniyi</name>\n';
    atom += '    </author>\n';
    atom += `    <summary>${escapeXml(description)}</summary>\n`;
    
    if (blog.frontmatter?.tags && blog.frontmatter.tags.length > 0) {
      const tags = Array.isArray(blog.frontmatter.tags) ? blog.frontmatter.tags : [blog.frontmatter.tags];
      for (const tag of tags) {
        atom += `    <category term="${escapeXml(tag)}" />\n`;
      }
    }
    
    atom += '  </entry>\n';
  }

  atom += '</feed>\n';

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=UTF-8',
      'Cache-Control': 'max-age=3600',
    },
  });
}

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}