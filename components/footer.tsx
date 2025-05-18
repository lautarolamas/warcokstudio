import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-neutral-900">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Belen Warcok
        </p>
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
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-sm text-neutral-500">
          Desarrollado por{" "}
          <a
            href="https://www.linkedin.com/in/lautaro-lamas-504643169/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Lautaro Lamas
          </a>
        </p>
      </div>
    </footer>
  );
}
