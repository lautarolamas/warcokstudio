import type { CmsConfig } from "./schema";

export type Block = { id: string; type: string; [key: string]: unknown };

export type Page = {
  id: string;
  title: string;
  // Ruta sin barra inicial; "" es la portada.
  slug: string;
  seoDescription?: string;
  blocks: Block[];
};

export type CollectionItem = { id: string; [key: string]: unknown };

export type CmsContent = {
  settings: Record<string, unknown>;
  collections: Record<string, CollectionItem[]>;
  pages: Page[];
};

// Segmentos que el sitio no puede usar como slug porque son rutas del CMS.
export const RESERVED_SLUGS = ["admin", "api", "cms-preview", "uploads"];

export function newId(prefix = "b") {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9/-]+/g, "-")
    .replace(/\/+/g, "/")
    .replace(/^[-/]+|[-/]+$/g, "");
}

export function pageHref(page: Pick<Page, "slug">) {
  return "/" + page.slug;
}

export type ResolvedRoute =
  | { kind: "page"; page: Page }
  | { kind: "item"; collection: string; item: CollectionItem };

// Resuelve una ruta del sitio (segmentos de URL) a una página o a un elemento
// de una colección con `path`.
export function resolveRoute(
  config: CmsConfig,
  content: CmsContent,
  segments: string[]
): ResolvedRoute | null {
  const path = segments.map(decodeURIComponent).join("/");
  const page = content.pages.find((p) => p.slug === path);
  if (page) return { kind: "page", page };

  for (const collection of config.collections) {
    if (!collection.path) continue;
    const prefix = collection.path + "/";
    if (path.startsWith(prefix)) {
      const id = path.slice(prefix.length);
      const item = content.collections[collection.name]?.find(
        (i) => i.id === id
      );
      if (item) return { kind: "item", collection: collection.name, item };
    }
  }
  return null;
}

export function listRoutes(config: CmsConfig, content: CmsContent) {
  const routes = content.pages.map((p) => p.slug);
  for (const collection of config.collections) {
    if (!collection.path) continue;
    for (const item of content.collections[collection.name] ?? []) {
      routes.push(`${collection.path}/${item.id}`);
    }
  }
  return routes;
}

// Validación mínima antes de guardar: la forma general y que no haya slugs
// repetidos o reservados.
export function validateContent(
  config: CmsConfig,
  content: unknown
): string | null {
  if (!content || typeof content !== "object") return "Contenido inválido";
  const c = content as CmsContent;
  if (!c.settings || typeof c.settings !== "object")
    return "Faltan los ajustes del sitio";
  if (!Array.isArray(c.pages)) return "Faltan las páginas";
  if (!c.collections || typeof c.collections !== "object")
    return "Faltan las colecciones";

  const slugs = new Set<string>();
  for (const page of c.pages) {
    if (typeof page.slug !== "string" || !Array.isArray(page.blocks))
      return `La página "${page.title}" está incompleta`;
    if (slugs.has(page.slug))
      return `Hay dos páginas con la ruta "/${page.slug}"`;
    if (RESERVED_SLUGS.includes(page.slug.split("/")[0]))
      return `La ruta "/${page.slug}" está reservada`;
    slugs.add(page.slug);
    for (const block of page.blocks) {
      if (!config.blocks.some((b) => b.type === block.type))
        return `Tipo de bloque desconocido: ${block.type}`;
    }
  }

  for (const collection of config.collections) {
    const items = c.collections[collection.name];
    if (!Array.isArray(items))
      return `Falta la colección ${collection.label}`;
    const ids = new Set<string>();
    for (const item of items) {
      if (!item.id) return `Hay un elemento sin id en ${collection.label}`;
      if (ids.has(item.id))
        return `Hay dos elementos con el id "${item.id}" en ${collection.label}`;
      ids.add(item.id);
    }
  }
  return null;
}
