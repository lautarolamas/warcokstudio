"use client";

import type { ReactNode } from "react";
import type { Page } from "@/cms/core/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function PageShell({ children }: { page: Page; children: ReactNode }) {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
