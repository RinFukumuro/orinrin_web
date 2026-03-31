"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GeometricCanvas from "./GeometricCanvas";
import type { Locale } from "@/lib/i18n/config";

interface HeroProps {
  locale: Locale;
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

export default function HeroSection({ locale, dict }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GeometricCanvas />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-emerald-400 text-lg mb-4"
        >
          {dict.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold mb-2"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            {dict.hero.name}
          </span>
          <span className="text-text">{dict.hero.subtitle}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-muted text-lg sm:text-xl mt-4 mb-8"
        >
          {dict.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href={`/${locale}/portfolio`}
            className="inline-block px-8 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
          >
            {dict.hero.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
