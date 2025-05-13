"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-sm font-medium tracking-wider">
          Belen Warcok
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/work"
            className={`text-sm font-medium hover:opacity-70 transition-opacity ${
              pathname === "/work" ? "border-b border-white" : ""
            }`}
          >
            Trabajos
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium hover:opacity-70 transition-opacity ${
              pathname === "/about" ? "border-b border-white" : ""
            }`}
          >
            Sobre mí
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium hover:opacity-70 transition-opacity ${
              pathname === "/contact" ? "border-b border-white" : ""
            }`}
          >
            Contacto
          </Link>
        </div>
        <div className="hidden md:block w-[100px]"></div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-4 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-opacity duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-transform duration-300 ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </div>
        </button>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-[250px] h-full bg-black z-40 md:hidden"
          >
            <div className="pt-24 px-6 flex flex-col space-y-8">
              <Link
                href="/work"
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  pathname === "/work" ? "border-b border-white" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Trabajos
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  pathname === "/about" ? "border-b border-white" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Sobre mí
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium hover:opacity-70 transition-opacity ${
                  pathname === "/contact" ? "border-b border-white" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
