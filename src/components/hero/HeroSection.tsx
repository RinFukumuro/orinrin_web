"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MeshGradientBg, GridPattern } from "@/components/ui/Decorations";
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

function TypewriterBounce({
  text,
  delay,
  className,
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (count >= text.length) return;

    const timer = setTimeout(() => {
      setCount((c) => c + 1);
    }, 120);

    return () => clearTimeout(timer);
  }, [started, count, text]);

  const chars = text.slice(0, count).split("");

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -25, scale: 1.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 15,
            mass: 0.8,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
      {started && count < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-middle shadow-[0_0_8px_rgba(14,165,233,0.6)]"
        />
      )}
    </span>
  );
}

export default function HeroSection({ locale, dict }: HeroProps) {
  const nameStart = 0.8;
  const nameEnd = nameStart + dict.hero.name.length * 0.12 + 0.5;
  const descDelay = nameEnd + 0.3;
  const ctaDelay = descDelay + 0.6;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-bg" />

      {/* Mesh gradient orbs */}
      <MeshGradientBg />

      {/* Grid pattern */}
      <GridPattern className="opacity-60" />

      {/* Background photo - very subtle */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Image
          src="/images/IMG_7488.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-[0.04]"
          sizes="100vw"
        />
      </motion.div>

      {/* Top gradient fade from header */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg via-bg/50 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {dict.hero.greeting && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: nameStart - 0.3 }}
            className="text-primary-light text-lg mb-4 font-medium tracking-wide"
          >
            {dict.hero.greeting}
          </motion.p>
        )}

        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold mb-2 min-h-[1.2em]">
          <TypewriterBounce
            text={dict.hero.name}
            delay={nameStart}
            className="bg-gradient-to-r from-primary-light via-secondary-light to-accent bg-clip-text text-transparent glow-text"
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
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1, delay: descDelay }}
          className="text-text-muted text-lg sm:text-xl mt-8 mb-12 tracking-[0.25em] uppercase font-light"
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
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-medium overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #a855f7)",
              boxShadow: "0 0 25px rgba(14, 165, 233, 0.3), 0 0 50px rgba(168, 85, 247, 0.15)",
            }}
          >
            <span className="relative z-10">{dict.hero.cta}</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />
    </section>
  );
}
