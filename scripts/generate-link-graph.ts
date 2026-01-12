/**
 * Build-Time Link Graph Generator
 * 
 * Generates a bidirectional link graph from blog posts at build time.
 * Detects wikilinks and markdown links, extracts excerpts, and outputs
 * a static JSON file for runtime consumption.
 */

import fs from 'fs';
import path from 'path';

// Types for the graph structure
interface LinkMention {
  sourcePostId: string;
  sourcePostTitle: string;
  linkText: string;
  excerpt: string;
  context: string;
}

interface LinkGraph {
  backlinks: Record<string, LinkMention[]>;
  forwardlinks: Record<string, string[]>;
  allPostIds: string[];
  buildTime: string;
  totalLinks: number;
}

interface Post {
  id: string;
  title: string;
  content: string;
  filePath: string;
}

/**
 * Extract frontmatter and content from markdown file
 */
function parseMarkdownFile(filePath: string): { frontmatter: any; content: string } {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const frontmatterText = match[1];
  const content = match[2];

  // Simple YAML parsing for title
  const frontmatter: any = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      if (key === 'title') {
        // Remove quotes if present
        frontmatter.title = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Get post ID from file path
 */
function getPostIdFromPath(filePath: string, postsDir: string): string {
  const relativePath = path.relative(postsDir, filePath);
  
  // Handle folder-based posts (index.md in a folder)
  if (relativePath.includes('index.md')) {
    return path.dirname(relativePath);
  }
  
  // Handle file-based posts
  return relativePath.replace(/\.md$/, '');
}

/**
 * Load all posts from the posts directory
 */
function loadAllPosts(postsDir: string): Post[] {
  const posts: Post[] = [];

  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip attachments folder
      if (entry.name === 'attachments') {
        continue;
      }

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const { frontmatter, content } = parseMarkdownFile(fullPath);
        const postId = getPostIdFromPath(fullPath, postsDir);

        posts.push({
          id: postId,
          title: frontmatter.title || postId,
          content,
          filePath: fullPath,
        });
      }
    }
  }

  scanDirectory(postsDir);
  return posts;
}

/**
 * Extract internal links from post content
 * Supports:
 * - Wikilinks: [[post-id]] or [[post-id|display text]]
 * - Markdown links: [text](post-id) or [text](posts/post-id)
 */
function extractInternalLinks(content: string, currentPostId: string): Array<{ targetId: string; linkText: string; fullMatch: string }> {
  const links: Array<{ targetId: string; linkText: string; fullMatch: string }> = [];

  // Extract wikilinks: [[target]] or [[target|text]]
  const wikilinkRegex = /\[\[([^\]#|]+)(?:\|([^\]]+))?\]\]/g;
  let match;

  while ((match = wikilinkRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    let targetId = match[1].trim();
    const linkText = match[2] || targetId;

    // Skip embeds (images, videos, etc.)
    if (fullMatch.startsWith('![[')) {
      continue;
    }

    // Clean up target ID
    // Remove 'posts/' prefix if present
    targetId = targetId.replace(/^posts\//, '');
    // Remove .md extension if present
    targetId = targetId.replace(/\.md$/, '');
    // Handle folder-based posts (remove /index)
    targetId = targetId.replace(/\/index$/, '');

    // Skip attachments
    if (targetId.includes('attachments/')) {
      continue;
    }

    // Skip self-references
    if (targetId === currentPostId) {
      continue;
    }

    links.push({ targetId, linkText, fullMatch });
  }

  // Extract markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  while ((match = markdownLinkRegex.exec(content)) !== null) {
    const linkText = match[1];
    let targetUrl = match[2].trim();

    // Skip external links (http, https, mailto, etc.)
    if (/^[a-z]+:/.test(targetUrl)) {
      continue;
    }

    // Skip anchors without paths
    if (targetUrl.startsWith('#')) {
      continue;
    }

    // Skip attachments
    if (targetUrl.includes('attachments/')) {
      continue;
    }

    // Remove leading slash
    targetUrl = targetUrl.replace(/^\//, '');
    // Remove 'posts/' prefix if present
    targetUrl = targetUrl.replace(/^posts\//, '');
    // Remove anchor fragments
    targetUrl = targetUrl.replace(/#.*$/, '');
    // Remove .md extension
    targetUrl = targetUrl.replace(/\.md$/, '');
    // Handle folder-based posts
    targetUrl = targetUrl.replace(/\/index$/, '');

    // Skip if empty after cleanup
    if (!targetUrl) {
      continue;
    }

    // Skip self-references
    if (targetUrl === currentPostId) {
      continue;
    }

    links.push({ targetId: targetUrl, linkText, fullMatch: match[0] });
  }

  return links;
}

/**
 * Generate excerpt from markdown content using structural rules only
 */
function generateExcerpt(content: string, linkText: string, maxLength: number = 150): string {
  // Remove code blocks
  let cleaned = content.replace(/```[\s\S]*?```/g, '');
  
  // Remove inline code
  cleaned = cleaned.replace(/`[^`]+`/g, '');
  
  // Remove markdown syntax
  cleaned = cleaned
    .replace(/^#{1,6}\s+/gm, '') // Headers
    .replace(/^\s*[-*+]\s+/gm, '') // List items
    .replace(/^\s*\d+\.\s+/gm, '') // Numbered lists
    .replace(/^\s*>\s+/gm, '') // Blockquotes
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Bold
    .replace(/\*([^*]+)\*/g, '$1') // Italic
    .replace(/__([^_]+)__/g, '$1') // Bold alternative
    .replace(/_([^_]+)_/g, '$1') // Italic alternative
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, '$2') // Wikilinks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Markdown links

  // Split into sentences
  const sentences = cleaned.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);

  // Find sentence containing the link text (case-insensitive)
  const linkTextLower = linkText.toLowerCase();
  let excerpt = '';

  for (const sentence of sentences) {
    if (sentence.toLowerCase().includes(linkTextLower)) {
      excerpt = sentence;
      break;
    }
  }

  // If no match found, use first non-empty sentence
  if (!excerpt && sentences.length > 0) {
    excerpt = sentences[0];
  }

  // Truncate if too long
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength).trim() + '...';
  }

  return excerpt || 'No excerpt available.';
}

/**
 * Extract context around a link mention
 */
function extractContext(content: string, linkMatch: string, contextLength: number = 200): string {
  const index = content.indexOf(linkMatch);
  if (index === -1) {
    return generateExcerpt(content, '', contextLength);
  }

  const start = Math.max(0, index - contextLength / 2);
  const end = Math.min(content.length, index + linkMatch.length + contextLength / 2);
  
  let context = content.substring(start, end).trim();

  // Clean up markdown syntax similar to excerpt generation
  context = context
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\s*>\s+/gm, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1');

  // Add ellipsis if truncated
  if (start > 0) {
    context = '...' + context;
  }
  if (end < content.length) {
    context = context + '...';
  }

  return context;
}

/**
 * Build the bidirectional link graph
 */
function buildLinkGraph(posts: Post[]): LinkGraph {
  const backlinks: Record<string, LinkMention[]> = {};
  const forwardlinks: Record<string, string[]> = {};
  const allPostIds: string[] = posts.map(p => p.id);
  const postIdSet = new Set(allPostIds); // Use Set for O(1) lookups
  let totalLinks = 0;

  // Initialize empty arrays for all posts
  for (const post of posts) {
    backlinks[post.id] = [];
    forwardlinks[post.id] = [];
  }

  // Build the graph
  for (const sourcePost of posts) {
    const links = extractInternalLinks(sourcePost.content, sourcePost.id);

    for (const link of links) {
      // Only add link if target post exists (O(1) lookup with Set)
      if (!postIdSet.has(link.targetId)) {
        continue;
      }

      // Add to forward links
      if (!forwardlinks[sourcePost.id].includes(link.targetId)) {
        forwardlinks[sourcePost.id].push(link.targetId);
      }

      // Add to backlinks
      const mention: LinkMention = {
        sourcePostId: sourcePost.id,
        sourcePostTitle: sourcePost.title,
        linkText: link.linkText,
        excerpt: generateExcerpt(sourcePost.content, link.linkText),
        context: extractContext(sourcePost.content, link.fullMatch),
      };

      backlinks[link.targetId].push(mention);
      totalLinks++;
    }
  }

  return {
    backlinks,
    forwardlinks,
    allPostIds,
    buildTime: new Date().toISOString(),
    totalLinks,
  };
}

/**
 * Main execution
 */
function main() {
  const postsDir = path.join(process.cwd(), 'src/contents/blogs');
  const outputDir = path.join(process.cwd(), 'public');
  const outputFile = path.join(outputDir, 'link-graph.json');

  console.log('🔗 Generating link graph...');
  console.log(`📁 Blogs directory: ${postsDir}`);

  // Load all posts
  const posts = loadAllPosts(postsDir);
  console.log(`📄 Found ${posts.length} posts`);

  // Build link graph
  const graph = buildLinkGraph(posts);
  console.log(`🔗 Generated ${graph.totalLinks} links`);
  console.log(`🔙 Backlinks for ${Object.keys(graph.backlinks).filter(k => graph.backlinks[k].length > 0).length} posts`);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(outputFile, JSON.stringify(graph, null, 2));
  console.log(`✅ Link graph written to ${outputFile}`);
}

// Run main function
main();

export { buildLinkGraph, loadAllPosts, extractInternalLinks, generateExcerpt };
