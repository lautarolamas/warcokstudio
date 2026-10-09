import type { Metadata } from "next";
import { RouteView } from "@/site/route-view";

// Ruta que carga el iframe del panel. Renderiza lo mismo que el sitio, pero
// acepta páginas que todavía solo existen en el borrador.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  return <RouteView segments={slug} allowMissing />;
}
