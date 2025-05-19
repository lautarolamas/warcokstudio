import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  id: number;
  title: string;
  image: string;
  index: number;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  image,
  index,
  priority = false,
  className = "lg:col-span-6 lg:row-span-1",
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      <Link href={`/projects/${id}`} className="block h-full">
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
                src={image}
                alt={title}
                width={1200}
                height={800}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                priority={priority}
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
              <div className="absolute inset-0 mix-blend-overlay opacity-40"></div>
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <h3 className="text-2xl font-light text-white mb-2">{title}</h3>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
