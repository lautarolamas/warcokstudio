"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Instagram, Linkedin } from "lucide-react";
import { ProjectCard } from "@/components/project-card";

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
    image: "/mockups/VERDE ROLLO/VERDE ROLLO_caja.webp",
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
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                image={project.image}
                index={index}
                priority={index < 2}
              />
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
