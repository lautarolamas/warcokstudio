"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { BlockComponentProps } from "@/cms/react/route-renderer";

type HeroBlock = { title: string; subtitle: string; rotatingWords: string[] };

export function Hero({ block }: BlockComponentProps<HeroBlock>) {
  const letters = block.title.split("");
  return (
    <section className="h-screen flex flex-col items-center justify-center relative">
      <motion.h1
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
        className="text-[13vw] leading-none font-medium text-white text-center px-4 flex justify-center"
        aria-label={block.title}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ color: "#222" }}
            animate={{ color: "#fff" }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.5, ease: "easeInOut" }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </motion.h1>
      {block.subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base md:text-2xl text-neutral-400 mt-6 text-center tracking-wide"
        >
          {block.subtitle}
        </motion.p>
      )}
      {block.rotatingWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full flex justify-center mt-2"
        >
          <AutoCarouselText words={block.rotatingWords} />
        </motion.div>
      )}
    </section>
  );
}

function AutoCarouselText({ words }: { words: string[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;
    intervalRef.current = setInterval(() => {
      if (api) api.scrollNext();
    }, 2000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api]);

  return (
    <div className="w-full max-w-xl">
      <Carousel
        // Remonta el carrusel cuando cambian las palabras desde el panel.
        key={words.join("|")}
        opts={{ loop: true, align: "start", duration: 700 }}
        setApi={setApi}
        className="overflow-hidden [&_.embla__slide]:transition-transform [&_.embla__slide]:duration-500 [&_.embla__slide]:ease-in-out"
      >
        <CarouselContent>
          {words.map((word, i) => (
            <CarouselItem key={i}>
              <div className="text-base md:text-2xl text-neutral-100 text-center tracking-wide whitespace-nowrap px-8">
                {word}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
