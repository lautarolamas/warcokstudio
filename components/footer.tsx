import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-neutral-900">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} Belen Warcok
        </p>
        <SocialLinks />
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-xs text-neutral-500">
          Desarrollo web:{" "}
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
