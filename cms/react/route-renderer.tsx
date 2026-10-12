"use client";

import { notFound } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import type { CmsConfig } from "../core/schema";
import {
  resolveRoute,
  type Block,
  type CollectionItem,
  type Page,
} from "../core/content";
import { sendToAdmin, useContent, usePreviewMode } from "./provider";

export type BlockComponentProps<T = Record<string, unknown>> = {
  block: Block & T;
  // Posición del bloque en la página (el primero suele necesitar espacio
  // para el header fijo).
  index: number;
};

export type SiteComponents = {
  blocks: Record<string, ComponentType<BlockComponentProps<any>>>;
  templates: Record<string, ComponentType<{ item: CollectionItem }>>;
  PageShell: ComponentType<{ page: Page; children: ReactNode }>;
};

function BlockFrame({
  block,
  label,
  children,
}: {
  block: Block;
  label: string;
  children: ReactNode;
}) {
  const preview = usePreviewMode();
  if (!preview) return <div data-cms-block={block.id}>{children}</div>;
  return (
    <div
      data-cms-block={block.id}
      className="relative group/cms outline-2 outline-offset-[-2px] outline-sky-400 hover:outline-dashed"
    >
      <button
        type="button"
        onClick={() =>
          sendToAdmin({ source: "cms-preview", type: "select", blockId: block.id })
        }
        className="absolute left-3 top-3 z-[60] hidden rounded-md bg-sky-500 px-2.5 py-1 text-xs font-medium text-white shadow group-hover/cms:block"
      >
        Editar · {label}
      </button>
      {children}
    </div>
  );
}

export function RenderBlocks({
  config,
  components,
  blocks,
}: {
  config: CmsConfig;
  components: SiteComponents;
  blocks: Block[];
}) {
  return (
    <>
      {blocks.map((block, index) => {
        const Component = components.blocks[block.type];
        const definition = config.blocks.find((b) => b.type === block.type);
        if (!Component || !definition) return null;
        return (
          <BlockFrame key={block.id} block={block} label={definition.label}>
            <Component block={block} index={index} />
          </BlockFrame>
        );
      })}
    </>
  );
}

// Renderiza la ruta pedida a partir del contenido (publicado o borrador).
export function RouteRenderer({
  config,
  components,
  segments,
  allowMissing = false,
}: {
  config: CmsConfig;
  components: SiteComponents;
  segments: string[];
  // En la ruta de vista previa una página nueva todavía no existe en el
  // contenido publicado; se muestra un aviso en vez de un 404.
  allowMissing?: boolean;
}) {
  const content = useContent();
  const preview = usePreviewMode();
  const route = resolveRoute(config, content, segments);

  if (!route) {
    if (preview || allowMissing) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-950 p-8 text-center text-neutral-400">
          Esta página no existe en el borrador. Revisá la ruta en el panel.
        </div>
      );
    }
    notFound();
  }

  if (route.kind === "item") {
    const Template = components.templates[route.collection];
    return Template ? <Template item={route.item} /> : null;
  }

  const { PageShell } = components;
  return (
    <PageShell page={route.page}>
      <RenderBlocks
        config={config}
        components={components}
        blocks={route.page.blocks}
      />
    </PageShell>
  );
}
