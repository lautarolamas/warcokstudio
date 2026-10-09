"use client";

import { SocialLinks } from "./social-links";
import { useSettings } from "@/cms/react/provider";
import type { SiteSettings } from "@/site/types";

export function Footer() {
  const settings = useSettings<SiteSettings>();
  return (
    <footer className="py-10 px-6 border-t border-neutral-900">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} {settings.footerName}
        </p>
        <SocialLinks />
      </div>
      {settings.creditName && (
        <div className="flex justify-center mt-4">
          <p className="text-xs text-neutral-500">
            {settings.creditLabel}{" "}
            <a
              href={settings.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {settings.creditName}
            </a>
          </p>
        </div>
      )}
    </footer>
  );
}
