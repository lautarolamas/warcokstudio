"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-sm font-light tracking-wider">
          WARKOC STUDIO
        </Link>
        <div className="flex items-center space-x-8">
          <Link href="/work" className="text-sm font-light hover:opacity-70 transition-opacity">
            WORK
          </Link>
          <Link href="/about" className="text-sm font-light hover:opacity-70 transition-opacity">
            ABOUT
          </Link>
          <Link href="/contact" className="text-sm font-light hover:opacity-70 transition-opacity">
            CONTACT
          </Link>
        </div>
        <div className="text-sm font-light">©2025</div>
      </header>

      <main>
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-light mb-10">About</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-16 text-lg leading-relaxed"
            >
              <p className="mb-6">
                WARKOC STUDIO es un estudio creativo multidisciplinar especializado en branding, diseño y desarrollo
                digital. Creamos experiencias visuales únicas que conectan marcas con su audiencia.
              </p>
              <p className="mb-6">
                Nuestro enfoque combina estrategia, creatividad y tecnología para desarrollar soluciones que no solo son
                estéticamente atractivas, sino también efectivas y funcionales.
              </p>
              <p>
                Trabajamos con marcas que valoran el diseño como una herramienta estratégica para diferenciarse y
                conectar con su audiencia de manera significativa.
              </p>
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
                    <li>Diseño editorial</li>
                    <li>Packaging</li>
                    <li>Dirección de arte</li>
                    <li>Diseño web</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-light mb-3">Digital</h3>
                  <ul className="text-neutral-400 space-y-2">
                    <li>Desarrollo web</li>
                    <li>UX/UI</li>
                    <li>Estrategia digital</li>
                    <li>Contenido digital</li>
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
                Si estás interesado en trabajar con nosotros, no dudes en contactarnos.
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
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Warkoc Studio</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-neutral-500 hover:text-white transition-colors">
              Behance
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
