"use client";

import { Instagram, Linkedin } from "lucide-react";
import { useSettings } from "@/cms/react/provider";
import type { SiteSettings } from "@/site/types";

function MobileIcon({ icon, label }: { icon: string; label: string }) {
  if (icon === "instagram") return <Instagram className="w-5 h-5 md:hidden" />;
  if (icon === "linkedin") return <Linkedin className="w-5 h-5 md:hidden" />;
  const initials = icon === "behance" ? "BH" : label.slice(0, 2).toUpperCase();
  return <span className="md:hidden text-md font-bold">{initials}</span>;
}

export function SocialLinks() {
  const { socials } = useSettings<SiteSettings>();
  return (
    <div className="flex space-x-6">
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition-colors"
        >
          <span className="hidden md:inline">{social.label}</span>
          <MobileIcon icon={social.icon} label={social.label} />
        </a>
      ))}
    </div>
  );
}
