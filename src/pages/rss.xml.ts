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

  // Build RSS feed
  let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
  rss += '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  rss += '  <channel>\n';
  rss += '    <title>Ridwan Oyeniyi - Blog & Snippets</title>\n';
  rss += `    <link>${baseUrl}</link>\n`;
  rss += '    <description>Articles, thoughts, and quick snippets on software development, design, and technology</description>\n`;
  rss += `    <language>en-us</language>\n`;
  rss += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  rss += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rss += `    <managingEditor>ridwan@theridwanade.me</managingEditor>\n`;
  rss += `    <webMaster>ridwan@theridwanade.me</webMaster>\n`;

  // Add content items
  for (const item of allContent) {
    // Determine if this is a blog or snippet based on whether it came from allBlogs
    const isBlog = allBlogs.some(b => b.slug === item.slug && b.postId === item.postId);
    const contentType = isBlog ? 'blogs' : 'snippets';
    const postUrl = `${baseUrl}/${contentType}/${item.slug}`;
    const pubDate = item.frontmatter?.date ? new Date(item.frontmatter.date).toUTCString() : new Date().toUTCString();
    const description = item.frontmatter?.description || item.content.substring(0, 200);

    rss += '    <item>\n';
    rss += `      <title>${escapeXml(item.frontmatter?.title || item.slug)}</title>\n`;
    rss += `      <link>${postUrl}</link>\n`;
    rss += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    rss += `      <pubDate>${pubDate}</pubDate>\n`;
    rss += `      <description>${escapeXml(description)}</description>\n`;
    
    if (item.frontmatter?.tags && item.frontmatter.tags.length > 0) {
      const tags = Array.isArray(item.frontmatter.tags) ? item.frontmatter.tags : [item.frontmatter.tags];
      for (const tag of tags) {
        rss += `      <category>${escapeXml(tag)}</category>\n`;
      }
    }
    
    rss += '    </item>\n';
  }

  rss += '  </channel>\n';
  rss += '</rss>\n';

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
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
