"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    submitted: false,
    loading: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState((prev) => ({ ...prev, loading: true }))

    // Simulando envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setFormState((prev) => ({
      ...prev,
      submitted: true,
      loading: false,
    }))
  }

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
              <h1 className="text-4xl md:text-5xl font-light mb-10">Contact</h1>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <h2 className="text-2xl font-light mb-6">Información de contacto</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light mb-2">Email</h3>
                    <p className="text-neutral-400">info@warkocstudio.com</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Teléfono</h3>
                    <p className="text-neutral-400">+34 123 456 789</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Dirección</h3>
                    <p className="text-neutral-400">
                      Calle Principal 123
                      <br />
                      28001 Madrid, España
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-light mb-2">Redes sociales</h3>
                    <div className="flex space-x-4">
                      <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                        Instagram
                      </Link>
                      <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                        LinkedIn
                      </Link>
                      <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                        Behance
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {formState.submitted ? (
                  <div className="p-6 border border-neutral-800 rounded-lg">
                    <h2 className="text-2xl font-light mb-4">Mensaje enviado</h2>
                    <p className="text-neutral-400 mb-6">
                      Gracias por contactarnos. Te responderemos lo antes posible.
                    </p>
                    <Button
                      onClick={() => setFormState((prev) => ({ ...prev, submitted: false }))}
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-black"
                    >
                      Enviar otro mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-light mb-6">Envíanos un mensaje</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Tu nombre"
                          required
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="tu@email.com"
                          required
                          className="bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mensaje</Label>
                        <Textarea
                          id="message"
                          value={formState.message}
                          onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                          placeholder="Cuéntanos sobre tu proyecto..."
                          required
                          className="min-h-[150px] bg-transparent border-neutral-800 focus:border-white"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={formState.loading}
                      className="bg-white text-black hover:bg-neutral-200"
                    >
                      {formState.loading ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
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
