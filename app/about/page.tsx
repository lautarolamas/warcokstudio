"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-light mb-10">
                Sobre mi
              </h1>

              <div className="flex flex-col items-center mb-16">
                <div className="w-64 h-64 rounded-full overflow-hidden mb-8">
                  <Image
                    src="/about-me.jpeg"
                    alt="Profile picture"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-light">Belen Warcok</h2>
                <p className="text-neutral-400 mt-2">
                  Founder & Creative Director
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-16 text-lg leading-relaxed"
            >
              <p className="mb-6">
                Belén es diseñadora gráfica especializada en branding e
                identidad visual, con una mirada creativa, estratégica y muy
                detallista. Ayuda a marcas a encontrar su voz visual y construir
                una identidad auténtica que las represente con fuerza y
                coherencia.Su enfoque combina estética, concepto y funcionalidad
                para dar vida a universos visuales memorables, que conectan con
                las personas y generan impacto real.
              </p>
              {/* <p className="mb-6">
                Nuestro enfoque combina estrategia, creatividad y tecnología
                para desarrollar soluciones que no solo son estéticamente
                atractivas, sino también efectivas y funcionales.
              </p>
              <p>
                Trabajamos con marcas que valoran el diseño como una herramienta
                estratégica para diferenciarse y conectar con su audiencia de
                manera significativa.
              </p> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-light mb-6">Servicios</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-xl font-light mb-3">Branding</h3>
                  <ul className="text-neutral-400 space-y-2">
                    <li>Identidad visual</li>
                    <li>Estrategia de marca</li>
                    <li>Naming</li>
                    <li>Guías de estilo</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-3">Diseño</h3>
                  <ul className="text-neutral-400 space-y-2">
                    <li>Packaging</li>
                    <li>Dirección de arte</li>
                    <li>Diseño web</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h2 className="text-2xl font-light mb-6">Contacto</h2>
              <p className="text-neutral-400 mb-4">
                Tenes algún proyecto en mente?
              </p>
              <Link
                href="/contact"
                className="inline-block border-b border-white pb-1 hover:text-neutral-300 transition-colors"
              >
                Envíanos un mensaje
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Belen Warcok
          </p>
          <div className="flex space-x-6">
            <Link
              href="https://www.instagram.com/brandingconbelu/"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="https://www.linkedin.com/in/belenwarcok/"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://www.behance.net/bwarcok"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              Behance
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
