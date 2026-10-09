"use client";

import { createContext, useContext, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  ImagePlus,
  Images,
  Loader2,
  Plus,
  X,
} from "lucide-react";
import {
  defaultForField,
  type CmsConfig,
  type Field,
  type ItemField,
} from "../core/schema";
import type { CmsContent } from "../core/content";
import { Button, FieldLabel, IconButton, cx, inputClass } from "./ui";

type EditorContextValue = { config: CmsConfig; content: CmsContent };
export const EditorContext = createContext<EditorContextValue | null>(null);

function useEditor() {
  const value = useContext(EditorContext);
  if (!value) throw new Error("Falta EditorContext");
  return value;
}

const IMAGE_RE = /\.(webp|jpe?g|png|gif|avif|svg)$/i;

// Todas las imágenes que ya usa el contenido, para reutilizarlas.
function collectImages(value: unknown, found = new Set<string>()) {
  if (typeof value === "string") {
    if (value.startsWith("/") && IMAGE_RE.test(value)) found.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectImages(v, found));
  } else if (value && typeof value === "object") {
    Object.values(value).forEach((v) => collectImages(v, found));
  }
  return found;
}

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/cms/media", { method: "POST", body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "No se pudo subir la imagen");
  return data.url;
}

export function moveItem<T>(list: T[], from: number, to: number) {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function FieldsEditor({
  fields,
  value,
  onChange,
}: {
  fields: Field[];
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
}) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <FieldLabel key={field.name} label={field.label} help={field.help}>
          <FieldInput
            field={field}
            value={value[field.name] ?? defaultForField(field)}
            onChange={(v) => onChange({ ...value, [field.name]: v })}
          />
        </FieldLabel>
      ))}
    </div>
  );
}

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field | ItemField;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return field.multiline ? (
        <textarea
          className={cx(inputClass, "min-h-[96px] resize-y")}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputClass}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    case "number":
      return (
        <input
          type="number"
          className={cx(inputClass, "w-28")}
          min={field.min}
          value={Number(value ?? 0)}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      );
    case "boolean":
      return (
        <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
          <input
            type="checkbox"
            className="h-4 w-4 accent-neutral-900"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
          Sí
        </label>
      );
    case "select":
      return (
        <select
          className={inputClass}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      );
    case "image":
      return <ImageInput value={String(value ?? "")} onChange={onChange} />;
    case "object":
      return (
        <div className="rounded-md border border-neutral-200 p-3">
          <FieldsEditor
            fields={field.fields}
            value={(value ?? {}) as Record<string, unknown>}
            onChange={onChange}
          />
        </div>
      );
    case "list":
      return field.of.type === "image" ? (
        <ImageListInput value={(value ?? []) as string[]} onChange={onChange} />
      ) : (
        <ListInput
          of={field.of}
          itemLabel={field.itemLabel}
          value={(value ?? []) as unknown[]}
          onChange={onChange}
        />
      );
    case "reference":
      return (
        <ReferenceInput
          collection={field.collection}
          multiple={field.multiple}
          value={value}
          onChange={onChange}
        />
      );
  }
}

function ListInput({
  of,
  itemLabel,
  value,
  onChange,
}: {
  of: ItemField;
  itemLabel?: string;
  value: unknown[];
  onChange: (value: unknown[]) => void;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const isObject = of.type === "object";

  return (
    <div className="space-y-1.5">
      {value.map((item, i) => {
        const controls = (
          <div className="flex shrink-0">
            <IconButton label="Subir" disabled={i === 0} onClick={() => onChange(moveItem(value, i, i - 1))}>
              <ArrowUp className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton
              label="Bajar"
              disabled={i === value.length - 1}
              onClick={() => onChange(moveItem(value, i, i + 1))}
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </IconButton>
            <IconButton label="Quitar" onClick={() => onChange(value.filter((_, j) => j !== i))}>
              <X className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        );

        if (!isObject) {
          return (
            <div key={i} className="flex items-start gap-1">
              <div className="flex-1">
                <FieldInput
                  field={of}
                  value={item}
                  onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
                />
              </div>
              {controls}
            </div>
          );
        }

        const record = (item ?? {}) as Record<string, unknown>;
        const title = (itemLabel && String(record[itemLabel] || "")) || `Elemento ${i + 1}`;
        return (
          <div key={i} className="rounded-md border border-neutral-200 bg-neutral-50">
            <div className="flex items-center gap-1 pl-1.5">
              <button
                type="button"
                className="flex flex-1 items-center gap-1 py-1.5 text-left text-sm text-neutral-800"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {open === i ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                <span className="truncate">{title}</span>
              </button>
              {controls}
            </div>
            {open === i && (
              <div className="border-t border-neutral-200 bg-white p-3">
                <FieldInput
                  field={of}
                  value={record}
                  onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))}
                />
              </div>
            )}
          </div>
        );
      })}
      <Button
        size="sm"
        onClick={() => {
          onChange([...value, defaultForField(of)]);
          if (isObject) setOpen(value.length);
        }}
      >
        <Plus className="h-3.5 w-3.5" /> Agregar
      </Button>
    </div>
  );
}

function MediaPicker({
  onPick,
  onClose,
}: {
  onPick: (url: string) => void;
  onClose: () => void;
}) {
  const { content } = useEditor();
  const images = useMemo(() => [...collectImages(content)].sort(), [content]);
  const [query, setQuery] = useState("");
  const filtered = images.filter((src) =>
    src.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6" onClick={onClose}>
      <div
        className="flex max-h-full w-full max-w-3xl flex-col rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 p-3">
          <input
            autoFocus
            className={inputClass}
            placeholder="Buscar imagen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <IconButton label="Cerrar" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
        <div className="grid grid-cols-3 gap-2 overflow-y-auto p-3 sm:grid-cols-4">
          {filtered.map((src) => (
            <button
              key={src}
              type="button"
              title={src}
              onClick={() => onPick(src)}
              className="group overflow-hidden rounded-md border border-neutral-200 text-left hover:border-neutral-900"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              <div className="truncate px-1.5 py-1 text-[10px] text-neutral-500">
                {src.split("/").pop()}
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-neutral-500">
              No hay imágenes que coincidan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function upload(files: FileList | null, onDone: (urls: string[]) => void) {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) urls.push(await uploadImage(file));
      onDone(urls);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  }
  return { uploading, error, upload };
}

function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [picking, setPicking] = useState(false);
  const { uploading, error, upload } = useUpload();

  return (
    <div className="flex gap-3">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <input
          className={inputClass}
          value={value}
          placeholder="/ruta/a/imagen.webp"
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="flex gap-1.5">
          <Button size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
            Subir
          </Button>
          <Button size="sm" onClick={() => setPicking(true)}>
            <Images className="h-3.5 w-3.5" /> Elegir existente
          </Button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          upload(e.target.files, ([url]) => onChange(url));
          e.target.value = "";
        }}
      />
      {picking && (
        <MediaPicker
          onClose={() => setPicking(false)}
          onPick={(url) => {
            onChange(url);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

function ImageListInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [picking, setPicking] = useState(false);
  const { uploading, error, upload } = useUpload();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {value.map((src, i) => (
          <div key={i} className="group relative overflow-hidden rounded-md border border-neutral-200 bg-neutral-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" title={src} className="aspect-square w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-0.5 bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
              <IconButton label="Mover antes" disabled={i === 0} onClick={() => onChange(moveItem(value, i, i - 1))}>
                <ArrowUp className="h-3.5 w-3.5 -rotate-90" />
              </IconButton>
              <IconButton
                label="Mover después"
                disabled={i === value.length - 1}
                onClick={() => onChange(moveItem(value, i, i + 1))}
              >
                <ArrowDown className="h-3.5 w-3.5 -rotate-90" />
              </IconButton>
              <IconButton label="Quitar" onClick={() => onChange(value.filter((_, j) => j !== i))}>
                <X className="h-3.5 w-3.5" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        <Button size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
          Subir imágenes
        </Button>
        <Button size="sm" onClick={() => setPicking(true)}>
          <Images className="h-3.5 w-3.5" /> Elegir existente
        </Button>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          upload(e.target.files, (urls) => onChange([...value, ...urls]));
          e.target.value = "";
        }}
      />
      {picking && (
        <MediaPicker
          onClose={() => setPicking(false)}
          onPick={(url) => {
            onChange([...value, url]);
            setPicking(false);
          }}
        />
      )}
    </div>
  );
}

function ReferenceInput({
  collection,
  multiple,
  value,
  onChange,
}: {
  collection: string;
  multiple?: boolean;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const { config, content } = useEditor();
  const definition = config.collections.find((c) => c.name === collection);
  const items = content.collections[collection] ?? [];
  const titleOf = (id: string) => {
    const item = items.find((i) => i.id === id);
    return item ? String(item[definition?.titleField ?? "id"] ?? id) : `${id} (no existe)`;
  };

  if (!multiple) {
    return (
      <select className={inputClass} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {titleOf(item.id)}
          </option>
        ))}
      </select>
    );
  }

  const selected = (value ?? []) as string[];
  const available = items.filter((i) => !selected.includes(i.id));
  return (
    <div className="space-y-1.5">
      {selected.length === 0 && (
        <p className="text-xs text-neutral-500">Sin selección: se muestran todos.</p>
      )}
      {selected.map((id, i) => (
        <div key={id} className="flex items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 pl-2.5">
          <span className="flex-1 truncate text-sm text-neutral-800">{titleOf(id)}</span>
          <IconButton label="Subir" disabled={i === 0} onClick={() => onChange(moveItem(selected, i, i - 1))}>
            <ArrowUp className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton
            label="Bajar"
            disabled={i === selected.length - 1}
            onClick={() => onChange(moveItem(selected, i, i + 1))}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton label="Quitar" onClick={() => onChange(selected.filter((x) => x !== id))}>
            <X className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      ))}
      {available.length > 0 && (
        <select
          className={inputClass}
          value=""
          onChange={(e) => e.target.value && onChange([...selected, e.target.value])}
        >
          <option value="">+ Agregar {definition?.singularLabel.toLowerCase() ?? "elemento"}…</option>
          {available.map((item) => (
            <option key={item.id} value={item.id}>
              {titleOf(item.id)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
