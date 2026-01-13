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

  // Build RSS feed
  let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
  rss += '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  rss += '  <channel>\n';
  rss += '    <title>Ridwan Oyeniyi - Blog</title>\n';
  rss += `    <link>${baseUrl}/blogs</link>\n`;
  rss += '    <description>Articles and thoughts on software development, design, and technology</description>\n';
  rss += `    <language>en-us</language>\n`;
  rss += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  rss += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  rss += `    <managingEditor>ridwan@theridwanade.me</managingEditor>\n`;
  rss += `    <webMaster>ridwan@theridwanade.me</webMaster>\n`;

  // Add blog posts
  for (const blog of blogs) {
    const postUrl = `${baseUrl}/blogs/${blog.slug}`;
    const pubDate = blog.frontmatter?.date ? new Date(blog.frontmatter.date).toUTCString() : new Date().toUTCString();
    const description = blog.frontmatter?.description || blog.content.substring(0, 200);

    rss += '    <item>\n';
    rss += `      <title>${escapeXml(blog.frontmatter?.title || blog.slug)}</title>\n`;
    rss += `      <link>${postUrl}</link>\n`;
    rss += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    rss += `      <pubDate>${pubDate}</pubDate>\n`;
    rss += `      <description>${escapeXml(description)}</description>\n`;
    
    if (blog.frontmatter?.tags && blog.frontmatter.tags.length > 0) {
      const tags = Array.isArray(blog.frontmatter.tags) ? blog.frontmatter.tags : [blog.frontmatter.tags];
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
