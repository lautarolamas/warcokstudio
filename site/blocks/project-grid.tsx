"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import { useCollection } from "@/cms/react/provider";
import type { BlockComponentProps } from "@/cms/react/route-renderer";
import type { Project } from "@/site/types";

type ProjectGridBlock = {
  heading: string;
  layout: "featured" | "grid";
  projects: string[];
  limit: number;
  linkLabel: string;
  linkHref: string;
};

const FEATURED_SPANS = [
  "lg:col-span-8 lg:row-span-2",
  "lg:col-span-4 lg:row-span-2",
  "lg:col-span-4 lg:row-span-1",
  "lg:col-span-8 lg:row-span-2",
];

export function ProjectGrid({ block, index }: BlockComponentProps<ProjectGridBlock>) {
  const all = useCollection<Project>("projects");
  let projects = block.projects.length
    ? block.projects
        .map((id) => all.find((p) => p.id === id))
        .filter((p): p is Project => Boolean(p))
    : all;
  if (block.limit > 0) projects = projects.slice(0, block.limit);

  const cards = projects.map((project, i) => (
    <ProjectCard
      key={project.id}
      id={project.id}
      title={project.cardTitle || project.title}
      image={project.image}
      index={i}
      priority={i < 2}
      className={
        block.layout === "featured"
          ? `project-item ${FEATURED_SPANS[i] ?? "lg:col-span-6 lg:row-span-1"}`
          : undefined
      }
    />
  ));

  const link = block.linkLabel && block.linkHref && (
    <div className="flex justify-center mt-16">
      <Link
        href={block.linkHref}
        className="inline-flex items-center px-8 py-4 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors duration-300"
      >
        {block.linkLabel}
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
  );

  if (block.layout === "featured") {
    return (
      <section className={`px-6 pb-32 ${index === 0 ? "pt-32" : ""}`}>
        <h2 className="text-[5vw] font-light mb-16 pl-6">{block.heading}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[400px] gap-6">
          {cards}
        </div>
        {link}
      </section>
    );
  }

  return (
    <section className={`pb-20 px-6 ${index === 0 ? "pt-32" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-light mb-16">{block.heading}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 auto-rows-[400px] gap-6">
          {cards}
        </div>
        {link}
      </motion.div>
    </section>
  );
}
