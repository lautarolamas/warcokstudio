import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { CmsContent } from "./content";

// Dónde se guarda el contenido. Cada adaptador implementa la misma interfaz,
// así el resto del CMS no sabe si escribe en disco, en GitHub o en una base.
export interface CmsStorage {
  kind: "filesystem" | "github";
  readContent(options?: { fresh?: boolean }): Promise<CmsContent>;
  writeContent(content: CmsContent, message: string): Promise<void>;
  writeMedia(fileName: string, data: Uint8Array): Promise<void>;
  readMedia(fileName: string): Promise<Uint8Array | null>;
}

export const CONTENT_CACHE_TAG = "cms-content";

const CONTENT_PATH = process.env.CMS_CONTENT_PATH || "content/content.json";
const MEDIA_DIR = process.env.CMS_MEDIA_DIR || "public/uploads";
// URL pública de los archivos subidos. Si el archivo todavía no está en el
// build (GitHub), next.config reescribe esta ruta hacia /api/cms/media.
export const MEDIA_URL_PREFIX = "/uploads";

function filesystemStorage(): CmsStorage {
  const root = process.cwd();
  return {
    kind: "filesystem",
    async readContent() {
      const raw = await fs.readFile(path.join(root, CONTENT_PATH), "utf8");
      return JSON.parse(raw);
    },
    async writeContent(content) {
      const file = path.join(root, CONTENT_PATH);
      await fs.mkdir(path.dirname(file), { recursive: true });
      await fs.writeFile(file, JSON.stringify(content, null, 2) + "\n");
    },
    async writeMedia(fileName, data) {
      const dir = path.join(root, MEDIA_DIR);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, fileName), data);
    },
    async readMedia(fileName) {
      try {
        return await fs.readFile(path.join(root, MEDIA_DIR, fileName));
      } catch {
        return null;
      }
    },
  };
}

// Guarda cada cambio como un commit en el repositorio. Sirve para hostings
// sin disco persistente (Vercel) y deja historial de todo lo editado.
function githubStorage(repo: string, token: string, branch: string): CmsStorage {
  const api = `https://api.github.com/repos/${repo}/contents`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const fileUrl = (filePath: string) =>
    `${api}/${filePath.split("/").map(encodeURIComponent).join("/")}`;

  async function getSha(filePath: string) {
    const res = await fetch(`${fileUrl(filePath)}?ref=${branch}`, {
      headers: { ...headers, Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (res.status === 404) return undefined;
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);
    return ((await res.json()) as { sha: string }).sha;
  }

  async function putFile(filePath: string, data: Uint8Array, message: string) {
    const sha = await getSha(filePath);
    const res = await fetch(fileUrl(filePath), {
      method: "PUT",
      headers: { ...headers, Accept: "application/vnd.github+json" },
      body: JSON.stringify({
        message,
        branch,
        sha,
        content: Buffer.from(data).toString("base64"),
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`No se pudo guardar en GitHub (${res.status}): ${detail}`);
    }
  }

  async function getRaw(filePath: string, fresh: boolean) {
    return fetch(`${fileUrl(filePath)}?ref=${branch}`, {
      headers: { ...headers, Accept: "application/vnd.github.raw+json" },
      ...(fresh
        ? { cache: "no-store" as const }
        : { cache: "force-cache" as const, next: { tags: [CONTENT_CACHE_TAG] } }),
    });
  }

  return {
    kind: "github",
    async readContent(options) {
      const res = await getRaw(CONTENT_PATH, Boolean(options?.fresh));
      if (!res.ok) throw new Error(`No se pudo leer el contenido (${res.status})`);
      return res.json();
    },
    async writeContent(content, message) {
      const json = JSON.stringify(content, null, 2) + "\n";
      await putFile(CONTENT_PATH, new TextEncoder().encode(json), message);
    },
    async writeMedia(fileName, data) {
      await putFile(`${MEDIA_DIR}/${fileName}`, data, `cms: subir ${fileName}`);
    },
    async readMedia(fileName) {
      const res = await getRaw(`${MEDIA_DIR}/${fileName}`, false);
      if (!res.ok) return null;
      return new Uint8Array(await res.arrayBuffer());
    },
  };
}

export function getStorage(): CmsStorage {
  const repo = process.env.CMS_GITHUB_REPO;
  const token = process.env.CMS_GITHUB_TOKEN;
  if (repo && token) {
    return githubStorage(repo, token, process.env.CMS_GITHUB_BRANCH || "main");
  }
  return filesystemStorage();
}
