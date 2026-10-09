import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "../core/auth";

// Protege el panel: sin sesión válida redirige al login. La API valida la
// sesión por su cuenta, así que este middleware solo cubre /admin.
export async function cmsMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (await verifySession(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}
