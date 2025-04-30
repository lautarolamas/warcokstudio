"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function WorkPage() {
  const projects = [
    {
      id: 1,
      title: "Gaston: Lighting under a new light",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=Gaston",
      color: "bg-pink-400",
    },
    {
      id: 2,
      title: "Phylis: Sustainable packaging",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=Phylis",
      color: "bg-green-200",
    },
    {
      id: 3,
      title: "Vintage Everything: Fashion Hunters",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=Vintage",
      color: "bg-red-400",
    },
    {
      id: 4,
      title: "Schlong: The subtle art of fine living",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=Schlong",
      color: "bg-stone-300",
    },
    {
      id: 5,
      title: "LeBlink: Skincare for the modern age",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=LeBlink",
      color: "bg-blue-200",
    },
    {
      id: 6,
      title: "Sensaya: Beauty for everyone",
      category: "REBRANDING",
      image: "/placeholder.svg?height=600&width=600&text=Sensaya",
      color: "bg-indigo-900",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-sm font-light tracking-wider">
          WARKOC STUDIO
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
        <div className="text-sm font-light">©2025</div>
      </header>

      <main>
        <section className="pt-32 pb-20 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[5vw] font-light mb-16"
          >
            Selected work
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-[repeat(6,250px)] gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`project-item ${
                  index === 0
                    ? "md:col-span-4 md:row-span-2"
                    : index === 1
                    ? "md:col-span-2 md:row-span-3"
                    : index === 2
                    ? "md:col-span-2 md:row-span-2"
                    : index === 3
                    ? "md:col-span-4 md:row-span-3"
                    : index === 4
                    ? "md:col-span-3 md:row-span-2"
                    : "md:col-span-3 md:row-span-2"
                }`}
              >
                <Link href={`/projects/${project.id}`} className="block h-full">
                  <div className="relative overflow-hidden group h-full">
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
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                          className={`absolute inset-0 ${project.color} mix-blend-overlay opacity-60`}
                        ></div>
                      </motion.div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-light text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-neutral-300 mt-1">
                          {project.category}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-neutral-900">
        <div className="flex justify-between items-center">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Warkoc Studio
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
