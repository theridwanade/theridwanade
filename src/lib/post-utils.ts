/**
 * Utility functions for parsing blog posts
 */

import fs from 'fs';
import path from 'path';

export interface ParsedPost {
  frontmatter: any;
  content: string;
}

/**
 * Parse markdown file to extract frontmatter and content
 */
export function parseMarkdownFile(filePath: string): ParsedPost {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const frontmatterText = match[1];
  const content = match[2];

  // Simple YAML parsing
  const frontmatter: any = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      
      // Handle special fields
      if (key === 'draft' || key === 'hideTOC' || key === 'hideCoverImage' || key === 'imageOG') {
        value = value === 'true';
      }
      
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content };
}

/**
 * Get all blog posts from the posts directory
 */
export function getAllPosts(postsDir: string) {
  const posts: Array<{ slug: string; postId: string; frontmatter: any; content: string }> = [];

  function scanDirectory(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip attachments folder
      if (entry.name === 'attachments') {
        continue;
      }

      if (entry.isDirectory()) {
        // Folder-based post
        const indexPath = path.join(fullPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          const relativePath = path.relative(postsDir, fullPath);
          const parsed = parseMarkdownFile(indexPath);
          posts.push({
            slug: relativePath,
            postId: relativePath,
            ...parsed
          });
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // File-based post
        const relativePath = path.relative(postsDir, fullPath);
        const slug = relativePath.replace(/\.md$/, '');
        const parsed = parseMarkdownFile(fullPath);
        posts.push({
          slug,
          postId: slug,
          ...parsed
        });
      }
    }
  }

  scanDirectory(postsDir);
  return posts;
}

/**
 * Simple markdown to HTML conversion
 */
export function markdownToHtml(md: string): string {
  let html = md;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  
  // Links - Markdown style
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
  
  // Wikilinks
  html = html.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (match, target, text) => {
    const displayText = text || target;
    const slug = target.replace(/^posts\//, '').replace(/\.md$/, '').replace(/\/index$/, '');
    return `<a href="/posts/${slug}" class="text-blue-600 hover:underline">${displayText}</a>`;
  });
  
  // Paragraphs
  html = html.split('\n\n').map(p => {
    if (!p.trim()) return '';
    if (p.startsWith('<h') || p.startsWith('<pre>') || p.startsWith('<ul>') || p.startsWith('<ol>')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).join('\n');
  
  return html;
}
