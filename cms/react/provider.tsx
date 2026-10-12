"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { CmsContent, CollectionItem } from "../core/content";
import {
  ADMIN_PATH,
  type AdminMessage,
  type PreviewMessage,
} from "../core/preview";

type CmsContextValue = { content: CmsContent; preview: boolean };

const CmsContext = createContext<CmsContextValue | null>(null);

export const PREVIEW_PREFIX = "/cms-preview";

function isEmbeddedInAdmin() {
  if (window.parent === window) return false;
  try {
    return window.parent.location.pathname.startsWith(ADMIN_PATH);
  } catch {
    // El padre es de otro origen: no es nuestro panel.
    return false;
  }
}

export function sendToAdmin(message: PreviewMessage) {
  window.parent.postMessage(message, window.location.origin);
}

// Envuelve el sitio. Con el contenido publicado renderiza normalmente; si el
// sitio está dentro del iframe del panel, reemplaza el contenido por el
// borrador que le manda el panel en cada cambio.
export function ContentProvider({
  initialContent,
  children,
}: {
  initialContent: CmsContent;
  children: ReactNode;
}) {
  const [content, setContent] = useState(initialContent);
  const [preview, setPreview] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isEmbeddedInAdmin()) return;
    setPreview(true);

    function onMessage(event: MessageEvent<AdminMessage>) {
      if (event.origin !== window.location.origin) return;
      const message = event.data;
      if (message?.source !== "cms-admin") return;
      if (message.type === "content") setContent(message.content);
      if (message.type === "focus") {
        const el = document.querySelector(
          `[data-cms-block="${CSS.escape(message.blockId)}"]`
        );
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (message.type === "navigate") {
        router.push(PREVIEW_PREFIX + (message.path === "/" ? "" : message.path));
      }
    }
    window.addEventListener("message", onMessage);
    sendToAdmin({
      source: "cms-preview",
      type: "ready",
      path: stripPreviewPrefix(window.location.pathname),
    });
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  useEffect(() => {
    if (!preview) return;
    sendToAdmin({
      source: "cms-preview",
      type: "navigate",
      path: stripPreviewPrefix(pathname),
    });
  }, [pathname, preview]);

  return (
    <CmsContext.Provider value={{ content, preview }}>
      {children}
    </CmsContext.Provider>
  );
}

export function stripPreviewPrefix(path: string) {
  if (path === PREVIEW_PREFIX) return "/";
  return path.startsWith(PREVIEW_PREFIX + "/")
    ? path.slice(PREVIEW_PREFIX.length)
    : path;
}

function useCms() {
  const value = useContext(CmsContext);
  if (!value) throw new Error("Falta <ContentProvider> arriba en el árbol");
  return value;
}

export function useContent() {
  return useCms().content;
}

export function usePreviewMode() {
  return useCms().preview;
}

export function useSettings<T = Record<string, unknown>>() {
  return useCms().content.settings as T;
}

export function useCollection<T extends CollectionItem = CollectionItem>(
  name: string
) {
  return (useCms().content.collections[name] ?? []) as T[];
}
