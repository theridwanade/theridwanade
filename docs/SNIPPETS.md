# Snippets - Quick Content Guide

## Overview

Snippets are a new microblog content type designed for sharing quick thoughts, updates, and ideas in a casual, lightweight format. Unlike full blog posts, snippets consist of:

- A single featured image
- A brief text description (1-2 sentences, maximum a paragraph)
- Tags and categories for organization
- SEO optimization and structured data

## Creating a Snippet

### 1. File Location

Create your snippet as a markdown file in the `src/contents/snippets/` directory:

```
src/contents/snippets/
├── attachments/          # Store images here
│   └── my-image.jpg
└── my-snippet.md         # Your snippet file
```

### 2. Frontmatter Format

Each snippet requires YAML frontmatter at the top of the file:

```yaml
---
title: My Snippet Title
date: 2026-01-22
description: A brief description of the snippet content (1-2 sentences).
tags:
  - tag1
  - tag2
image: "[[attachments/my-image.jpg]]"
imageAlt: Descriptive alt text for accessibility
imageOG: true
hideCoverImage: false
featured: false
draft: false
---
```

### 3. Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The title of your snippet |
| `date` | Yes | Publication date (YYYY-MM-DD format) |
| `description` | Yes | Brief description for SEO and listings |
| `tags` | No | Array of tags for categorization |
| `image` | Yes | Featured image path using wikilink format |
| `imageAlt` | Yes | Alt text for the image (accessibility) |
| `imageOG` | No | Use image for Open Graph sharing (default: true) |
| `hideCoverImage` | No | Hide image on the snippet page (default: false) |
| `featured` | No | Mark as featured snippet (default: false) |
| `draft` | No | Set to true to hide from published listings (default: false) |

### 4. Content

After the frontmatter, add your snippet content:

```markdown
---
title: Quick Thought
date: 2026-01-22
description: A moment of inspiration captured.
tags:
  - inspiration
image: "[[attachments/thought.jpg]]"
imageAlt: An inspiring visual
---

This is the main content of your snippet. Keep it brief and focused - typically 1-2 sentences or a short paragraph. Snippets are meant to be quick thoughts, not full articles.
```

## Image Handling

### Adding Images

1. Place your images in the `attachments/` subdirectory
2. Reference them using Obsidian-style wikilinks: `[[attachments/image.jpg]]`
3. The image will be automatically copied to `public/snippets/attachments/` during build

### Image Guidelines

- **Format**: JPG, PNG, or SVG
- **Size**: Optimized for web (recommended max 2MB)
- **Dimensions**: At least 800x600px for best display
- **Alt Text**: Always provide descriptive alt text for accessibility

## Publishing Workflow

### Draft Mode

Set `draft: true` to work on a snippet without publishing:

```yaml
draft: true
```

Draft snippets won't appear in:
- Public listings
- Homepage
- RSS/Atom feeds
- Sitemap

### Publishing

1. Complete your snippet content
2. Add an appropriate featured image
3. Set `draft: false` (or remove the draft field)
4. Commit and push your changes

The snippet will automatically appear in:
- `/snippets` listing page
- Homepage "Latest Snippets" section
- RSS/Atom feeds
- Sitemap

### Featured Snippets

Mark your best snippet as featured:

```yaml
featured: true
```

Featured snippets may be highlighted on the homepage.

## Tags and Categories

### Adding Tags

Tags help organize and categorize your snippets:

```yaml
tags:
  - technology
  - design
  - productivity
```

Tags appear:
- On the snippet page
- In snippet cards on listing pages
- In RSS/Atom feeds as categories

### Best Practices

- Use 2-5 tags per snippet
- Keep tags concise and descriptive
- Use consistent tag names across snippets
- Consider existing tags before creating new ones

## SEO Optimization

Snippets include automatic SEO optimization:

### Meta Tags
- Title, description, and keywords
- Open Graph tags for social sharing
- Twitter Card metadata

### Structured Data
- JSON-LD schema as `SocialMediaPosting`
- Author information
- Publication dates
- Keywords and categories

### Best Practices
- Write descriptive titles (50-60 characters)
- Craft compelling descriptions (150-160 characters)
- Use relevant keywords in tags
- Provide descriptive alt text for images

## Linking Between Content

### Linking to Blogs

Reference blog posts using wikilinks:

```markdown
See my full article on [[blog-post-slug|this topic]].
```

### Linking to Other Snippets

Link to other snippets similarly:

```markdown
Related to my previous [[snippet-slug|quick thought]].
```

### External Links

Use standard markdown for external links:

```markdown
Check out [this resource](https://example.com)
```

## Snippet vs Blog Posts

### Use Snippets For:
- Quick updates and announcements
- Brief thoughts and observations
- Visual-first content with minimal text
- Casual, everyday sharing
- Social media-style posts

### Use Blog Posts For:
- In-depth articles and tutorials
- Technical documentation
- Long-form storytelling
- Multi-section content
- Detailed analysis and research

## Tips for Great Snippets

1. **Be Concise**: Keep text to 1-3 sentences
2. **Visual First**: Choose striking, meaningful images
3. **One Idea**: Focus on a single thought or update
4. **Frequent**: Snippets are easier to create - post often
5. **Authentic**: Use a casual, personal tone
6. **Timely**: Capture moments and ideas as they happen

## Technical Details

### Build Process

When you run `npm run build`:
1. Snippet markdown files are parsed from `src/contents/snippets/`
2. Images are copied to `public/snippets/`
3. Static pages are generated for each snippet
4. Sitemap and feeds are updated

### Development

During development (`npm run dev`):
- Changes to snippets are hot-reloaded
- Draft snippets are visible for preview
- Assets are automatically synchronized

## Troubleshooting

### Snippet Not Showing
- Check that `draft: false`
- Verify the date is not in the future
- Ensure the markdown file is in `src/contents/snippets/`

### Image Not Loading
- Verify image is in the `attachments/` folder
- Check the wikilink format: `[[attachments/image.jpg]]`
- Run `npm run copy:post-assets` to sync images

### Build Errors
- Validate YAML frontmatter syntax
- Check for missing required fields (title, date, description)
- Ensure image files exist

## Examples

### Minimal Snippet

```markdown
---
title: Coffee Break Thoughts
date: 2026-01-22
description: A moment of clarity over morning coffee.
tags:
  - thoughts
image: "[[attachments/coffee.jpg]]"
imageAlt: A warm cup of coffee on a desk
---

Sometimes the best ideas come during the quiet moments.
```

### Full-Featured Snippet

```markdown
---
title: New Feature Launch
date: 2026-01-22
description: Excited to announce our latest product feature!
tags:
  - announcement
  - product
  - release
image: "[[attachments/feature-launch.jpg]]"
imageAlt: Screenshot of the new feature interface
imageOG: true
hideCoverImage: false
featured: true
draft: false
---

We've just shipped a game-changing feature that will transform how you work. Check out the full details in our [[feature-deep-dive|blog post]] for the technical breakdown.
```

## Support

For questions or issues:
- Check this documentation
- Review existing snippets for examples
- Open an issue on GitHub
- Contact: ridwan@theridwanade.me
