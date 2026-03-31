"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import GeometricCanvas from "./GeometricCanvas";
import FloatingMaps from "./FloatingMaps";
import type { Locale } from "@/lib/i18n/config";

interface MapData {
  id: string;
  image: string;
  title: Record<string, string>;
}

interface HeroProps {
  locale: Locale;
  maps: MapData[];
  dict: {
    hero: {
      greeting: string;
      name: string;
      subtitle: string;
      description: string;
      cta: string;
    };
  };
}

export default function HeroSection({ locale, maps, dict }: HeroProps) {
  // Text appears after the wind burst (~2.5s)
  const textDelay = 2.0;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/IMG_7488.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      <GeometricCanvas />

      {/* Floating map images */}
      <FloatingMaps locale={locale} maps={maps} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        {dict.hero.greeting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: textDelay }}
            className="text-emerald-400 text-lg mb-4"
          >
            {dict.hero.greeting}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, delay: textDelay + 0.2, ease: "easeOut" }}
          className="text-6xl sm:text-8xl font-bold mb-2"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            {dict.hero.name}
          </span>
          {dict.hero.subtitle && (
            <span className="text-text">{dict.hero.subtitle}</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: textDelay + 0.8 }}
          className="text-text-muted text-lg sm:text-xl mt-6 mb-10 tracking-widest uppercase"
        >
          {dict.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: textDelay + 1.2 }}
        >
          <Link
            href={`/${locale}/portfolio`}
            className="inline-block px-8 py-3 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white font-medium transition-all duration-300 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-400/50"
          >
            {dict.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
