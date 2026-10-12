"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { CollectionItem } from "@/cms/core/content";
import { useSettings } from "@/cms/react/provider";
import type { Project, SiteSettings } from "@/site/types";

export function ProjectDetail({ item }: { item: CollectionItem }) {
  const router = useRouter();
  const project = item as Project;
  const { siteName } = useSettings<SiteSettings>();

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-sm font-medium tracking-wider">
          {siteName}
        </Link>
        <button
          onClick={() => router.back()}
          className="text-sm font-medium hover:opacity-70 transition-opacity"
        >
          ← VOLVER
        </button>
      </header>

      <main className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-light mb-4"
            >
              {project.title}
            </motion.h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="aspect-[16/9] relative rounded-2xl overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
            <div className="md:col-span-4 flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm text-neutral-400 mb-2">CLIENTE</h3>
                  <p className="text-lg">{project.client}</p>
                </div>
                <div>
                  <h3 className="text-sm text-neutral-400 mb-2">AÑO</h3>
                  <p className="text-lg">{project.year}</p>
                </div>
                <div>
                  <h3 className="text-sm text-neutral-400 mb-2">SERVICIOS</h3>
                  <ul className="space-y-1">
                    {project.services.map((service, i) => (
                      <li key={i} className="text-lg">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Galería de imágenes del proyecto */}
          {project.images && project.images.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-light mb-6">Galería</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((url, idx) => (
                  <div
                    key={idx}
                    className="w-full h-80 relative rounded-xl overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={project.title + " imagen " + (idx + 1)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Galería de logos */}
          {project.logos && project.logos.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-light mb-6">Logos</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {project.logos.map((url, idx) => (
                  <div
                    key={idx}
                    className="w-full aspect-square relative rounded-xl overflow-hidden bg-neutral-900"
                  >
                    <Image
                      src={url}
                      alt={project.title + " logo " + (idx + 1)}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
}
