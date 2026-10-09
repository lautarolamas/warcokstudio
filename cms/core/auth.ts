// Sesión del panel: una cookie firmada con HMAC. Usa Web Crypto para que
// funcione tanto en el middleware (edge) como en las rutas de la API.

export const SESSION_COOKIE = "cms_session";
const SESSION_DAYS = 14;

function secret() {
  return process.env.CMS_SECRET || process.env.CMS_PASSWORD || "";
}

// Sin contraseña configurada el panel queda abierto solo en desarrollo.
export function authDisabled() {
  return !process.env.CMS_PASSWORD && process.env.NODE_ENV !== "production";
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  return {
    value: `${expires}.${await sign(String(expires))}`,
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export async function verifySession(token: string | undefined) {
  if (authDisabled()) return true;
  if (!token || !secret()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, await sign(expires));
}

export async function checkPassword(password: string) {
  const expected = process.env.CMS_PASSWORD;
  if (!expected) return authDisabled();
  // Compara firmas para no filtrar el largo de la contraseña.
  return safeEqual(await sign(password), await sign(expected));
}
