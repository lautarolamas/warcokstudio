"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button, inputClass } from "./ui";

export function LoginForm({ siteName }: { siteName: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/cms/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) {
      window.location.href = "/admin";
      return;
    }
    const data = await res?.json().catch(() => ({}));
    setError(data?.error || "No se pudo iniciar sesión");
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-6 text-neutral-900">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
      >
        <div>
          <div className="text-xs text-neutral-500">Panel de contenido</div>
          <h1 className="text-lg font-semibold">{siteName}</h1>
        </div>
        <input
          type="password"
          autoFocus
          className={inputClass}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" variant="primary" className="w-full" disabled={loading || !password}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Entrar
        </Button>
      </form>
    </div>
  );
}
