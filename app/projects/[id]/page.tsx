"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";

const projectsData: { [key: number]: any } = {
  1: {
    title: "VERDE ROLLO",
    description: "Un growshop con onda.",
    client: "VERDE ROLLO",
    year: "2024",
    services: ["Branding", "Packaging", "Copywriting creativo"],
    image: "/mockups/VERDE ROLLO/VERDE ROLLO_caja.webp",
    images: [
      { url: "/mockups/VERDE ROLLO/tarjetas_.webp" },
      { url: "/mockups/VERDE ROLLO/gomitas.webp" },
      { url: "/mockups/VERDE ROLLO/cookies_del rollo.webp" },
      { url: "/mockups/VERDE ROLLO/VERDE ROLLO_caja.webp" },
    ],
    logos: [
      { url: "/mockups/VERDE ROLLO/LOGOS/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/VERDE ROLLO/LOGOS/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/VERDE ROLLO/LOGOS/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/VERDE ROLLO/LOGOS/Mesa de trabajo 4@3x.webp" },
    ],
  },
  2: {
    title: "USHI - Beauty Room",
    description:
      "Beauty room en Buenos Aires que mezcla glow, estilo y mucho mimo.",
    client: "USHI - Beauty Room",
    year: "2024",
    services: ["Rebranding", "Estrategia creativa"],
    image: "/mockups/USHI/celu_mock up.webp",
    images: [
      { url: "/mockups/USHI/tarjeta_.webp" },
      { url: "/mockups/USHI/sala_de_espera.webp" },
      { url: "/mockups/USHI/face_roller.webp" },
      { url: "/mockups/USHI/celu_mock up.webp" },
      { url: "/mockups/USHI/bolsa_mockup.webp" },
    ],
    logos: [
      { url: "/mockups/USHI/LOGOS/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/USHI/LOGOS/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/USHI/LOGOS/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/USHI/LOGOS/Mesa de trabajo 4@3x.webp" },
    ],
  },
  3: {
    title: "POPPY cerámica",
    description:
      "Taller de cerámica donde la creatividad se modela con las manos.",
    client: "POPPY cerámica",
    year: "2024",
    services: ["Branding completo"],
    image: "/mockups/POPPY cerámica/florero_.webp",
    images: [
      { url: "/mockups/POPPY cerámica/wrapping paper 1.webp" },
      { url: "/mockups/POPPY cerámica/tarjetas 1_.webp" },
      { url: "/mockups/POPPY cerámica/florero_.webp" },
    ],
    logos: [
      { url: "/mockups/POPPY cerámica/LOGOS/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/POPPY cerámica/LOGOS/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/POPPY cerámica/LOGOS/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/POPPY cerámica/LOGOS/Mesa de trabajo 4@3x.webp" },
    ],
  },
  4: {
    title: "GOGIYA",
    description: "Korean BBQ que mezcla tradición, fuego y mucho sabor.",
    client: "GOGIYA",
    year: "2024",
    services: ["Branding", "Packaging", "Menú Design"],
    image: "/mockups/GOGIYA/caja_.webp",
    images: [
      { url: "/mockups/GOGIYA/stickers.webp" },
      { url: "/mockups/GOGIYA/caja_.webp" },
      { url: "/mockups/GOGIYA/Mesa de trabajo 6@3x.webp" },
      { url: "/mockups/GOGIYA/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/GOGIYA/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/GOGIYA/Chopsticks_Mockup_2.webp" },
    ],
    logos: [
      { url: "/mockups/GOGIYA/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/GOGIYA/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/GOGIYA/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/GOGIYA/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  5: {
    title: "GET MOVING",
    description: "",
    client: "GET MOVING",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    image:
      "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.webp",
    images: [
      { url: "/mockups/GET MOVING/bag_.webp" },
      {
        url: "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.webp",
      },
      { url: "/mockups/GET MOVING/Free_Business_Card_Mockup_4.webp" },
      { url: "/mockups/GET MOVING/Black & White 1 copy 2.webp" },
    ],
    logos: [
      { url: "/mockups/GET MOVING/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/GET MOVING/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/GET MOVING/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/GET MOVING/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  6: {
    title: "EAT & FIT",
    description: "Healthy market en Pilar para comer rápido, rico y sin culpa.",
    client: "EAT & FIT",
    year: "2024",
    services: ["Rebranding", "Packaging design", "Social Media"],
    image: "/mockups/EAT & FIT/PaperBag-Unmark.webp",
    images: [
      { url: "/mockups/EAT & FIT/street sign redondo.webp" },
      { url: "/mockups/EAT & FIT/free salad container mockup_.webp" },
      { url: "/mockups/EAT & FIT/bolsa.webp" },
      { url: "/mockups/EAT & FIT/Unmark_Business-card_on _metal.webp" },
      { url: "/mockups/EAT & FIT/PaperBag-Unmark.webp" },
      {
        url: "/mockups/EAT & FIT/Falling-Business-Cards-Identity-Free-psd-Mockup.webp",
      },
    ],
    logos: [
      { url: "/mockups/EAT & FIT/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/EAT & FIT/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/EAT & FIT/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/EAT & FIT/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  7: {
    title: "COSMODIVAS 369",
    description:
      "Un universo holístico de astrología, tarot y energía femenina con mucho glam.",
    client: "COSMODIVAS 369",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    image: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.webp",
    images: [
      { url: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.webp" },
      { url: "/mockups/COSMODIVAS/cartas.webp" },
    ],
    logos: [
      { url: "/mockups/COSMODIVAS/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/COSMODIVAS/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/COSMODIVAS/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/COSMODIVAS/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  8: {
    title: "Adonde y que ®",
    description: "Blog de viajes + marketing turístico con alma nómade.",
    client: "Adonde y que ®",
    year: "2024",
    services: ["Branding completo"],
    image: "/mockups/ADONDEYQUE/AGENDA_.webp",
    images: [
      { url: "/mockups/ADONDEYQUE/piluso.webp" },
      { url: "/mockups/ADONDEYQUE/Stickers on macbook.webp" },
      { url: "/mockups/ADONDEYQUE/Linen_Backpack_Mockup_1.webp" },
      { url: "/mockups/ADONDEYQUE/AGENDA_.webp" },
    ],
    logos: [
      { url: "/mockups/ADONDEYQUE/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/ADONDEYQUE/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/ADONDEYQUE/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/ADONDEYQUE/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  9: {
    title: "MALVA café",
    description: "Café en Palermo con aroma a hogar y estética que abraza.",
    client: "MALVA café",
    year: "2024",
    services: ["Branding", "Estrategia para Redes", "Diseño de vidriera"],
    image: "/mockups/MALVA café/FRENTE_CAFETERIA.webp",
    images: [
      { url: "/mockups/MALVA café/coffee holder.webp" },
      { url: "/mockups/MALVA café/REMERA.webp" },
      { url: "/mockups/MALVA café/Mesa de trabajo 7_1@3x.webp" },
      { url: "/mockups/MALVA café/Mesa de trabajo 5@3x.webp" },
      { url: "/mockups/MALVA café/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/MALVA café/FRENTE_CAFETERIA.webp" },
    ],
    logos: [
      { url: "/mockups/MALVA café/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/MALVA café/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/MALVA café/LOGOs/Mesa de trabajo 3@3x.webp" },
      { url: "/mockups/MALVA café/LOGOs/Mesa de trabajo 4@3x.webp" },
    ],
  },
  10: {
    title: "WE TRAVEL",
    description:
      "Agencia de viajes pensada para jóvenes que quieren recorrer el mundo sin vueltas.",
    client: "WE TRAVEL",
    year: "2024",
    services: ["Identidad visual"],
    image: "/mockups/WE TRAVEL/papeleria_.webp",
    images: [
      { url: "/mockups/WE TRAVEL/set_stickers.webp" },
      { url: "/mockups/WE TRAVEL/papeleria_.webp" },
      { url: "/mockups/WE TRAVEL/cartel_calle.webp" },
      { url: "/mockups/WE TRAVEL/Mesa de trabajo 8proyecto.webp" },
    ],
    logos: [
      { url: "/mockups/WE TRAVEL/LOGOs/Mesa de trabajo 1@3x.webp" },
      { url: "/mockups/WE TRAVEL/LOGOs/Mesa de trabajo 2@3x.webp" },
      { url: "/mockups/WE TRAVEL/LOGOs/Mesa de trabajo 3@3x.webp" },
    ],
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const project = projectsData[Number(params.id)];
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = project.images.filter(
    (img: { url: string }) => img.url !== project.image
  );

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-sm font-medium tracking-wider">
          Belen Warcok
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
                    {project.services.map((service: string) => (
                      <li key={service} className="text-lg">
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
                {project.images.map((img: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="w-full h-80 relative rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img.url}
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
                {project.logos.map((logo: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="w-full aspect-square relative rounded-xl overflow-hidden bg-neutral-900"
                  >
                    <Image
                      src={logo.url}
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
