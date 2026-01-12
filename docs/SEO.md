# SEO Configuration & Optimization Guide

## Overview
This document outlines the SEO setup for theridwanade.me, including sitemaps, feeds, structured data, and best practices.

## Generated SEO Files

### 1. Sitemap (`/sitemap.xml`)
- **Type**: XML Sitemap
- **Purpose**: Helps search engines discover and index all pages
- **Contents**:
  - Homepage (priority: 1.0)
  - Blog posts (priority: 0.8)
  - Blog listing page (priority: 0.9)
  - Regular pages (priority: 0.7)
  - Projects (priority: 0.7)
  - Documentation (priority: 0.6)
- **Update Frequency**: Automatic - regenerates on each build
- **Submit To**: 
  - Google Search Console: https://search.google.com/search-console
  - Bing Webmaster Tools: https://www.bing.com/webmasters

### 2. Robots.txt (`/robots.txt`)
- **Purpose**: Controls crawler access and points to sitemap
- **Features**:
  - Allows all user agents by default
  - Points to XML sitemap and RSS feed
  - Sets crawl delay to 1 second
  - Specific rules for Googlebot, Bingbot, and Slurp

### 3. RSS Feed (`/rss.xml`)
- **Type**: RSS 2.0
- **Purpose**: Syndication of blog posts
- **Features**:
  - Lists latest 20 published blog posts
  - Includes post title, description, date, and tags
  - Sorted by publish date (newest first)
  - Cache: 1 hour

### 4. Atom Feed (`/atom.xml`)
- **Type**: Atom 1.0
- **Purpose**: Alternative feed format for broader compatibility
- **Features**:
  - Same content as RSS feed
  - Better metadata including author and publication dates
  - Supports category tags

### 5. Web App Manifest (`/manifest.json`)
- **Purpose**: PWA (Progressive Web App) configuration
- **Features**:
  - App name and description
  - Home screen icon and theme colors
  - App shortcuts for Blog and Projects
  - Standalone display mode

### 6. Security.txt (`/.well-known/security.txt`)
- **Purpose**: Security contact information per RFC 9116
- **Contains**:
  - Security contact email
  - Security policy URL
  - Acknowledgments page
  - Policy expiration date

## Meta Tags & Structured Data

### Page Meta Tags
Every page includes:
- Canonical URL (prevents duplicate content issues)
- OG (Open Graph) tags for social media previews
- Twitter Card tags for Twitter sharing
- Title and meta description

### JSON-LD Structured Data
Located in `/src/lib/schema.ts`:
- **Person Schema**: Identifies the site owner
- **Website Schema**: General site information
- **BlogPosting Schema**: Individual blog post metadata

**How to Use**:
```astro
import { getPersonSchema, getBlogPostSchema } from '@/lib/schema';

const schema = getBlogPostSchema(
  title,
  description,
  image,
  datePublished,
  keywords
);

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

## Blog Post Frontmatter for SEO

Each blog post should include:
```yaml
---
title: "Article Title"
date: 2024-01-13
description: "Brief description for SEO"
tags: ["tag1", "tag2"]
image: "[[attachments/image.jpg]]"
draft: false
featured: false
---
```

**Fields**:
- `title`: Post title (appears in search results)
- `date`: Publication date
- `description`: Meta description (used in search results)
- `tags`: Keywords for categorization
- `image`: Featured image for OG tags
- `draft`: Set to `false` to publish
- `featured`: Set to `true` for homepage spotlight

## Best Practices

### For Blog Posts
1. ✅ Write descriptive, keyword-rich titles (50-60 characters)
2. ✅ Include compelling meta descriptions (150-160 characters)
3. ✅ Use headers (H1, H2, H3) properly
4. ✅ Add alt text to images
5. ✅ Include internal links to related posts
6. ✅ Use 3-5 relevant tags per post
7. ✅ Ensure featured images are optimized

### For SEO
1. ✅ Feeds are auto-generated and cacheable
2. ✅ Sitemap updates automatically on build
3. ✅ Canonical URLs prevent duplicate content
4. ✅ JSON-LD provides rich snippets
5. ✅ Reading time calculations improve UX and SEO signals

### Monitoring
- Track indexing in Google Search Console
- Monitor keyword rankings
- Check click-through rates (CTR)
- Analyze user engagement metrics
- Review search queries that bring traffic

## Feed Discovery

Search engines and feed readers can discover feeds via:
- RSS: `<link rel="alternate" type="application/rss+xml" href="/rss.xml" />`
- Atom: `<link rel="alternate" type="application/atom+xml" href="/atom.xml" />`
- These are automatically included in all pages via Layout

## Submission Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Submit to RSS feed aggregators:
  - [ ] Feedly
  - [ ] Inoreader
  - [ ] RSS-Bridge
- [ ] Verify robots.txt accessibility
- [ ] Test feeds in feed readers
- [ ] Verify structured data with Schema.org validator
- [ ] Test OG tags on social media
- [ ] Monitor Core Web Vitals in Search Console

## File Locations

| File | Path | Type |
|------|------|------|
| Sitemap | `/sitemap.xml` | Dynamic Route |
| Robots | `/robots.txt` | Static File |
| RSS Feed | `/rss.xml` | Dynamic Route |
| Atom Feed | `/atom.xml` | Dynamic Route |
| Manifest | `/manifest.json` | Static File |
| Security | `/.well-known/security.txt` | Static File |
| Schemas | `/src/lib/schema.ts` | TypeScript Library |

## Performance Notes

- Sitemaps are cached for 1 hour
- Feeds are cached for 1 hour
- Robots.txt has no cache restrictions
- Manifest and security files are served as-is

## Maintenance

- Update security.txt expiration date annually
- Review and update featured blogs quarterly
- Monitor feed subscriber counts
- Check for broken links monthly
- Validate XML feeds quarterly
