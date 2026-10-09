// Sesión del panel: una cookie firmada con HMAC. Usa Web Crypto para que
// funcione tanto en el middleware (edge) como en las rutas de la API.

export const SESSION_COOKIE = "cms_session";
const SESSION_DAYS = 14;

// Credenciales por defecto del panel. Las variables de entorno CMS_USER y
// CMS_PASSWORD las reemplazan.
const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "esther1928";

function credentials() {
  return {
    user: process.env.CMS_USER || DEFAULT_USER,
    password: process.env.CMS_PASSWORD || DEFAULT_PASSWORD,
  };
}

function secret() {
  return process.env.CMS_SECRET || credentials().password;
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
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, await sign(expires));
}

export async function checkCredentials(user: string, password: string) {
  const expected = credentials();
  // Compara firmas para no filtrar el largo de los valores.
  const [userOk, passwordOk] = await Promise.all([
    sign(user).then(async (a) => safeEqual(a, await sign(expected.user))),
    sign(password).then(async (a) => safeEqual(a, await sign(expected.password))),
  ]);
  return userOk && passwordOk;
}
