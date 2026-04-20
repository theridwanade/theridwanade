import type { Metadata } from "next";

export const siteUrl = "https://theridwanade.me";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface AboutContent {
  technical: string;
  intellectual: string;
  community: string;
}

export interface ProjectSummary {
  title: string;
  description: string;
  tags: string[];
  slug: string;
}

export interface TalkAbstract {
  title: string;
  description: string;
}

export interface SpeakingItem {
  topic: string;
  venue: string;
  date: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    handle: string;
    imagePath: string;
  };
  nav: NavItem[];
  hero: HeroContent;
  bio: string[];
  education: {
    school: string;
    program: string;
    focus: string;
  };
  about: AboutContent;
  skills: {
    backend: string[];
    interests: string[];
  };
  links: {
    socials: SocialLink[];
    writing: SocialLink[];
    contact: SocialLink[];
    newsletter: string;
  };
  projects: ProjectSummary[];
  talkAbstracts: TalkAbstract[];
  speaking: SpeakingItem[];
  metadata: Metadata;
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Ridwan",
    handle: "theridwanade",
    imagePath: "/theridwanade.jpg",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Speaking", href: "/speaking" },
    { label: "Thoughts", href: "/thoughts" },
  ],
  hero: {
    headline: "Hi, I am Ridwan.",
    subheadline:
      "I am a Software Engineer. I build stuff: open source, apps, hardware, whatever sounds fun.",
  },
  bio: [
    "I am currently pursuing my degree in Library and Information Science at the University of Ilorin, where I research information management and dissemination.",
    "I aim to combine my computer science skills and academic knowledge to create innovative solutions that benefit society.",
    "I am also an aspiring public speaker and communicator, sharing ideas across science, society, technology, and topics I find interesting.",
  ],
  education: {
    school: "University of Ilorin",
    program: "Library and Information Science",
    focus: "Information management and dissemination",
  },
  about: {
    technical:
      "I build software with a focus on practical problem-solving, experimentation, and shipping useful things.",
    intellectual:
      "I love philosophy, science, and mathematics, and these disciplines shape how I think about engineering and society.",
    community:
      "I am an aspiring public speaker and communicator, learning to explain technical ideas in ways that are clear, useful, and accessible.",
  },
  skills: {
    backend: [],
    interests: [
      "Philosophy",
      "Science",
      "Mathematics",
      "Public Speaking",
      "Communication",
    ],
  },
  links: {
    socials: [
      { label: "GitHub", href: "https://github.com/theridwanade" },
      { label: "LinkedIn", href: "https://linkedin.com/in/theridwanade" },
      { label: "YouTube", href: "https://youtube.com/@theridwanade" },
      { label: "X (Twitter)", href: "https://x.com/theridwanade" },
    ],
    writing: [
      { label: "Substack", href: "https://substack.com/@theridwanade" },
      { label: "dev.to", href: "https://dev.to/theridwanade" },
    ],
    contact: [{ label: "Email", href: "mailto:ridwan@theridwanade.me" }],
    newsletter: "https://substack.com/@theridwanade",
  },
  projects: [],
  talkAbstracts: [],
  speaking: [],
  metadata: {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Ridwan | Software Engineer, Writer, and Speaker",
      template: "%s | Ridwan",
    },
    description:
      "Ridwan (theridwanade) is a Software Engineer, writer, and speaker building software, maps, and clear technical communication from Nigeria.",
    applicationName: "Ridwan",
    authors: [{ name: "Ridwan", url: siteUrl }],
    creator: "Ridwan",
    publisher: "Ridwan",
    keywords: [
      "Ridwan",
      "theridwanade",
      "software engineer",
      "writer",
      "speaker",
      "Nigeria developer",
      "open source",
      "geospatial data",
      "MapLocale",
      "University of Ilorin",
      "Library and Information Science",
    ],
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Ridwan | Software Engineer, Writer, and Speaker",
      description:
        "Personal site of Ridwan (theridwanade): software engineering, writing, communication, and projects across software, maps, and technology.",
      siteName: "Ridwan",
      type: "website",
      locale: "en_US",
      url: "/",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Ridwan - Software Engineer, Writer, and Speaker",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Ridwan | Software Engineer, Writer, and Speaker",
      description:
        "Personal site of Ridwan (theridwanade): software engineering, writing, communication, and projects across software, maps, and technology.",
      images: ["/twitter-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
  },
};
