import config from "@/cms.config";
import { AdminApp } from "@/cms/admin/admin-app";
import { getStorage } from "@/cms/core/storage";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const storage = getStorage();
  const content = await storage.readContent({ fresh: true });
  return <AdminApp config={config} initialContent={content} storage={storage.kind} />;
}
