import config from "@/cms.config";
import { createCmsRouteHandlers } from "@/cms/next/route-handlers";

export const { GET, POST, PUT } = createCmsRouteHandlers(config);
