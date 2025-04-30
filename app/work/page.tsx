"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

export default function WorkPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-sm font-medium tracking-wider">
          Warcok Estudio
        </Link>
        <div className="flex items-center space-x-8">
          <Link
            href="/work"
            className="text-sm font-medium hover:opacity-70 transition-opacity border-b border-white"
          >
            WORK
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
          >
            CONTACT
          </Link>
        </div>
        <div className="w-[100px]"></div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-16">Our Work</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[400px] gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="lg:col-span-6 lg:row-span-1"
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
        </motion.div>
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
