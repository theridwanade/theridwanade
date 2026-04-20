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
      "I am Ridwan (theridwanade), a software engineer focused on reliable architecture, clear interfaces, and the craft of communicating complex ideas with simplicity.",
  },
  about: {
    technical:
      "I design and implement backend systems with Node.js and NestJS, from domain modeling to deployment. My focus is predictable APIs, fault-tolerant services, and data flows that scale without losing clarity.",
    intellectual:
      "Philosophy, science, and mathematics shape how I reason about software. I use first principles to reduce assumptions, treat architecture as a set of testable hypotheses, and choose designs that hold under real constraints.",
    community:
      "I am an aspiring public speaker and communicator. I share practical engineering ideas to make technical systems more rigorous, more accessible, and easier to reason about.",
  },
  skills: {
    backend: [
      "Node.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "REST API Design",
      "Microservices",
      "System Architecture",
    ],
    interests: ["Philosophy", "Science", "Mathematics", "Public Speaking", "Communication"],
  },
  projects: [
    {
      title: "Atlas API Platform",
      description:
        "theridwanade led the design of a modular NestJS API platform with strict contracts, versioned endpoints, and observability-first workflows for multi-team development.",
      tags: ["Node.js", "NestJS", "REST", "OpenAPI", "PostgreSQL"],
      slug: "atlas-api-platform",
    },
    {
      title: "Relay Microservice Mesh",
      description:
        "theridwanade architected an event-driven microservice system with clear service boundaries, idempotent consumers, and resilient async communication under high throughput.",
      tags: ["Microservices", "Kafka", "Redis", "Docker", "Reliability"],
      slug: "relay-microservice-mesh",
    },
    {
      title: "Northbound System Core",
      description:
        "theridwanade implemented the core backend architecture for a distributed product, including auth, domain services, and performance profiling pipelines.",
      tags: ["System Design", "Node.js", "NestJS", "Auth", "Performance"],
      slug: "northbound-system-core",
    },
  ],
  talkAbstracts: [
    {
      title: "The Entropy of Technical Debt",
      description:
        "Technical debt grows when local optimizations override system-level reasoning. This talk frames debt through entropy and shows how to reduce architectural disorder with explicit constraints and review loops.",
    },
    {
      title: "First Principles in System Design",
      description:
        "When teams inherit complexity, patterns alone are not enough. This talk presents a first-principles method for evaluating trade-offs, defining invariants, and designing backend systems from fundamentals.",
    },
  ],
  speaking: [
    {
      topic: "The Entropy of Technical Debt",
      venue: "Jakarta Backend Meetup",
      date: "2025-11-14",
    },
    {
      topic: "First Principles in System Design",
      venue: "Node.js Architecture Forum",
      date: "2026-02-21",
    },
  ],
  metadata: {
    title: "Ridwan | Software Engineer",
    description:
      "Ridwan (theridwanade) is a software engineer, aspiring public speaker, and communicator who loves philosophy, science, and mathematics.",
    openGraph: {
      title: "Ridwan | Software Engineer",
      description:
        "Software engineering by Ridwan (theridwanade), with a focus on clear communication, public speaking, and first-principles thinking in philosophy, science, and mathematics.",
      url: "https://theridwanade.dev",
      siteName: "Ridwan",
      type: "website",
      locale: "en_US",
    },
  },
};
