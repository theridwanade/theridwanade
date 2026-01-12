/**
 * Utility functions for parsing blog posts
 */

import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';

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
export function getAllPosts(postsDir: string, includeDrafts: boolean = false) {
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
          
          // Skip drafts unless explicitly requested
          if (!includeDrafts && (parsed.frontmatter?.draft === true || parsed.frontmatter?.draft === 'true')) {
            continue;
          }
          
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
        
        // Skip drafts unless explicitly requested
        if (!includeDrafts && (parsed.frontmatter?.draft === true || parsed.frontmatter?.draft === 'true')) {
          continue;
        }
        
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
 * Robust markdown to HTML conversion using markdown-it
 */
export function markdownToHtml(md: string): string {
  
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false
  });

  const normalizeSlug = (target: string) => target
    .replace(/^posts\//, '')
    .replace(/^blogs\//, '')
    .replace(/^\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '');

  const toBlogHref = (slug: string) => `/blogs/${slug}`;

  // First handle media embeds like ![[attachments/video.mp4|Title]]
  const withMediaEmbeds = replaceMediaEmbeds(md, toBlogHref);

  // Convert Obsidian-style wikilinks to markdown links before parsing
  const wikilinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  const preprocessed = withMediaEmbeds.replace(wikilinkPattern, (_match, target, text) => {
    const slug = normalizeSlug(String(target));
    const display = text ? String(text) : String(target);
    return `[${display}](${toBlogHref(slug)})`;
  });


  // Normalize any markdown links that still point to /posts/ to /blogs/
  const normalizedLinks = preprocessed.replace(/\]\((?:\/)?posts\//g, '](/blogs/');

  // Render to HTML
  let html = mdParser.render(normalizedLinks);
  
  
  // Post-process: Group consecutive images into grid containers
  html = groupConsecutiveImages(html);
  
  return html;
}

/**
 * Group consecutive images into responsive grid layouts
 */
function groupConsecutiveImages(html: string): string {
  
  const lines = html.split('\n');
  const result: string[] = [];
  let imageBuffer: string[] = [];
  
  const flushImages = () => {
    if (imageBuffer.length === 0) return;
    
    if (imageBuffer.length === 1) {
      // Single image, no grid needed
      result.push(imageBuffer[0]);
    } else {
      // Multiple images - create grid
      const gridClass = imageBuffer.length === 2 ? 'image-grid-2' :
                        imageBuffer.length === 3 ? 'image-grid-3' :
                        'image-grid-4';
      result.push(`<div class="${gridClass}">`);
      imageBuffer.forEach(img => result.push(img));
      result.push('</div>');
    }
    imageBuffer = [];
  };
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check if this line is a paragraph containing only an image
    if (trimmed.startsWith('<p><img') && trimmed.endsWith('</p>')) {
      // Extract just the img tag
      const imgMatch = trimmed.match(/<img[^>]+>/);
      if (imgMatch) {
        console.log('Found image:', imgMatch[0].substring(0, 80));
        imageBuffer.push(imgMatch[0]);
        continue;
      }
    }
    
    // Not an image line, flush buffer and add current line
    flushImages();
    if (trimmed) result.push(line);
  }
  
  // Flush any remaining images
  flushImages();

  return result.join('\n');
}

/**
 * Replace Obsidian-style media embeds with HTML5 video/audio/pdf embeds
 */
function replaceMediaEmbeds(md: string, toBlogHref: (slug: string) => string): string {
  const mediaPattern = /!\[\[(.+?)(?:\|([^\]]+))?\]\]/g;

  const normalizePath = (target: string) => {
    // Strip leading folders and ensure /blogs prefix
    const cleaned = target
      .replace(/^posts\//, '')
      .replace(/^blogs\//, '')
      .replace(/^\//, '')
      .replace(/\/index$/, '');
    return `${toBlogHref(cleaned)}`;
  };

  return md.replace(mediaPattern, (_match, targetRaw, titleRaw) => {
    const target = String(targetRaw);
    const title = titleRaw ? String(titleRaw) : '';

    // Split anchor (e.g., document.pdf#page=3)
    const [pathPart, anchorPart] = target.split('#');
    const extMatch = pathPart.match(/\.([a-zA-Z0-9]+)$/);
    if (!extMatch) return _match; // not a file, leave untouched

    const ext = extMatch[1].toLowerCase();
    const srcBase = normalizePath(pathPart);
    const src = anchorPart ? `${srcBase}#${anchorPart}` : srcBase;

    if (['mp4', 'webm', 'mov', 'm4v'].includes(ext)) {
      const type = ext === 'mov' ? 'video/quicktime' : `video/${ext === 'm4v' ? 'mp4' : ext}`;
      return `<div class="embed-wrapper embed-video"><video controls preload="metadata"><source src="${src}" type="${type}">${title || 'Your browser does not support the video tag.'}</video>${title ? `<div class="embed-caption">${title}</div>` : ''}</div>`;
    }

    if (['mp3', 'wav', 'ogg', 'm4a'].includes(ext)) {
      const type = ext === 'wav' ? 'audio/wav' : ext === 'm4a' ? 'audio/mp4' : `audio/${ext}`;
      return `<div class="embed-wrapper embed-audio"><audio controls preload="metadata"><source src="${src}" type="${type}">${title || 'Your browser does not support the audio tag.'}</audio>${title ? `<div class="embed-caption">${title}</div>` : ''}</div>`;
    }

    if (['pdf'].includes(ext)) {
      return `<div class="embed-wrapper embed-pdf"><iframe src="${src}" title="${title || 'Document'}" loading="lazy"></iframe><div class="embed-actions"><a href="${src}" target="_blank" rel="noopener">Open</a></div></div>`;
    }

    // Fallback: return as link
    return `[${title || target}](${src})`;
  });
}

/**
 * Get the latest N posts sorted by date
 */
export function getLatestPosts(postsDir: string, limit: number = 3) {
  const posts = getAllPosts(postsDir, false); // Don't include drafts
  return posts
    .sort((a, b) => {
      const dateA = a.frontmatter?.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter?.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA; // Newest first
    })
    .slice(0, limit);
}

/**
 * Get a featured post (first non-draft post with featured flag or newest)
 */
export function getFeaturedPost(postsDir: string) {
  const posts = getAllPosts(postsDir, false); // Don't include drafts
  
  // Look for a post marked as featured
  let featured = posts.find(p => p.frontmatter?.featured === true || p.frontmatter?.featured === 'true');
  
  // If no featured post, get the newest one
  if (!featured) {
    featured = posts.sort((a, b) => {
      const dateA = a.frontmatter?.date ? new Date(a.frontmatter.date).getTime() : 0;
      const dateB = b.frontmatter?.date ? new Date(b.frontmatter.date).getTime() : 0;
      return dateB - dateA;
    })[0];
  }
  
  return featured;
}

