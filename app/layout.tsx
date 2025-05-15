import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { CustomCursor } from "@/components/custom-cursor";

export const metadata: Metadata = {
  title: "Belen Warcok",
  description:
    "Estudio de diseño creativo especializado en branding e identidad visual",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${GeistSans.className} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
