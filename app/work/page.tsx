"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";

const projects = [
  {
    id: 1,
    title: "VERDE ROLLO",
    images: [
      "/mockups/VERDE ROLLO/tarjetas_.webp",
      "/mockups/VERDE ROLLO/gomitas.webp",
      "/mockups/VERDE ROLLO/cookies_del rollo.webp",
      "/mockups/VERDE ROLLO/VERDE ROLLO_caja.webp",
    ],
    image: "/mockups/VERDE ROLLO/gomitas.webp",
  },
  {
    id: 2,
    title: "USHI",
    images: [
      "/mockups/USHI/tarjeta_.webp",
      "/mockups/USHI/sala_de_espera.webp",
      "/mockups/USHI/face_roller.webp",
      "/mockups/USHI/celu_mock up.webp",
      "/mockups/USHI/cartel_calle.webp",
      "/mockups/USHI/bolsa_mockup.webp",
    ],
    image: "/mockups/USHI/celu_mock up.webp",
  },
  {
    id: 3,
    title: "POPPY",
    images: [
      "/mockups/POPPY cerámica/wrapping paper 1.webp",
      "/mockups/POPPY cerámica/tarjetas 1_.webp",
      "/mockups/POPPY cerámica/florero_.webp",
      "/mockups/POPPY cerámica/cinta_mock up.webp",
    ],
    image: "/mockups/POPPY cerámica/florero_.webp",
  },
  {
    id: 4,
    title: "GOGIYA",
    images: [
      "/mockups/GOGIYA/stickers.webp",
      "/mockups/GOGIYA/caja_.webp",
      "/mockups/GOGIYA/Mesa de trabajo 6@3x.webp",
      "/mockups/GOGIYA/GOGIYA.webp",
      "/mockups/GOGIYA/Chopsticks_Mockup_2.webp",
    ],
    image: "/mockups/GOGIYA/caja_.webp",
  },
  {
    id: 5,
    title: "GET MOVING",
    images: [
      "/mockups/GET MOVING/free-bottle-mockup-sachanati.com.webp",
      "/mockups/GET MOVING/bag_.webp",
      "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.webp",
      "/mockups/GET MOVING/Free_Business_Card_Mockup_4.webp",
      "/mockups/GET MOVING/Black & White 1 copy 2.webp",
    ],
    image:
      "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.webp",
  },
  {
    id: 6,
    title: "EAT & FIT",
    images: [
      "/mockups/EAT & FIT/street sign redondo.webp",
      "/mockups/EAT & FIT/free salad container mockup_.webp",
      "/mockups/EAT & FIT/bolsa.webp",
      "/mockups/EAT & FIT/Unmark_Business-card_on _metal.webp",
      "/mockups/EAT & FIT/PaperBag-Unmark.webp",
      "/mockups/EAT & FIT/Falling-Business-Cards-Identity-Free-psd-Mockup.webp",
    ],
    image: "/mockups/EAT & FIT/PaperBag-Unmark.webp",
  },
  {
    id: 7,
    title: "COSMODIVAS",
    images: ["/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.webp"],
    image: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.webp",
  },
  {
    id: 8,
    title: "ADONDEYQUE",
    images: [
      "/mockups/ADONDEYQUE/piluso.webp",
      "/mockups/ADONDEYQUE/Stickers on macbook.webp",
      "/mockups/ADONDEYQUE/Linen_Backpack_Mockup_1.webp",
      "/mockups/ADONDEYQUE/AGENDA_.webp",
    ],
    image: "/mockups/ADONDEYQUE/AGENDA_.webp",
  },
  {
    id: 9,
    title: "MALVA",
    images: [
      "/mockups/MALVA café/coffee holder.webp",
      "/mockups/MALVA café/REMERA.webp",
      "/mockups/MALVA café/Mesa de trabajo 7_1@3x.webp",
      "/mockups/MALVA café/Mesa de trabajo 5@3x.webp",
      "/mockups/MALVA café/Mesa de trabajo 3@3x.webp",
      "/mockups/MALVA café/FRENTE_CAFETERIA.webp",
    ],
    image: "/mockups/MALVA café/FRENTE_CAFETERIA.webp",
  },
  {
    id: 10,
    title: "WE TRAVEL",
    images: [
      "/mockups/WE TRAVEL/set_stickers.webp",
      "/mockups/WE TRAVEL/papeleria_.webp",
      "/mockups/WE TRAVEL/cartel_calle.webp",
      "/mockups/WE TRAVEL/Mesa de trabajo 8proyecto.webp",
    ],
    image: "/mockups/WE TRAVEL/papeleria_.webp",
  },
];

export default function WorkPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-light mb-16">
            Últimos proyectos
          </h1>

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
                          className={`absolute inset-0 mix-blend-overlay opacity-40`}
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
