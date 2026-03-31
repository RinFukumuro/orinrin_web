"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

function Typewriter({ text, delay, className }: { text: string; delay: number; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 120);

    return () => clearTimeout(timer);
  }, [started, displayed, text]);

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[3px] h-[0.85em] bg-emerald-400 ml-1 align-middle"
        />
      )}
    </span>
  );
}

export default function HeroSection({ locale, maps, dict }: HeroProps) {
  // Cinematic timing
  const photoFadeIn = 0;       // Photo starts fading in immediately
  const windStart = 1.5;        // Wind begins
  const nameStart = 2.5;        // Name typewriter starts
  const nameEnd = nameStart + dict.hero.name.length * 0.12 + 0.5;
  const descDelay = nameEnd + 0.3;
  const ctaDelay = descDelay + 0.8;
  const mapsDelay = nameEnd;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Phase 1: Background photo fades in from black */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: photoFadeIn, ease: "easeOut" }}
      >
        <Image
          src="/images/IMG_7488.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </motion.div>

      {/* Phase 2: Wind animation fades in */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: windStart }}
      >
        <GeometricCanvas />
      </motion.div>

      {/* Phase 4: Floating maps appear after name */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: mapsDelay }}
      >
        <FloatingMaps locale={locale} maps={maps} />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {dict.hero.greeting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: nameStart - 0.5 }}
            className="text-emerald-400 text-lg mb-4"
          >
            {dict.hero.greeting}
          </motion.p>
        )}

        {/* Phase 3: Name types in one character at a time */}
        <h1 className="text-6xl sm:text-8xl font-bold mb-2 min-h-[1.2em]">
          <Typewriter
            text={dict.hero.name}
            delay={nameStart}
            className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent"
          />
          {dict.hero.subtitle && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: nameEnd }}
              className="text-text"
            >
              {dict.hero.subtitle}
            </motion.span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1, delay: descDelay }}
          className="text-text-muted text-lg sm:text-xl mt-6 mb-10 tracking-widest uppercase"
        >
          {dict.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: ctaDelay }}
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
