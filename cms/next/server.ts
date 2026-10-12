import { cache } from "react";
import { cookies } from "next/headers";
import { getStorage } from "../core/storage";
import { SESSION_COOKIE, verifySession } from "../core/auth";

// Contenido publicado, cacheado por request.
export const getContent = cache(() => getStorage().readContent());

export async function isAuthenticated() {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}
