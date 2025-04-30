"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulando carga de datos del proyecto
    const projects = [
      {
        id: "1",
        title: "Gaston: Lighting under a new light",
        description: "Rediseño de marca para una empresa de iluminación premium",
        fullDescription:
          "Gaston es una marca de iluminación premium que necesitaba un rediseño completo para reflejar la calidad y elegancia de sus productos. Desarrollamos una identidad visual que combina elementos modernos con un toque de sofisticación clásica.",
        image: "/placeholder.svg?height=600&width=600&text=Gaston",
        color: "bg-pink-400",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=Gaston+1",
          "/placeholder.svg?height=800&width=1200&text=Gaston+2",
          "/placeholder.svg?height=800&width=1200&text=Gaston+3",
        ],
        year: "2024",
        client: "Gaston Lighting",
        services: ["Branding", "Diseño de Packaging", "Dirección de Arte"],
      },
      {
        id: "2",
        title: "Phylis: Sustainable packaging",
        description: "Diseño de packaging sostenible para productos ecológicos",
        fullDescription:
          "Phylis es una marca comprometida con la sostenibilidad que necesitaba un packaging que reflejara sus valores. Creamos un sistema de packaging minimalista, funcional y completamente sostenible que reduce el impacto ambiental sin comprometer la estética.",
        image: "/placeholder.svg?height=600&width=600&text=Phylis",
        color: "bg-green-200",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=Phylis+1",
          "/placeholder.svg?height=800&width=1200&text=Phylis+2",
          "/placeholder.svg?height=800&width=1200&text=Phylis+3",
        ],
        year: "2023",
        client: "Phylis Eco Products",
        services: ["Diseño de Packaging", "Estrategia de Marca", "Sostenibilidad"],
      },
      {
        id: "3",
        title: "Vintage Everything: Fashion Hunters",
        description: "Identidad visual para tienda de moda vintage",
        fullDescription:
          "Vintage Everything es una tienda especializada en moda vintage de alta calidad. Desarrollamos una identidad visual que captura la esencia nostálgica de lo vintage pero con un enfoque contemporáneo, creando un equilibrio perfecto entre lo retro y lo moderno.",
        image: "/placeholder.svg?height=600&width=600&text=Vintage",
        color: "bg-red-400",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=Vintage+1",
          "/placeholder.svg?height=800&width=1200&text=Vintage+2",
          "/placeholder.svg?height=800&width=1200&text=Vintage+3",
        ],
        year: "2023",
        client: "Vintage Everything",
        services: ["Branding", "Diseño Gráfico", "Estrategia de Comunicación"],
      },
      {
        id: "4",
        title: "Schlong: The subtle art of fine living",
        description: "Branding para revista de estilo de vida premium",
        fullDescription:
          "Schlong es una revista de estilo de vida premium que celebra el arte de vivir bien. Creamos una identidad visual sofisticada y minimalista que refleja la elegancia y exclusividad de la publicación, con un sistema tipográfico distintivo y una paleta de colores refinada.",
        image: "/placeholder.svg?height=600&width=600&text=Schlong",
        color: "bg-stone-300",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=Schlong+1",
          "/placeholder.svg?height=800&width=1200&text=Schlong+2",
          "/placeholder.svg?height=800&width=1200&text=Schlong+3",
        ],
        year: "2022",
        client: "Schlong Magazine",
        services: ["Diseño Editorial", "Dirección de Arte", "Tipografía"],
      },
      {
        id: "5",
        title: "LeBlink: Skincare for the modern age",
        description: "Identidad visual para marca de cuidado de la piel",
        fullDescription:
          "LeBlink es una marca innovadora de cuidado de la piel que combina ciencia avanzada con ingredientes naturales. Desarrollamos una identidad visual que comunica transparencia, pureza y eficacia, con un enfoque en la experiencia del usuario y la claridad de la comunicación.",
        image: "/placeholder.svg?height=600&width=600&text=LeBlink",
        color: "bg-blue-200",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=LeBlink+1",
          "/placeholder.svg?height=800&width=1200&text=LeBlink+2",
          "/placeholder.svg?height=800&width=1200&text=LeBlink+3",
        ],
        year: "2022",
        client: "LeBlink Skincare",
        services: ["Branding", "Packaging", "Estrategia Digital"],
      },
      {
        id: "6",
        title: "Sensaya: Beauty for everyone",
        description: "Branding inclusivo para marca de belleza",
        fullDescription:
          "Sensaya es una marca de belleza comprometida con la inclusividad y la diversidad. Creamos una identidad visual que celebra todas las formas de belleza, con un sistema flexible que se adapta a diferentes audiencias manteniendo una coherencia visual distintiva.",
        image: "/placeholder.svg?height=600&width=600&text=Sensaya",
        color: "bg-indigo-900",
        gallery: [
          "/placeholder.svg?height=800&width=1200&text=Sensaya+1",
          "/placeholder.svg?height=800&width=1200&text=Sensaya+2",
          "/placeholder.svg?height=800&width=1200&text=Sensaya+3",
        ],
        year: "2021",
        client: "Sensaya Beauty",
        services: ["Branding", "Estrategia de Marca", "Dirección Creativa"],
      },
    ]

    const foundProject = projects.find((p) => p.id === params.id)

    setTimeout(() => {
      setProject(foundProject || null)
      setLoading(false)
    }, 800)
  }, [params.id])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-light"
        >
          Cargando...
        </motion.div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Proyecto no encontrado</h1>
          <Link href="/" className="border-b border-white pb-1">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
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

      <main className="pt-32 pb-20">
        <div className="container mx-auto max-w-6xl px-6">
          <Link href="/" className="inline-flex items-center text-neutral-400 hover:text-white mb-10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">{project.title}</h1>
            <p className="text-xl text-neutral-400 max-w-2xl">{project.description}</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <div>
              <h3 className="text-xl font-light mb-2">Cliente</h3>
              <p className="text-neutral-400">{project.client}</p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-2">Año</h3>
              <p className="text-neutral-400">{project.year}</p>
            </div>
            <div>
              <h3 className="text-xl font-light mb-2">Servicios</h3>
              <ul className="text-neutral-400">
                {project.services.map((service: string, index: number) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-20">
            <p className="text-lg max-w-3xl">{project.fullDescription}</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {project.gallery.map((image: string, index: number) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Imagen ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
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
