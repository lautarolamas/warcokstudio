import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import type { CmsConfig } from "../core/schema";
import { validateContent, type CmsContent } from "../core/content";
import {
  CONTENT_CACHE_TAG,
  MEDIA_URL_PREFIX,
  getStorage,
} from "../core/storage";
import {
  SESSION_COOKIE,
  checkPassword,
  createSession,
  verifySession,
} from "../core/auth";

const MEDIA_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  avif: "image/avif",
};
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
const SAFE_FILE = /^[a-z0-9][a-z0-9._-]*$/;

type Context = { params: Promise<{ cms: string[] }> };

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function authorized(request: NextRequest) {
  return verifySession(request.cookies.get(SESSION_COOKIE)?.value);
}

function mediaFileName(original: string) {
  const dot = original.lastIndexOf(".");
  const ext = original.slice(dot + 1).toLowerCase();
  const base = original
    .slice(0, dot > 0 ? dot : undefined)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return { name: `${base || "imagen"}-${Date.now().toString(36)}.${ext}`, ext };
}

// Crea los handlers de /api/cms/[...cms]. Uso en un sitio:
//   export const { GET, POST, PUT } = createCmsRouteHandlers(config);
export function createCmsRouteHandlers(config: CmsConfig) {
  async function GET(request: NextRequest, { params }: Context) {
    const [action, ...rest] = (await params).cms;

    if (action === "media" && rest.length === 1) {
      const file = rest[0];
      const type = MEDIA_TYPES[file.split(".").pop() ?? ""];
      if (!SAFE_FILE.test(file) || !type) return error("No encontrado", 404);
      const data = await getStorage().readMedia(file);
      if (!data) return error("No encontrado", 404);
      return new NextResponse(Buffer.from(data), {
        headers: {
          "Content-Type": type,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }

    if (action === "content") {
      if (!(await authorized(request))) return error("No autorizado", 401);
      return NextResponse.json(await getStorage().readContent({ fresh: true }));
    }

    return error("No encontrado", 404);
  }

  async function POST(request: NextRequest, { params }: Context) {
    const [action] = (await params).cms;

    if (action === "login") {
      const { password } = await request.json().catch(() => ({}));
      if (typeof password !== "string" || !(await checkPassword(password))) {
        return error("Contraseña incorrecta", 401);
      }
      const session = await createSession();
      const response = NextResponse.json({ ok: true });
      response.cookies.set(SESSION_COOKIE, session.value, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: session.maxAge,
      });
      return response;
    }

    if (action === "logout") {
      const response = NextResponse.json({ ok: true });
      response.cookies.delete(SESSION_COOKIE);
      return response;
    }

    if (action === "media") {
      if (!(await authorized(request))) return error("No autorizado", 401);
      const form = await request.formData();
      const file = form.get("file");
      if (!(file instanceof File)) return error("Falta el archivo", 400);
      const { name, ext } = mediaFileName(file.name);
      if (!MEDIA_TYPES[ext])
        return error("Formato no soportado (usá JPG, PNG, WEBP, GIF o AVIF)", 400);
      if (file.size > MAX_UPLOAD_BYTES)
        return error("La imagen pesa más de 4 MB", 400);
      await getStorage().writeMedia(name, new Uint8Array(await file.arrayBuffer()));
      return NextResponse.json({ url: `${MEDIA_URL_PREFIX}/${name}` });
    }

    return error("No encontrado", 404);
  }

  async function PUT(request: NextRequest, { params }: Context) {
    const [action] = (await params).cms;
    if (action !== "content") return error("No encontrado", 404);
    if (!(await authorized(request))) return error("No autorizado", 401);

    const content = (await request.json().catch(() => null)) as CmsContent | null;
    const problem = validateContent(config, content);
    if (problem) return error(problem, 400);

    try {
      await getStorage().writeContent(
        content!,
        `cms: actualizar contenido de ${config.name}`
      );
    } catch (e) {
      return error(e instanceof Error ? e.message : "No se pudo guardar", 500);
    }
    revalidateTag(CONTENT_CACHE_TAG);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  }

  return { GET, POST, PUT };
}
