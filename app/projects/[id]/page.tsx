"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const projectsData = {
  1: {
    title: "Gaston: Lighting under a new light",
    category: "REBRANDING",
    description:
      "Una nueva perspectiva en iluminación que combina diseño contemporáneo con funcionalidad excepcional.",
    client: "Gaston Lighting Co.",
    year: "2024",
    services: [
      "Branding",
      "Diseño de Packaging",
      "Dirección de Arte",
      "Fotografía",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2940&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?q=80&w=2940&auto=format&fit=crop",
        size: "large",
        caption: "Diseño de empaque premium",
      },
      {
        url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=2887&auto=format&fit=crop",
        size: "small",
        caption: "Detalles del producto",
      },
      {
        url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2787&auto=format&fit=crop",
        size: "medium",
        caption: "Ambiente y contexto",
      },
      {
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2787&auto=format&fit=crop",
        size: "small",
        caption: "Proceso creativo",
      },
    ],
    color: "bg-pink-400",
  },
  2: {
    title: "Phylis: Sustainable packaging",
    category: "REBRANDING",
    description:
      "Redefiniendo el packaging sostenible con un enfoque en la belleza y la responsabilidad ambiental.",
    client: "Phylis Eco Solutions",
    year: "2024",
    services: ["Diseño Sostenible", "Branding", "Estrategia", "Packaging"],
    mainImage:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=2787&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1585435421671-0c16737a6f97?q=80&w=2940&auto=format&fit=crop",
        size: "large",
        caption: "Materiales sostenibles",
      },
      {
        url: "https://images.unsplash.com/photo-1597760727511-fe0b0f0e0ea8?q=80&w=2940&auto=format&fit=crop",
        size: "small",
        caption: "Proceso de producción",
      },
      {
        url: "https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Impacto ambiental",
      },
    ],
    color: "bg-green-200",
  },
  3: {
    title: "Vintage Everything: Fashion Hunters",
    category: "REBRANDING",
    description:
      "Una revolucionaria plataforma de moda vintage que conecta coleccionistas con piezas únicas.",
    client: "Vintage Everything Co.",
    year: "2024",
    services: ["Branding", "Diseño Web", "Fotografía", "Estrategia Digital"],
    mainImage:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2938&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop",
        size: "large",
        caption: "Campaña fotográfica",
      },
      {
        url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Concepto de marca",
      },
      {
        url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=2785&auto=format&fit=crop",
        size: "small",
        caption: "Detalles de producto",
      },
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Experiencia de compra",
      },
    ],
    color: "bg-red-400",
  },
  4: {
    title: "Schlong: The subtle art of fine living",
    category: "REBRANDING",
    description:
      "Redefiniendo el lujo moderno a través del diseño y la experiencia sensorial.",
    client: "Schlong Lifestyle",
    year: "2024",
    services: [
      "Branding",
      "Diseño Editorial",
      "Dirección de Arte",
      "Packaging",
    ],
    mainImage:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2940&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2787&auto=format&fit=crop",
        size: "large",
        caption: "Diseño editorial",
      },
      {
        url: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2940&auto=format&fit=crop",
        size: "small",
        caption: "Packaging premium",
      },
      {
        url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Experiencia de marca",
      },
    ],
    color: "bg-stone-300",
  },
  5: {
    title: "LeBlink: Skincare for the modern age",
    category: "REBRANDING",
    description:
      "Una marca de skincare que fusiona ciencia avanzada con ingredientes naturales.",
    client: "LeBlink Beauty",
    year: "2024",
    services: ["Branding", "Packaging", "Fotografía", "Estrategia Digital"],
    mainImage:
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=2787&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2940&auto=format&fit=crop",
        size: "large",
        caption: "Línea de productos",
      },
      {
        url: "https://images.unsplash.com/photo-1531895861208-8504b98fe814?q=80&w=2940&auto=format&fit=crop",
        size: "small",
        caption: "Ingredientes naturales",
      },
      {
        url: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Experiencia de usuario",
      },
    ],
    color: "bg-blue-200",
  },
  6: {
    title: "Sensaya: Beauty for everyone",
    category: "REBRANDING",
    description:
      "Una marca de belleza inclusiva que celebra la diversidad y la autenticidad.",
    client: "Sensaya Cosmetics",
    year: "2024",
    services: ["Branding", "Packaging", "Campaña Digital", "Fotografía"],
    mainImage:
      "https://images.unsplash.com/photo-1512207846876-bb54ef5056fe?q=80&w=2787&auto=format&fit=crop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2940&auto=format&fit=crop",
        size: "large",
        caption: "Campaña de inclusividad",
      },
      {
        url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=2940&auto=format&fit=crop",
        size: "medium",
        caption: "Diversidad en acción",
      },
      {
        url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2940&auto=format&fit=crop",
        size: "small",
        caption: "Productos inclusivos",
      },
    ],
    color: "bg-indigo-900",
  },
};

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projectsData[params.id as keyof typeof projectsData];

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
                    {project.services.map((service) => (
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
            {project.images.map((image, index) => (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 * (index + 1) }}
                className={`relative rounded-2xl overflow-hidden ${
                  image.size === "large"
                    ? "md:col-span-8 aspect-[16/9]"
                    : image.size === "medium"
                    ? "md:col-span-6 aspect-square"
                    : "md:col-span-4 aspect-square"
                }`}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
