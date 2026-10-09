"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  LogOut,
  Monitor,
  Plus,
  Settings,
  Smartphone,
  Tablet,
  Trash2,
  Undo2,
} from "lucide-react";
import {
  defaultForField,
  type CmsConfig,
  type CollectionDefinition,
} from "../core/schema";
import {
  RESERVED_SLUGS,
  newId,
  normalizeSlug,
  resolveRoute,
  type Block,
  type CmsContent,
  type CollectionItem,
  type Page,
} from "../core/content";
import type { AdminMessage, PreviewMessage } from "../core/preview";
import { EditorContext, FieldsEditor, moveItem } from "./fields";
import { Button, FieldLabel, IconButton, cx, inputClass } from "./ui";

type Selection =
  | { kind: "settings" }
  | { kind: "page"; id: string }
  | { kind: "item"; collection: string; id: string };

type Device = "desktop" | "tablet" | "mobile";
const DEVICE_WIDTH: Record<Device, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "390px",
};

const PREVIEW_PREFIX = "/cms-preview";

type NavItem = { label: string; href: string };

function pathFor(selection: Selection, content: CmsContent, config: CmsConfig) {
  if (selection.kind === "page") {
    const page = content.pages.find((p) => p.id === selection.id);
    return page ? "/" + page.slug : null;
  }
  if (selection.kind === "item") {
    const collection = config.collections.find((c) => c.name === selection.collection);
    return collection?.path ? `/${collection.path}/${selection.id}` : null;
  }
  return null;
}

function nextItemId(items: CollectionItem[], title: string) {
  if (items.length && items.every((i) => /^\d+$/.test(i.id))) {
    return String(Math.max(...items.map((i) => Number(i.id))) + 1);
  }
  const base = normalizeSlug(title).replace(/\//g, "-") || "item";
  let id = base;
  for (let n = 2; items.some((i) => i.id === id); n++) id = `${base}-${n}`;
  return id;
}

// Recorre los bloques y aplica `fn` a cada referencia hacia la colección.
function mapReferences(
  content: CmsContent,
  config: CmsConfig,
  collection: string,
  fn: (ids: string[]) => string[]
): CmsContent {
  return {
    ...content,
    pages: content.pages.map((page) => ({
      ...page,
      blocks: page.blocks.map((block) => {
        const definition = config.blocks.find((b) => b.type === block.type);
        let next = block;
        for (const field of definition?.fields ?? []) {
          if (field.type !== "reference" || field.collection !== collection) continue;
          const current = block[field.name];
          if (Array.isArray(current)) {
            next = { ...next, [field.name]: fn(current as string[]) };
          } else if (typeof current === "string" && current) {
            next = { ...next, [field.name]: fn([current])[0] ?? "" };
          }
        }
        return next;
      }),
    })),
  };
}

export function AdminApp({
  config,
  initialContent,
  storage,
}: {
  config: CmsConfig;
  initialContent: CmsContent;
  storage: "filesystem" | "github";
}) {
  const [saved, setSaved] = useState(initialContent);
  const [draft, setDraft] = useState(initialContent);
  const [selection, setSelection] = useState<Selection>(
    initialContent.pages[0]
      ? { kind: "page", id: initialContent.pages[0].id }
      : { kind: "settings" }
  );
  const [openBlock, setOpenBlock] = useState<string | null>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [status, setStatus] = useState<
    { state: "idle" } | { state: "saving" } | { state: "saved" } | { state: "error"; message: string }
  >({ state: "idle" });

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewReady = useRef(false);
  const previewPath = useRef<string | null>(null);
  const draftRef = useRef(draft);
  draftRef.current = draft;

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(saved),
    [draft, saved]
  );

  const [initialSrc] = useState(() => {
    const path = pathFor(selection, initialContent, config) ?? "/";
    return PREVIEW_PREFIX + (path === "/" ? "" : path);
  });

  const post = useCallback((message: AdminMessage) => {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);

  // Cada cambio del borrador se manda al iframe.
  useEffect(() => {
    if (previewReady.current) post({ source: "cms-admin", type: "content", content: draft });
  }, [draft, post]);

  const selectionForPath = useCallback(
    (path: string): Selection | null => {
      const segments = path.split("/").filter(Boolean);
      const route = resolveRoute(config, draftRef.current, segments);
      if (!route) return null;
      return route.kind === "page"
        ? { kind: "page", id: route.page.id }
        : { kind: "item", collection: route.collection, id: route.item.id };
    },
    [config]
  );

  useEffect(() => {
    function onMessage(event: MessageEvent<PreviewMessage>) {
      if (event.origin !== window.location.origin) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const message = event.data;
      if (message?.source !== "cms-preview") return;

      if (message.type === "ready") {
        previewReady.current = true;
        previewPath.current = message.path;
        post({ source: "cms-admin", type: "content", content: draftRef.current });
      }
      if (message.type === "navigate") {
        previewPath.current = message.path;
        const next = selectionForPath(message.path);
        if (next) {
          setSelection((current) =>
            JSON.stringify(current) === JSON.stringify(next) ? current : next
          );
        }
      }
      if (message.type === "select") {
        const page = draftRef.current.pages.find((p) =>
          p.blocks.some((b) => b.id === message.blockId)
        );
        if (page) {
          setSelection({ kind: "page", id: page.id });
          setOpenBlock(message.blockId);
          requestAnimationFrame(() =>
            document
              .getElementById(`block-editor-${message.blockId}`)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          );
        }
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [post, selectionForPath]);

  // Al elegir otra página o elemento, el iframe navega hasta ahí.
  const targetPath = pathFor(selection, draft, config);
  useEffect(() => {
    if (!targetPath || !previewReady.current) return;
    if (targetPath === previewPath.current) return;
    previewPath.current = targetPath;
    post({ source: "cms-admin", type: "navigate", path: targetPath });
  }, [targetPath, post]);

  const save = useCallback(async () => {
    setStatus({ state: "saving" });
    const content = draftRef.current;
    const res = await fetch("/api/cms/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    }).catch(() => null);
    if (!res) {
      setStatus({ state: "error", message: "Sin conexión con el servidor" });
      return;
    }
    if (res.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus({ state: "error", message: data.error || "No se pudo guardar" });
      return;
    }
    setSaved(content);
    setStatus({ state: "saved" });
  }, []);

  // Ctrl/Cmd + S guarda; avisa antes de salir con cambios sin guardar.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        save();
      }
    }
    function onBeforeUnload(e: BeforeUnloadEvent) {
      if (dirty) e.preventDefault();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [save, dirty]);

  useEffect(() => {
    if (status.state !== "saved") return;
    const t = setTimeout(() => setStatus({ state: "idle" }), 2500);
    return () => clearTimeout(t);
  }, [status]);

  // --- Mutaciones del borrador ---------------------------------------------

  const navField = config.settings.navField;
  const nav = (navField ? (draft.settings[navField] as NavItem[]) : null) ?? [];

  function updatePage(id: string, fn: (page: Page) => Page) {
    setDraft((d) => ({ ...d, pages: d.pages.map((p) => (p.id === id ? fn(p) : p)) }));
  }

  function setNav(fn: (items: NavItem[]) => NavItem[]) {
    if (!navField) return;
    setDraft((d) => ({
      ...d,
      settings: {
        ...d.settings,
        [navField]: fn((d.settings[navField] as NavItem[]) ?? []),
      },
    }));
  }

  function addPage() {
    const title = window.prompt("Nombre de la nueva página");
    if (!title?.trim()) return;
    let slug = normalizeSlug(title) || "pagina";
    while (
      draft.pages.some((p) => p.slug === slug) ||
      RESERVED_SLUGS.includes(slug.split("/")[0])
    ) {
      slug += "-2";
    }
    const titleBlock = config.blocks.find((b) => b.type === "pageTitle");
    const page: Page = {
      id: newId("page"),
      title: title.trim(),
      slug,
      seoDescription: "",
      blocks: titleBlock
        ? [{ id: newId(), type: titleBlock.type, ...titleBlock.defaults, title: title.trim() }]
        : [],
    };
    setDraft((d) => ({ ...d, pages: [...d.pages, page] }));
    setSelection({ kind: "page", id: page.id });
  }

  function deletePage(page: Page) {
    const warning = page.slug === "" ? "Es la portada del sitio. " : "";
    if (!window.confirm(`${warning}¿Borrar la página "${page.title}"?`)) return;
    setDraft((d) => ({ ...d, pages: d.pages.filter((p) => p.id !== page.id) }));
    setNav((items) => items.filter((i) => i.href !== "/" + page.slug));
    setSelection({ kind: "settings" });
  }

  function changeSlug(page: Page, raw: string) {
    const slug = normalizeSlug(raw);
    const oldHref = "/" + page.slug;
    updatePage(page.id, (p) => ({ ...p, slug }));
    setNav((items) =>
      items.map((i) => (i.href === oldHref ? { ...i, href: "/" + slug } : i))
    );
  }

  function addBlock(pageId: string, type: string) {
    const definition = config.blocks.find((b) => b.type === type);
    if (!definition) return;
    const defaults = Object.fromEntries(
      definition.fields.map((f) => [f.name, defaultForField(f)])
    );
    const block: Block = {
      id: newId(),
      type,
      ...defaults,
      ...structuredClone(definition.defaults),
    };
    updatePage(pageId, (p) => ({ ...p, blocks: [...p.blocks, block] }));
    setOpenBlock(block.id);
    requestAnimationFrame(() => {
      document
        .getElementById(`block-editor-${block.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      post({ source: "cms-admin", type: "focus", blockId: block.id });
    });
  }

  function addItem(collection: CollectionDefinition) {
    const items = draft.collections[collection.name] ?? [];
    const defaults = Object.fromEntries(
      collection.fields.map((f) => [f.name, defaultForField(f)])
    );
    const title = String(collection.defaults[collection.titleField] ?? "Nuevo");
    const item: CollectionItem = {
      ...defaults,
      ...structuredClone(collection.defaults),
      id: nextItemId(items, title),
    };
    setDraft((d) => ({
      ...d,
      collections: { ...d.collections, [collection.name]: [...items, item] },
    }));
    setSelection({ kind: "item", collection: collection.name, id: item.id });
  }

  function updateItem(collection: string, id: string, item: CollectionItem) {
    setDraft((d) => {
      let next: CmsContent = {
        ...d,
        collections: {
          ...d.collections,
          [collection]: d.collections[collection].map((i) => (i.id === id ? item : i)),
        },
      };
      if (item.id !== id) {
        next = mapReferences(next, config, collection, (ids) =>
          ids.map((x) => (x === id ? item.id : x))
        );
      }
      return next;
    });
    if (item.id !== id) setSelection({ kind: "item", collection, id: item.id });
  }

  function deleteItem(collection: CollectionDefinition, item: CollectionItem) {
    const title = String(item[collection.titleField] ?? item.id);
    if (!window.confirm(`¿Borrar "${title}"?`)) return;
    setDraft((d) =>
      mapReferences(
        {
          ...d,
          collections: {
            ...d.collections,
            [collection.name]: d.collections[collection.name].filter((i) => i.id !== item.id),
          },
        },
        config,
        collection.name,
        (ids) => ids.filter((x) => x !== item.id)
      )
    );
    setSelection({ kind: "settings" });
  }

  function moveCollectionItem(collection: string, from: number, to: number) {
    setDraft((d) => ({
      ...d,
      collections: {
        ...d.collections,
        [collection]: moveItem(d.collections[collection], from, to),
      },
    }));
  }

  // --- Render ----------------------------------------------------------------

  const selectedPage =
    selection.kind === "page" ? draft.pages.find((p) => p.id === selection.id) : undefined;
  const selectedCollection =
    selection.kind === "item"
      ? config.collections.find((c) => c.name === selection.collection)
      : undefined;
  const selectedItem =
    selection.kind === "item"
      ? draft.collections[selection.collection]?.find((i) => i.id === selection.id)
      : undefined;

  return (
    <EditorContext.Provider value={{ config, content: draft }}>
      <div className="flex h-screen flex-col bg-neutral-100 text-neutral-900">
        {/* Barra superior */}
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
          <span className="text-sm font-semibold">{config.name}</span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-500">
            {storage === "github" ? "Guarda en GitHub" : "Guarda en disco"}
          </span>
          <div className="ml-auto flex items-center gap-1">
            {(["desktop", "tablet", "mobile"] as Device[]).map((d) => {
              const Icon = d === "desktop" ? Monitor : d === "tablet" ? Tablet : Smartphone;
              return (
                <IconButton
                  key={d}
                  label={d === "desktop" ? "Escritorio" : d === "tablet" ? "Tablet" : "Celular"}
                  className={cx(device === d && "bg-neutral-100 text-neutral-900")}
                  onClick={() => setDevice(d)}
                >
                  <Icon className="h-4 w-4" />
                </IconButton>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {status.state === "error" && (
              <span className="max-w-xs truncate text-xs text-red-600" title={status.message}>
                {status.message}
              </span>
            )}
            {status.state === "saved" && (
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                <Check className="h-3.5 w-3.5" /> Guardado
              </span>
            )}
            {dirty && status.state !== "saving" && (
              <span className="text-xs text-amber-600">Cambios sin guardar</span>
            )}
            <Button
              variant="ghost"
              disabled={!dirty}
              onClick={() => {
                if (window.confirm("¿Descartar todos los cambios sin guardar?")) setDraft(saved);
              }}
            >
              <Undo2 className="h-4 w-4" /> Descartar
            </Button>
            <Button variant="primary" disabled={!dirty || status.state === "saving"} onClick={save}>
              {status.state === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
              Guardar
            </Button>
            <a
              href={targetPath ?? "/"}
              target="_blank"
              rel="noreferrer"
              title="Ver sitio publicado"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <IconButton
              label="Cerrar sesión"
              onClick={async () => {
                await fetch("/api/cms/logout", { method: "POST" });
                window.location.href = "/admin/login";
              }}
            >
              <LogOut className="h-4 w-4" />
            </IconButton>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* Navegación */}
          <nav className="w-56 shrink-0 overflow-y-auto border-r border-neutral-200 bg-white p-3 text-sm">
            <SidebarButton
              active={selection.kind === "settings"}
              onClick={() => setSelection({ kind: "settings" })}
            >
              <Settings className="h-4 w-4" /> Ajustes del sitio
            </SidebarButton>

            <SidebarHeading onAdd={addPage} addLabel="Nueva página">
              Páginas
            </SidebarHeading>
            {draft.pages.map((page) => (
              <SidebarButton
                key={page.id}
                active={selection.kind === "page" && selection.id === page.id}
                onClick={() => setSelection({ kind: "page", id: page.id })}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span className="truncate">{page.title || "Sin título"}</span>
                <span className="ml-auto truncate text-[11px] text-neutral-400">/{page.slug}</span>
              </SidebarButton>
            ))}

            {config.collections.map((collection) => (
              <div key={collection.name}>
                <SidebarHeading
                  onAdd={() => addItem(collection)}
                  addLabel={`Nuevo ${collection.singularLabel.toLowerCase()}`}
                >
                  {collection.label}
                </SidebarHeading>
                {(draft.collections[collection.name] ?? []).map((item, i, items) => (
                  <div key={item.id} className="group flex items-center">
                    <SidebarButton
                      active={
                        selection.kind === "item" &&
                        selection.collection === collection.name &&
                        selection.id === item.id
                      }
                      onClick={() =>
                        setSelection({ kind: "item", collection: collection.name, id: item.id })
                      }
                    >
                      {collection.imageField && item[collection.imageField] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={String(item[collection.imageField])}
                          alt=""
                          className="h-5 w-5 shrink-0 rounded object-cover"
                        />
                      ) : null}
                      <span className="truncate">
                        {String(item[collection.titleField] || item.id)}
                      </span>
                    </SidebarButton>
                    <div className="hidden shrink-0 group-hover:flex">
                      <IconButton
                        label="Subir"
                        className="h-6 w-5"
                        disabled={i === 0}
                        onClick={() => moveCollectionItem(collection.name, i, i - 1)}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </IconButton>
                      <IconButton
                        label="Bajar"
                        className="h-6 w-5"
                        disabled={i === items.length - 1}
                        onClick={() => moveCollectionItem(collection.name, i, i + 1)}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </nav>

          {/* Editor */}
          <section className="w-[420px] shrink-0 overflow-y-auto border-r border-neutral-200 bg-white">
            {selection.kind === "settings" && (
              <Panel title="Ajustes del sitio">
                <FieldsEditor
                  fields={config.settings.fields}
                  value={draft.settings}
                  onChange={(settings) => setDraft((d) => ({ ...d, settings }))}
                />
              </Panel>
            )}

            {selectedPage && (
              <PageEditor
                key={selectedPage.id}
                config={config}
                page={selectedPage}
                inNav={nav.some((i) => i.href === "/" + selectedPage.slug)}
                navEnabled={Boolean(navField)}
                openBlock={openBlock}
                onOpenBlock={(id) => {
                  setOpenBlock(id);
                  if (id) post({ source: "cms-admin", type: "focus", blockId: id });
                }}
                onChange={(fn) => updatePage(selectedPage.id, fn)}
                onSlugChange={(slug) => changeSlug(selectedPage, slug)}
                onToggleNav={(show) =>
                  setNav((items) =>
                    show
                      ? [...items, { label: selectedPage.title, href: "/" + selectedPage.slug }]
                      : items.filter((i) => i.href !== "/" + selectedPage.slug)
                  )
                }
                onAddBlock={(type) => addBlock(selectedPage.id, type)}
                onDelete={() => deletePage(selectedPage)}
              />
            )}

            {selectedCollection && selectedItem && (
              <Panel
                title={String(selectedItem[selectedCollection.titleField] || selectedItem.id)}
                subtitle={selectedCollection.singularLabel}
                actions={
                  <Button variant="danger" size="sm" onClick={() => deleteItem(selectedCollection, selectedItem)}>
                    <Trash2 className="h-3.5 w-3.5" /> Borrar
                  </Button>
                }
              >
                <div className="space-y-4">
                  <FieldLabel
                    label="Identificador"
                    help={
                      selectedCollection.path
                        ? `Se usa en la URL: /${selectedCollection.path}/${selectedItem.id}`
                        : undefined
                    }
                  >
                    <IdInput
                      value={selectedItem.id}
                      taken={(draft.collections[selectedCollection.name] ?? [])
                        .map((i) => i.id)
                        .filter((id) => id !== selectedItem.id)}
                      onChange={(id) =>
                        updateItem(selectedCollection.name, selectedItem.id, { ...selectedItem, id })
                      }
                    />
                  </FieldLabel>
                  <FieldsEditor
                    fields={selectedCollection.fields}
                    value={selectedItem}
                    onChange={(value) =>
                      updateItem(selectedCollection.name, selectedItem.id, {
                        ...(value as CollectionItem),
                        id: selectedItem.id,
                      })
                    }
                  />
                </div>
              </Panel>
            )}
          </section>

          {/* Vista previa */}
          <section className="flex min-w-0 flex-1 justify-center overflow-auto p-4">
            <iframe
              ref={iframeRef}
              src={initialSrc}
              title="Vista previa"
              className="h-full rounded-md border border-neutral-200 bg-black shadow-sm transition-[width] duration-300"
              style={{ width: DEVICE_WIDTH[device] }}
            />
          </section>
        </div>
      </div>
    </EditorContext.Provider>
  );
}

function IdInput({
  value,
  taken,
  onChange,
}: {
  value: string;
  taken: string[];
  onChange: (id: string) => void;
}) {
  const [text, setText] = useState(value);
  useEffect(() => setText(value), [value]);
  const clean = normalizeSlug(text).replace(/\//g, "-");
  const problem = !clean ? "No puede estar vacío" : taken.includes(clean) ? "Ya existe" : null;
  return (
    <div>
      <input
        className={inputClass}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          if (!problem && clean !== value) onChange(clean);
          else setText(value);
        }}
      />
      {problem && text !== value && <p className="mt-1 text-xs text-red-600">{problem}</p>}
    </div>
  );
}

function PageEditor({
  config,
  page,
  inNav,
  navEnabled,
  openBlock,
  onOpenBlock,
  onChange,
  onSlugChange,
  onToggleNav,
  onAddBlock,
  onDelete,
}: {
  config: CmsConfig;
  page: Page;
  inNav: boolean;
  navEnabled: boolean;
  openBlock: string | null;
  onOpenBlock: (id: string | null) => void;
  onChange: (fn: (page: Page) => Page) => void;
  onSlugChange: (slug: string) => void;
  onToggleNav: (show: boolean) => void;
  onAddBlock: (type: string) => void;
  onDelete: () => void;
}) {
  const [picker, setPicker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  function updateBlock(id: string, value: Record<string, unknown>) {
    onChange((p) => ({
      ...p,
      blocks: p.blocks.map((b) => (b.id === id ? ({ ...value, id: b.id, type: b.type } as Block) : b)),
    }));
  }

  return (
    <Panel
      title={page.title || "Sin título"}
      subtitle={`Página · /${page.slug}`}
      actions={
        <Button variant="danger" size="sm" onClick={onDelete}>
          <Trash2 className="h-3.5 w-3.5" /> Borrar
        </Button>
      }
    >
      <div className="mb-5 rounded-md border border-neutral-200">
        <button
          type="button"
          className="flex w-full items-center gap-1.5 px-3 py-2 text-left text-sm font-medium"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          Datos de la página
        </button>
        {showSettings && (
          <div className="space-y-4 border-t border-neutral-200 p-3">
            <FieldLabel label="Nombre">
              <input
                className={inputClass}
                value={page.title}
                onChange={(e) => onChange((p) => ({ ...p, title: e.target.value }))}
              />
            </FieldLabel>
            <FieldLabel
              label="Ruta"
              help={page.slug === "" ? "Vacía: es la portada del sitio." : `URL: /${page.slug}`}
            >
              <div className="flex items-center">
                <span className="mr-1 text-sm text-neutral-500">/</span>
                <input
                  className={inputClass}
                  value={page.slug}
                  onChange={(e) => onSlugChange(e.target.value)}
                />
              </div>
            </FieldLabel>
            <FieldLabel label="Descripción para buscadores">
              <textarea
                className={cx(inputClass, "min-h-[72px]")}
                value={page.seoDescription ?? ""}
                onChange={(e) => onChange((p) => ({ ...p, seoDescription: e.target.value }))}
              />
            </FieldLabel>
            {navEnabled && (
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-neutral-900"
                  checked={inNav}
                  onChange={(e) => onToggleNav(e.target.checked)}
                />
                Mostrar en el menú
              </label>
            )}
          </div>
        )}
      </div>

      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
        Bloques
      </div>
      <div className="space-y-2">
        {page.blocks.map((block, i) => {
          const definition = config.blocks.find((b) => b.type === block.type);
          if (!definition) return null;
          const open = openBlock === block.id;
          const summary = definition.fields
            .filter((f) => f.type === "text")
            .map((f) => block[f.name])
            .find((v) => typeof v === "string" && v.trim()) as string | undefined;
          return (
            <div
              key={block.id}
              id={`block-editor-${block.id}`}
              className={cx(
                "scroll-mt-4 rounded-md border bg-white",
                open ? "border-neutral-900" : "border-neutral-200"
              )}
            >
              <div className="flex items-center gap-1 pl-2">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-1.5 py-2 text-left"
                  onClick={() => onOpenBlock(open ? null : block.id)}
                >
                  {open ? (
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  ) : (
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  )}
                  <span className="shrink-0 text-sm font-medium">{definition.label}</span>
                  {summary && (
                    <span className="truncate text-xs text-neutral-500">· {summary}</span>
                  )}
                </button>
                <IconButton
                  label="Subir"
                  disabled={i === 0}
                  onClick={() => onChange((p) => ({ ...p, blocks: moveItem(p.blocks, i, i - 1) }))}
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Bajar"
                  disabled={i === page.blocks.length - 1}
                  onClick={() => onChange((p) => ({ ...p, blocks: moveItem(p.blocks, i, i + 1) }))}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Duplicar"
                  onClick={() =>
                    onChange((p) => {
                      const blocks = [...p.blocks];
                      blocks.splice(i + 1, 0, { ...structuredClone(block), id: newId() });
                      return { ...p, blocks };
                    })
                  }
                >
                  <Copy className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Borrar bloque"
                  className="mr-1 hover:text-red-600"
                  onClick={() => {
                    if (window.confirm(`¿Borrar el bloque "${definition.label}"?`))
                      onChange((p) => ({ ...p, blocks: p.blocks.filter((b) => b.id !== block.id) }));
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </IconButton>
              </div>
              {open && (
                <div className="border-t border-neutral-200 p-3">
                  <FieldsEditor
                    fields={definition.fields}
                    value={block}
                    onChange={(value) => updateBlock(block.id, value)}
                  />
                </div>
              )}
            </div>
          );
        })}
        {page.blocks.length === 0 && (
          <p className="rounded-md border border-dashed border-neutral-300 p-4 text-center text-sm text-neutral-500">
            Esta página no tiene bloques todavía.
          </p>
        )}
      </div>

      <div className="relative mt-3">
        <Button className="w-full" onClick={() => setPicker(!picker)}>
          <Plus className="h-4 w-4" /> Agregar bloque
        </Button>
        {picker && (
          <div className="absolute inset-x-0 z-10 mt-1 max-h-80 overflow-y-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg">
            {config.blocks.map((b) => (
              <button
                key={b.type}
                type="button"
                className="block w-full rounded px-3 py-2 text-left hover:bg-neutral-100"
                onClick={() => {
                  onAddBlock(b.type);
                  setPicker(false);
                }}
              >
                <div className="text-sm font-medium">{b.label}</div>
                {b.description && <div className="text-xs text-neutral-500">{b.description}</div>}
              </button>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}

function Panel({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          {subtitle && <div className="text-xs text-neutral-500">{subtitle}</div>}
          <h1 className="truncate text-lg font-semibold">{title}</h1>
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

function SidebarHeading({
  children,
  onAdd,
  addLabel,
}: {
  children: ReactNode;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="mb-1 mt-5 flex items-center justify-between px-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
        {children}
      </span>
      <IconButton label={addLabel} className="h-6 w-6" onClick={onAdd}>
        <Plus className="h-3.5 w-3.5" />
      </IconButton>
    </div>
  );
}

function SidebarButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "flex w-full min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left",
        active ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"
      )}
    >
      {children}
    </button>
  );
}
