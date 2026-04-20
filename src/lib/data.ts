import type { Metadata } from "next";

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
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
  };
  nav: NavItem[];
  hero: HeroContent;
  about: AboutContent;
  skills: {
    backend: string[];
    interests: string[];
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
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Speaking", href: "/speaking" },
    { label: "Thoughts", href: "/thoughts" },
  ],
  hero: {
    headline: "Software engineering with first principles and clear communication.",
    subheadline:
      "I am Ridwan (theridwanade), a software engineer and aspiring public speaker focused on communicating ideas with clarity.",
  },
  about: {
    technical:
      "I build software with a focus on clarity, maintainability, and practical problem-solving.",
    intellectual:
      "Philosophy, science, and mathematics shape how I think and how I approach engineering decisions.",
    community:
      "I am an aspiring public speaker and communicator, learning to share technical ideas in ways that are useful and understandable.",
  },
  skills: {
    backend: [],
    interests: ["Philosophy", "Science", "Mathematics", "Public Speaking", "Communication"],
  },
  projects: [],
  talkAbstracts: [],
  speaking: [],
  metadata: {
    title: "Ridwan | Software Engineer",
    description:
      "Ridwan (theridwanade) is a software engineer, aspiring public speaker, and communicator who loves philosophy, science, and mathematics.",
    openGraph: {
      title: "Ridwan | Software Engineer",
      description:
        "Software engineering by Ridwan (theridwanade), with a focus on clear communication, public speaking, and first-principles thinking in philosophy, science, and mathematics.",
      siteName: "Ridwan",
      type: "website",
      locale: "en_US",
    },
  },
};
