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

const projectsData: { [key: number]: any } = {
  1: {
    title: "VERDE ROLLO",
    category: "REBRANDING",
    description: "Identidad visual para VERDE ROLLO.",
    client: "VERDE ROLLO",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/VERDE ROLLO/tarjetas_.png",
    images: [
      { url: "/mockups/VERDE ROLLO/tarjetas_.png", caption: "Tarjetas" },
      { url: "/mockups/VERDE ROLLO/gomitas.png", caption: "Gomitas" },
      {
        url: "/mockups/VERDE ROLLO/cookies_del rollo.png",
        caption: "Cookies del rollo",
      },
      { url: "/mockups/VERDE ROLLO/VERDE ROLLO_caja.png", caption: "Caja" },
    ],
    color: "bg-pink-400",
  },
  2: {
    title: "USHI",
    category: "REBRANDING",
    description: "Identidad visual para USHI.",
    client: "USHI",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/USHI/tarjeta_.png",
    images: [
      { url: "/mockups/USHI/tarjeta_.png", caption: "Tarjeta" },
      { url: "/mockups/USHI/sala_de_espera.png", caption: "Sala de espera" },
      { url: "/mockups/USHI/face_roller.png", caption: "Face roller" },
      { url: "/mockups/USHI/celu_mock up.png", caption: "Celu mockup" },
      { url: "/mockups/USHI/cartel_calle.png", caption: "Cartel calle" },
      { url: "/mockups/USHI/bolsa_mockup.png", caption: "Bolsa mockup" },
    ],
    color: "bg-green-200",
  },
  3: {
    title: "POPPY cerámica",
    category: "REBRANDING",
    description: "Identidad visual para POPPY cerámica.",
    client: "POPPY cerámica",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/POPPY cerámica/wrapping paper 1.png",
    images: [
      {
        url: "/mockups/POPPY cerámica/wrapping paper 1.png",
        caption: "Wrapping paper",
      },
      { url: "/mockups/POPPY cerámica/tarjetas 1_.png", caption: "Tarjetas" },
      { url: "/mockups/POPPY cerámica/florero_.png", caption: "Florero" },
      {
        url: "/mockups/POPPY cerámica/cinta_mock up.png",
        caption: "Cinta mockup",
      },
    ],
    color: "bg-red-400",
  },
  4: {
    title: "GOGIYA",
    category: "REBRANDING",
    description: "Identidad visual para GOGIYA.",
    client: "GOGIYA",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/GOGIYA/stickers.png",
    images: [
      { url: "/mockups/GOGIYA/stickers.png", caption: "Stickers" },
      { url: "/mockups/GOGIYA/caja_.png", caption: "Caja" },
      {
        url: "/mockups/GOGIYA/Mesa de trabajo 6@3x.png",
        caption: "Mesa de trabajo",
      },
      { url: "/mockups/GOGIYA/GOGIYA.png", caption: "Logo" },
      { url: "/mockups/GOGIYA/Chopsticks_Mockup_2.png", caption: "Chopsticks" },
    ],
    color: "bg-stone-300",
  },
  5: {
    title: "GET MOVING",
    category: "REBRANDING",
    description: "Identidad visual para GET MOVING.",
    client: "GET MOVING",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/GET MOVING/free-bottle-mockup-sachanati.com.png",
    images: [
      {
        url: "/mockups/GET MOVING/free-bottle-mockup-sachanati.com.png",
        caption: "Botella",
      },
      { url: "/mockups/GET MOVING/bag_.png", caption: "Bolsa" },
      {
        url: "/mockups/GET MOVING/Gravity-Identity-Brand-Cards-Free-psd-Mockup.png",
        caption: "Cards",
      },
      {
        url: "/mockups/GET MOVING/Free_Business_Card_Mockup_4.png",
        caption: "Business Card",
      },
      {
        url: "/mockups/GET MOVING/Black & White 1 copy 2.png",
        caption: "Black & White",
      },
    ],
    color: "bg-blue-200",
  },
  6: {
    title: "EAT & FIT",
    category: "REBRANDING",
    description: "Identidad visual para EAT & FIT.",
    client: "EAT & FIT",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/EAT & FIT/street sign redondo.png",
    images: [
      {
        url: "/mockups/EAT & FIT/street sign redondo.png",
        caption: "Street sign",
      },
      {
        url: "/mockups/EAT & FIT/free salad container mockup_.png",
        caption: "Salad container",
      },
      { url: "/mockups/EAT & FIT/bolsa.png", caption: "Bolsa" },
      {
        url: "/mockups/EAT & FIT/Unmark_Business-card_on _metal.png",
        caption: "Business card metal",
      },
      { url: "/mockups/EAT & FIT/PaperBag-Unmark.png", caption: "Paper bag" },
      {
        url: "/mockups/EAT & FIT/Falling-Business-Cards-Identity-Free-psd-Mockup.png",
        caption: "Falling business cards",
      },
    ],
    color: "bg-indigo-900",
  },
  7: {
    title: "COSMODIVAS",
    category: "REBRANDING",
    description: "Identidad visual para COSMODIVAS.",
    client: "COSMODIVAS",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.png",
    images: [
      {
        url: "/mockups/COSMODIVAS/Business-Card-Mockup-vol-29.png",
        caption: "Business Card",
      },
    ],
    color: "bg-fuchsia-400",
  },
  8: {
    title: "ADONDEYQUE",
    category: "REBRANDING",
    description: "Identidad visual para ADONDEYQUE.",
    client: "ADONDEYQUE",
    year: "2024",
    services: ["Branding", "Packaging", "Dirección de Arte"],
    mainImage: "/mockups/ADONDEYQUE/piluso.png",
    images: [
      { url: "/mockups/ADONDEYQUE/piluso.png", caption: "Piluso" },
      {
        url: "/mockups/ADONDEYQUE/Stickers on macbook.png",
        caption: "Stickers on macbook",
      },
      {
        url: "/mockups/ADONDEYQUE/Linen_Backpack_Mockup_1.png",
        caption: "Linen Backpack",
      },
      { url: "/mockups/ADONDEYQUE/AGENDA_.png", caption: "Agenda" },
    ],
    color: "bg-yellow-400",
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData[Number(params.id)];
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const galleryImages = project.images.filter(
    (img: { url: string }) => img.url !== project.mainImage
  );

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-black/80 backdrop-blur-sm">
        <Link href="/" className="text-sm font-medium tracking-wider">
          Warcok Estudio
        </Link>
        <Link
          href="/"
          className="text-sm font-medium hover:opacity-70 transition-opacity"
        >
          ← VOLVER
        </Link>
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
                  src={project.mainImage}
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryImages.map(
              (image: { url: string; caption: string }, idx: number) => (
                <div
                  key={image.url}
                  className="relative rounded-2xl overflow-hidden md:col-span-6 aspect-[16/9] cursor-pointer"
                  onClick={() => {
                    setActiveIndex(idx);
                    setModalOpen(true);
                  }}
                >
                  <Image
                    src={image.url}
                    alt={image.caption}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-sm text-white">{image.caption}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Modal Swiper */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
              <button
                className="absolute top-8 right-8 text-white text-3xl z-50"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
              <div className="w-full max-w-3xl">
                <Swiper
                  initialSlide={activeIndex}
                  navigation
                  pagination={{ clickable: true }}
                  effect="fade"
                  modules={[Navigation, Pagination, EffectFade]}
                  className="rounded-2xl"
                >
                  {galleryImages.map(
                    (image: { url: string; caption: string }) => (
                      <SwiperSlide key={image.url}>
                        <div className="relative w-full h-[60vw] max-h-[70vh]">
                          <Image
                            src={image.url}
                            alt={image.caption}
                            fill
                            className="object-contain rounded-2xl"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                            <p className="text-sm text-white">
                              {image.caption}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
