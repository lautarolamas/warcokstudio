"use client";

import config from "@/cms.config";
import { RouteRenderer, type SiteComponents } from "@/cms/react/route-renderer";
import { PageShell } from "./page-shell";
import { Hero } from "./blocks/hero";
import { ProjectGrid } from "./blocks/project-grid";
import { Contact } from "./blocks/contact";
import {
  Cta,
  ImageGallery,
  PageTitle,
  Profile,
  RichText,
  Services,
  TextBanner,
} from "./blocks/text-blocks";
import { ProjectDetail } from "./templates/project-detail";

// Componentes que dibujan cada tipo de bloque y cada plantilla de colección
// declarados en cms.config.ts.
const components: SiteComponents = {
  blocks: {
    hero: Hero,
    projectGrid: ProjectGrid,
    pageTitle: PageTitle,
    richText: RichText,
    profile: Profile,
    services: Services,
    cta: Cta,
    textBanner: TextBanner,
    imageGallery: ImageGallery,
    contact: Contact,
  },
  templates: { projects: ProjectDetail },
  PageShell,
};

export function RouteView({
  segments,
  allowMissing,
}: {
  segments: string[];
  allowMissing?: boolean;
}) {
  return (
    <RouteRenderer
      config={config}
      components={components}
      segments={segments}
      allowMissing={allowMissing}
    />
  );
}
