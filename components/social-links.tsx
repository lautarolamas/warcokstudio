import { Instagram, Linkedin } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex space-x-6">
      <a
        href="https://www.instagram.com/brandingconbelu/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <span className="hidden md:inline">Instagram</span>
        <Instagram className="w-5 h-5 md:hidden" />
      </a>
      <a
        href="https://www.linkedin.com/in/belenwarcok/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <span className="hidden md:inline">LinkedIn</span>
        <Linkedin className="w-5 h-5 md:hidden" />
      </a>
      <a
        href="https://www.behance.net/bwarcok"
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors"
      >
        <span className="hidden md:inline">Behance</span>
        <span className="md:hidden text-md font-bold">BH</span>
      </a>
    </div>
  );
}
