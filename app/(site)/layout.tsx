import type React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/custom-cursor";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ContentProvider } from "@/cms/react/provider";
import { getContent } from "@/cms/next/server";
import type { SiteSettings } from "@/site/types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getContent()).settings as SiteSettings;
  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    generator: "v0.dev",
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ContentProvider initialContent={content}>
        <CustomCursor />
        {children}
      </ContentProvider>
      <Analytics />
      <GoogleAnalytics gaId="G-DVE9KV61VV" />
    </ThemeProvider>
  );
}
