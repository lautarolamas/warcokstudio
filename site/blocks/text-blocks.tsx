"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlockComponentProps } from "@/cms/react/route-renderer";
import { NarrowSection } from "./section";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

export function PageTitle({ block, index }: BlockComponentProps<{ title: string }>) {
  return (
    <NarrowSection index={index}>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-light mb-10"
      >
        {block.title}
      </motion.h1>
    </NarrowSection>
  );
}

export function Profile({
  block,
  index,
}: BlockComponentProps<{ image: string; name: string; role: string }>) {
  return (
    <NarrowSection index={index} className="mb-16">
      <motion.div {...fadeUp} className="flex flex-col items-center">
        <div className="w-64 h-64 rounded-full overflow-hidden mb-8">
          <Image
            src={block.image}
            alt={block.name}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-light">{block.name}</h2>
        {block.role && <p className="text-neutral-400 mt-2">{block.role}</p>}
      </motion.div>
    </NarrowSection>
  );
}

export function RichText({
  block,
  index,
}: BlockComponentProps<{ heading: string; text: string }>) {
  const paragraphs = block.text.split(/\n\s*\n/).filter((p) => p.trim());
  return (
    <NarrowSection index={index} className="mb-16">
      <motion.div {...fadeUp} className="text-lg leading-relaxed">
        {block.heading && (
          <h2 className="text-2xl font-light mb-6">{block.heading}</h2>
        )}
        {paragraphs.map((p, i) => (
          <p key={i} className="mb-6 whitespace-pre-line">
            {p}
          </p>
        ))}
      </motion.div>
    </NarrowSection>
  );
}

export function Services({
  block,
  index,
}: BlockComponentProps<{
  heading: string;
  groups: { title: string; items: string[] }[];
}>) {
  return (
    <NarrowSection index={index} className="mb-16">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-light mb-6">{block.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {block.groups.map((group, i) => (
            <div key={i}>
              <h3 className="text-xl font-light mb-3">{group.title}</h3>
              <ul className="text-neutral-400 space-y-2">
                {group.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </NarrowSection>
  );
}

export function Cta({
  block,
  index,
}: BlockComponentProps<{
  heading: string;
  text: string;
  linkLabel: string;
  linkHref: string;
}>) {
  return (
    <NarrowSection index={index} className="mb-16">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-light mb-6">{block.heading}</h2>
        {block.text && <p className="text-neutral-400 mb-4">{block.text}</p>}
        {block.linkLabel && (
          <Link
            href={block.linkHref || "#"}
            className="inline-block border-b border-white pb-1 hover:text-neutral-300 transition-colors"
          >
            {block.linkLabel}
          </Link>
        )}
      </motion.div>
    </NarrowSection>
  );
}

export function TextBanner({ block, index }: BlockComponentProps<{ text: string }>) {
  return (
    <section className={`px-12 py-20 text-center ${index === 0 ? "pt-40" : ""}`}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-sm max-w-2xl mx-auto text-neutral-400 uppercase tracking-wider"
      >
        {block.text}
      </motion.p>
    </section>
  );
}

const COLUMNS: Record<string, string> = {
  "2": "md:grid-cols-2",
  "3": "md:grid-cols-3",
  "4": "md:grid-cols-4",
};

export function ImageGallery({
  block,
  index,
}: BlockComponentProps<{ heading: string; columns: string; images: string[] }>) {
  return (
    <section className={`px-6 pb-16 ${index === 0 ? "pt-32" : ""}`}>
      <div className="max-w-7xl mx-auto">
        {block.heading && (
          <h2 className="text-2xl font-light mb-6">{block.heading}</h2>
        )}
        <div className={`grid grid-cols-1 gap-6 ${COLUMNS[block.columns] ?? COLUMNS["2"]}`}>
          {block.images.map((src, i) => (
            <div key={i} className="w-full h-80 relative rounded-xl overflow-hidden">
              <Image
                src={src}
                alt={`${block.heading || "Imagen"} ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
