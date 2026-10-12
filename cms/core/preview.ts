import type { CmsContent } from "./content";

// Mensajes entre el panel y el sitio que corre dentro del iframe de vista previa.

export type PreviewMessage =
  | { source: "cms-preview"; type: "ready"; path: string }
  | { source: "cms-preview"; type: "navigate"; path: string }
  | { source: "cms-preview"; type: "select"; blockId: string };

export type AdminMessage =
  | { source: "cms-admin"; type: "content"; content: CmsContent }
  | { source: "cms-admin"; type: "focus"; blockId: string }
  | { source: "cms-admin"; type: "navigate"; path: string };

// Ruta del panel; el sitio se considera en modo vista previa cuando está
// embebido en ella.
export const ADMIN_PATH = "/admin";
