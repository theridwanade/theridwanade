
// JSON-LD schema for organization and website structured data

export interface PersonSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  email: string;
  jobTitle: string;
  image: string;
  sameAs: string[];
  knowsAbout: string[];
}

export function getPersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://theridwanade.me/#person",
    "name": "Ridwan Oyeniyi",
    "url": "https://theridwanade.me",
    "email": "ridwan@theridwanade.me",
    "jobTitle": "Software & Hardware Developer",
    "image": "https://theridwanade.me/me.jpg",
    "sameAs": [
      "https://twitter.com/theridwanade",
      "https://github.com/theridwanade"
    ],
    "knowsAbout": [
      "Software Development",
      "Hardware Development",
      "Web Development",
      "Full Stack Development"
    ]
  };
}

export interface WebSiteSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  name: string;
  url: string;
  description: string;
  author: object;
  publisher: object;
  potentialAction: object;
}

export function getWebsiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://theridwanade.me/#website",
    "name": "Ridwan Oyeniyi",
    "url": "https://theridwanade.me",
    "description": "Personal website and blog of Ridwan Oyeniyi, a Software & Hardware Developer",
    "author": getPersonSchema(),
    "publisher": getPersonSchema(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://theridwanade.me/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

export interface BlogPostSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: object;
  publisher: object;
  mainEntityOfPage: object;
  keywords: string[];
}

export function getBlogPostSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  keywords: string[]
): BlogPostSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://theridwanade.me/blogs/${title.toLowerCase().replace(/\s+/g, '-')}#article`,
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": getPersonSchema(),
    "publisher": getPersonSchema(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://theridwanade.me/blogs/${title.toLowerCase().replace(/\s+/g, '-')}`
    },
    "keywords": keywords
  };
}

export interface SnippetSchema {
  "@context": string;
  "@type": string;
  "@id": string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: object;
  publisher: object;
  mainEntityOfPage: object;
  keywords: string[];
}

export function getSnippetSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  keywords: string[]
): SnippetSchema {
  return {
    "@context": "https://schema.org",
    "@type": "SocialMediaPosting",
    "@id": `https://theridwanade.me/snippets/${title.toLowerCase().replace(/\s+/g, '-')}#snippet`,
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": getPersonSchema(),
    "publisher": getPersonSchema(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://theridwanade.me/snippets/${title.toLowerCase().replace(/\s+/g, '-')}`
    },
    "keywords": keywords
  };
}