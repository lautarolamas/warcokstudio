"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { Header } from "@/components/header";
import { FloatingImages } from "@/components/floating-images";

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
      title: "VERDE ROLLO",
      category: "REBRANDING",
      images: [
        "/mockups/VERDE ROLLO/tarjetas_.png",
        "/mockups/VERDE ROLLO/gomitas.png",
        "/mockups/VERDE ROLLO/cookies_del rollo.png",
        "/mockups/VERDE ROLLO/VERDE ROLLO_caja.png",
      ],
      image: "/mockups/VERDE ROLLO/tarjetas_.png",
    },
    {
      id: 2,
      title: "USHI",
      category: "REBRANDING",
      images: [
        "/mockups/USHI/tarjeta_.png",
        "/mockups/USHI/sala_de_espera.png",
        "/mockups/USHI/face_roller.png",
        "/mockups/USHI/celu_mock up.png",
        "/mockups/USHI/cartel_calle.png",
        "/mockups/USHI/bolsa_mockup.png",
      ],
      image: "/mockups/USHI/tarjeta_.png",
    },
    {
      id: 3,
      title: "POPPY cerámica",
      category: "REBRANDING",
      images: [
        "/mockups/POPPY cerámica/wrapping paper 1.png",
        "/mockups/POPPY cerámica/tarjetas 1_.png",
        "/mockups/POPPY cerámica/florero_.png",
        "/mockups/POPPY cerámica/cinta_mock up.png",
      ],
      image: "/mockups/POPPY cerámica/wrapping paper 1.png",
    },
    {
      id: 4,
      title: "GOGIYA",
      category: "REBRANDING",
      images: [
        "/mockups/GOGIYA/stickers.png",
        "/mockups/GOGIYA/caja_.png",
        "/mockups/GOGIYA/Mesa de trabajo 6@3x.png",
        "/mockups/GOGIYA/GOGIYA.png",
        "/mockups/GOGIYA/Chopsticks_Mockup_2.png",
      ],
      image: "/mockups/GOGIYA/stickers.png",
    },
    {
      id: 5,
      title: "GET MOVING",
      category: "REBRANDING",
      images: [
        "/mockups/GET MOVING/free-bottle-mockup-sachanati.com.png",
        "/mockups/GET MOVING/bag_.png",
        "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.png",
        "/mockups/GET MOVING/Free_Business_Card_Mockup_4.png",
        "/mockups/GET MOVING/Black & White 1 copy 2.png",
      ],
      image: "/mockups/GET MOVING/free-bottle-mockup-sachanati.com.png",
    },
    {
      id: 6,
      title: "EAT & FIT",
      category: "REBRANDING",
      images: [
        "/mockups/EAT & FIT/street sign redondo.png",
        "/mockups/EAT & FIT/free salad container mockup_.png",
        "/mockups/EAT & FIT/bolsa.png",
        "/mockups/EAT & FIT/Unmark_Business-card_on _metal.png",
        "/mockups/EAT & FIT/PaperBag-Unmark.png",
        "/mockups/EAT & FIT/Falling-Business-Cards-Identity-Free-psd-Mockup.png",
      ],
      image: "/mockups/EAT & FIT/street sign redondo.png",
    },
    {
      id: 7,
      title: "COSMODIVAS",
      category: "REBRANDING",
      images: ["/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.png"],
      image: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.png",
    },
    {
      id: 8,
      title: "ADONDEYQUE",
      category: "REBRANDING",
      images: [
        "/mockups/ADONDEYQUE/piluso.png",
        "/mockups/ADONDEYQUE/Stickers on macbook.png",
        "/mockups/ADONDEYQUE/Linen_Backpack_Mockup_1.png",
        "/mockups/ADONDEYQUE/AGENDA_.png",
      ],
      image: "/mockups/ADONDEYQUE/piluso.png",
    },
  ];

  // Animación de letras para el título
  const title = "Warcok Estudio";
  const letters = title.split("");

  const [showAll, setShowAll] = useState(false);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen">
      <Header />

      <main>
        <section className="h-screen flex items-center justify-center relative">
          <motion.h1
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 18 }}
            style={{ opacity, scale }}
            className="text-[13vw] leading-none font-medium text-white text-center px-4 flex justify-center"
            aria-label={title}
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ color: "#222" }}
                animate={{ color: "#fff" }}
                transition={{
                  delay: 0.2 + i * 0.2,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          <FloatingImages
            images={projects.map((project) => ({
              src: project.image,
              alt: project.title,
            }))}
          />
        </section>

        <section className="px-6 pb-32">
          <h2 className="text-[5vw] font-light mb-16 pl-6">
            Trabajos destacados
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[400px] gap-6">
            {(showAll ? projects : projects.slice(0, 4)).map(
              (project, index) => (
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
                  <Link
                    href={`/projects/${project.id}`}
                    className="block h-full"
                  >
                    <div className="relative overflow-hidden group h-full rounded-2xl">
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          transition: {
                            duration: 0.6,
                            ease: [0.33, 1, 0.68, 1],
                          },
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
              )
            )}
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

        {/* <ContactForm /> */}
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
