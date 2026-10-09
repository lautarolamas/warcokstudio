import { cmsMiddleware } from "@/cms/next/middleware";

export const middleware = cmsMiddleware;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
