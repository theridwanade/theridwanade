# Linked Mentions (Backlinks) System

This implementation provides an Obsidian-style backlinks system for the blog, showing which posts reference each article.

## Overview

The Linked Mentions system is a **build-time feature** that:
- Detects internal links between blog posts (wikilinks + markdown links)
- Builds a bidirectional link graph
- Generates excerpts using structural markdown rules
- Displays backlinks at the bottom of each post

## Architecture

### 1. Build-Time Graph Generation

**Script:** `scripts/generate-link-graph.ts`

Runs before each build to:
- Parse all markdown files in `src/contents/posts/`
- Extract internal links (wikilinks: `[[post]]`, markdown: `[text](post)`)
- Build bidirectional graph with backlinks and forward links
- Generate contextual excerpts
- Output to `public/link-graph.json`

**Link Detection:**
- ✅ Wikilinks: `[[getting-started]]` or `[[getting-started|Display Text]]`
- ✅ Markdown links: `[text](post-slug)` or `[text](/posts/post-slug)`
- ✅ Handles folder-based posts: `sample-folder-based-post/index.md`
- ❌ Ignores external links (http, https, mailto)
- ❌ Ignores attachments and embeds

**Excerpt Generation:**
Uses structural rules only (no NLP):
- Removes code blocks and inline code
- Strips markdown syntax (bold, italic, headers, lists)
- Finds sentences containing the link text
- Truncates to 150 characters with ellipsis

### 2. Runtime Access Layer

**Module:** `src/lib/linked-mentions.ts`

Provides O(1) lookup functions:
```typescript
import { getBacklinks, hasBacklinks, getForwardlinks } from '@/lib/linked-mentions';

// Get all posts that link to this post
const mentions = await getBacklinks('getting-started');

// Check if post has backlinks
const hasLinks = await hasBacklinks('getting-started');

// Get posts this post links to
const links = await getForwardlinks('getting-started');
```

**Graph Data Structure:**
```typescript
{
  backlinks: {
    "post-slug": [
      {
        sourcePostId: "another-post",
        sourcePostTitle: "Another Post",
        linkText: "Getting Started",
        excerpt: "Quick summary...",
        context: "Full context..."
      }
    ]
  },
  forwardlinks: {
    "post-slug": ["linked-post-1", "linked-post-2"]
  },
  allPostIds: ["post-1", "post-2"],
  buildTime: "2025-01-12T14:50:00.000Z",
  totalLinks: 15
}
```

### 3. UI Component

**Component:** `src/components/LinkedMentions.tsx`

React component using Tailwind CSS + shadcn/ui:
- Displays "Linked Mentions" card at bottom of posts
- Shows count of referencing posts
- Lists each mention with:
  - Source post title (clickable link)
  - Link text badge
  - Excerpt
  - Context
- Supports compact mode (hides excerpts)
- Only renders when backlinks exist

**Usage:**
```astro
---
import { LinkedMentions } from '@/components/LinkedMentions';
---

<LinkedMentions postId="getting-started" client:load />
```

**Props:**
- `postId` (required): The ID of the current post
- `compact` (optional): Hide excerpts and context
- `className` (optional): Additional CSS classes

## Integration

### Blog Post Pages

**File:** `src/pages/posts/[slug].astro`

Dynamic route that:
1. Loads all posts using `getStaticPaths()`
2. Renders post content with markdown-to-HTML conversion
3. Includes LinkedMentions component at the bottom

### Build Script

**Updated:** `package.json`

```json
{
  "scripts": {
    "build": "npm run build:graph && astro build",
    "build:graph": "tsx scripts/generate-link-graph.ts"
  }
}
```

The link graph is generated automatically before each build.

## Configuration

The system is designed to work out of the box. Future configuration options could include:

```typescript
// In src/config.ts (example)
export const linkedMentions = {
  enabled: true,           // Enable/disable feature
  compact: false,          // Compact mode by default
  maxExcerptLength: 150,   // Excerpt length
  contextLength: 200,      // Context length
};
```

## Performance

- **Build time:** ~100ms for 5 posts with 15 links
- **Runtime:** O(1) lookups via prebuilt graph
- **Bundle size:** ~29KB for LinkedMentions component
- **Zero runtime computation** - all work done at build time

## File Structure

```
/
├── scripts/
│   └── generate-link-graph.ts    # Build-time graph generator
├── src/
│   ├── components/
│   │   ├── LinkedMentions.tsx    # React component
│   │   └── ui/
│   │       ├── card.tsx          # shadcn/ui Card
│   │       └── badge.tsx         # shadcn/ui Badge
│   ├── lib/
│   │   ├── linked-mentions.ts    # Runtime access layer
│   │   └── post-utils.ts         # Post parsing utilities
│   └── pages/
│       └── posts/
│           └── [slug].astro      # Blog post page template
├── public/
│   └── link-graph.json           # Generated graph (ignored in git)
└── package.json
```

## Example Output

**Link Graph Stats:**
- 5 posts scanned
- 15 internal links detected
- 4 posts with backlinks
- Generated in <1 second

**Sample Link Mention:**
```
Formatting Reference [Getting Started badge]

For example: Getting Started or Astro Suite Obsidian Vault Guide...

...create internal links using double brackets (wikilinks) or with 
standard markdown. For example: [[getting-started|Getting Started]]...
```

## Testing

Run the build to test:
```bash
npm run build
```

Start preview server:
```bash
npm run preview
```

Navigate to any post page (e.g., `/posts/getting-started`) to see linked mentions at the bottom.

## Maintenance

**Adding New Posts:**
No special action needed - the graph is rebuilt automatically on each build.

**Debugging:**
- Check `public/link-graph.json` for graph structure
- Use browser DevTools to inspect LinkedMentions component
- Run `npm run build:graph` separately to test graph generation

## Future Enhancements

Potential additions:
- Configuration flags for enabling/disabling
- Customizable excerpt/context lengths
- Visual graph view
- Link strength/frequency metrics
- Broken link detection
