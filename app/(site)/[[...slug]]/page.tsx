import type { Metadata } from "next";
import { notFound } from "next/navigation";
import config from "@/cms.config";
import { listRoutes, resolveRoute } from "@/cms/core/content";
import { getContent } from "@/cms/next/server";
import { RouteView } from "@/site/route-view";
import type { SiteSettings } from "@/site/types";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateStaticParams() {
  const content = await getContent();
  return listRoutes(config, content).map((route) => ({
    slug: route ? route.split("/") : [],
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const content = await getContent();
  const settings = content.settings as SiteSettings;
  const route = resolveRoute(config, content, slug);
  if (!route) return {};
  if (route.kind === "item") {
    return {
      title: `${String(route.item.title ?? route.item.id)} | ${settings.seoTitle}`,
      description: String(route.item.description || settings.seoDescription),
    };
  }
  const { page } = route;
  return {
    title: page.slug ? `${page.title} | ${settings.seoTitle}` : settings.seoTitle,
    description: page.seoDescription || settings.seoDescription,
  };
}

export default async function SitePage({ params }: Props) {
  const { slug = [] } = await params;
  if (!resolveRoute(config, await getContent(), slug)) notFound();
  return <RouteView segments={slug} />;
}
