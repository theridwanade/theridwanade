import { getAllPosts } from '@/lib/post-utils';
import path from 'path';

export async function GET() {
  const baseUrl = 'https://theridwanade.me';
  const blogsDir = path.join(process.cwd(), 'src/contents/blogs');
  const snippetsDir = path.join(process.cwd(), 'src/contents/snippets');
  
  // Get all published blogs and snippets sorted by date
  const allBlogs = getAllPosts(blogsDir, false);
  const allSnippets = getAllPosts(snippetsDir, false);
  
  // Combine and sort all content
  const allContent = [...allBlogs, ...allSnippets]
    .sort((a, b) => new Date(b.frontmatter?.date || 0).getTime() - new Date(a.frontmatter?.date || 0).getTime())
    .slice(0, 20); // Latest 20 items

  const now = new Date().toISOString();

  // Build Atom feed
  let atom = '<?xml version="1.0" encoding="UTF-8"?>\n';
  atom += '<feed xmlns="http://www.w3.org/2005/Atom">\n';
  atom += '  <title>Ridwan Oyeniyi - Blog & Snippets</title>\n';
  atom += `  <link href="${baseUrl}" rel="alternate" />\n`;
  atom += `  <link href="${baseUrl}/atom.xml" rel="self" />\n`;
  atom += '  <id>tag:theridwanade.me,2024:content</id>\n';
  atom += `  <updated>${now}</updated>\n`;
  atom += '  <author>\n';
  atom += '    <name>Ridwan Oyeniyi</name>\n';
  atom += '    <email>ridwan@theridwanade.me</email>\n';
  atom += '  </author>\n';
  atom += '  <rights>Copyright © 2024-2026 Ridwan Oyeniyi. All rights reserved.</rights>\n';
  atom += '  <generator uri="https://astro.build/" version="5.16.7">Astro</generator>\n';

  // Add content items
  for (const item of allContent) {
    // Determine if this is a blog or snippet
    const isBlog = allBlogs.some(b => b.slug === item.slug && b.postId === item.postId);
    const contentType = isBlog ? 'blogs' : 'snippets';
    const postUrl = `${baseUrl}/${contentType}/${item.slug}`;
    const pubDate = item.frontmatter?.date ? new Date(item.frontmatter.date).toISOString() : now;
    const description = item.frontmatter?.description || item.content.substring(0, 200);

    atom += '  <entry>\n';
    atom += `    <title>${escapeXml(item.frontmatter?.title || item.slug)}</title>\n`;
    atom += `    <link href="${postUrl}" rel="alternate" />\n`;
    atom += `    <id>${postUrl}</id>\n`;
    atom += `    <published>${pubDate}</published>\n`;
    atom += `    <updated>${pubDate}</updated>\n`;
    atom += '    <author>\n';
    atom += '      <name>Ridwan Oyeniyi</name>\n';
    atom += '    </author>\n';
    atom += `    <summary>${escapeXml(description)}</summary>\n`;
    
    if (item.frontmatter?.tags && item.frontmatter.tags.length > 0) {
      const tags = Array.isArray(item.frontmatter.tags) ? item.frontmatter.tags : [item.frontmatter.tags];
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