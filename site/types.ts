import type { CollectionItem } from "@/cms/core/content";

export type SiteSettings = {
  siteName: string;
  seoTitle: string;
  seoDescription: string;
  nav: { label: string; href: string }[];
  socials: { label: string; url: string; icon: string }[];
  footerName: string;
  creditLabel: string;
  creditName: string;
  creditUrl: string;
};

export type Project = CollectionItem & {
  title: string;
  cardTitle?: string;
  description: string;
  client: string;
  year: string;
  services: string[];
  image: string;
  images: string[];
  logos: string[];
};
