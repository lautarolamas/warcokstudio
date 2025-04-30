"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.2, 0.2, 1]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 0.95, 0.95, 1]
  );

  const projects = [
    {
      id: 1,
      title: "Gaston: Lighting under a new light",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2940&auto=format&fit=crop",
      color: "bg-pink-400",
    },
    {
      id: 2,
      title: "Phylis: Sustainable packaging",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=2787&auto=format&fit=crop",
      color: "bg-green-200",
    },
    {
      id: 3,
      title: "Vintage Everything: Fashion Hunters",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2938&auto=format&fit=crop",
      color: "bg-red-400",
    },
    {
      id: 4,
      title: "Schlong: The subtle art of fine living",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2940&auto=format&fit=crop",
      color: "bg-stone-300",
    },
    {
      id: 5,
      title: "LeBlink: Skincare for the modern age",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=2787&auto=format&fit=crop",
      color: "bg-blue-200",
    },
    {
      id: 6,
      title: "Sensaya: Beauty for everyone",
      category: "REBRANDING",
      image:
        "https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?q=80&w=2787&auto=format&fit=crop",
      color: "bg-indigo-900",
    },
  ];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-sm font-light tracking-wider">
          Warcok Estudio
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            href="/work"
            className="text-sm font-light hover:opacity-70 transition-opacity"
          >
            WORK
          </Link>
          <Link
            href="/about"
            className="text-sm font-light hover:opacity-70 transition-opacity"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="text-sm font-light hover:opacity-70 transition-opacity"
          >
            CONTACT
          </Link>
        </div>
        <div className="text-sm font-light"> </div>
      </header>

      <main>
        <section className="h-screen flex items-center justify-center relative">
          <motion.h1
            style={{ opacity, scale }}
            className="text-[13vw] leading-none font-medium text-white text-center px-4"
          >
            Warcok Estudio
          </motion.h1>
        </section>

        <section className="px-6 pb-32">
          <h2 className="text-[5vw] font-light mb-16 pl-6">Selected work</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[400px] gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className={`project-item ${
                  index === 0
                    ? "lg:col-span-8 lg:row-span-2"
                    : index === 1
                    ? "lg:col-span-4 lg:row-span-2"
                    : index === 2
                    ? "lg:col-span-4 lg:row-span-1"
                    : index === 3
                    ? "lg:col-span-8 lg:row-span-2"
                    : index === 4
                    ? "lg:col-span-6 lg:row-span-1"
                    : "lg:col-span-6 lg:row-span-1"
                }`}
              >
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="relative overflow-hidden group h-full rounded-2xl">
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
                      }}
                      className="relative h-full"
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <motion.div
                        whileHover={{
                          filter: "brightness(1.1) contrast(1.1)",
                          transition: { duration: 0.4 },
                        }}
                        className="h-full"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={1200}
                          height={800}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                          priority={index < 2}
                        />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 z-0"
                        whileHover={{
                          opacity: [0, 0.05, 0],
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                          },
                        }}
                      >
                        <div
                          className={`absolute inset-0 ${project.color} mix-blend-overlay opacity-40`}
                        ></div>
                      </motion.div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                        <h3 className="text-2xl font-light text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-300">
                          {project.category}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link
              href="/work"
              className="inline-flex items-center px-8 py-4 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors duration-300"
            >
              Ver todos los proyectos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="px-12 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm max-w-2xl mx-auto text-neutral-400 uppercase tracking-wider"
          >
            ESTUDIO CREATIVO ESPECIALIZADO EN BRANDING Y DISEÑO
            <br />
            ENFOCADO EN CREAR EXPERIENCIAS VISUALES ÚNICAS
          </motion.p>
        </section>

        <ContactForm />
      </main>

      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Warcok Estudio
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-sm text-neutral-500 hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
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
