import config from "@/cms.config";
import { LoginForm } from "@/cms/admin/login-form";

export default function LoginPage() {
  return <LoginForm siteName={config.name} />;
}
