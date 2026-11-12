"use client";

import Link from "next/link";
import Image from "next/image";
import GeometricCanvas from "./GeometricCanvas";
import FloatingMaps from "./FloatingMaps";
import { MeshGradientBg, GridPattern } from "@/components/ui/Decorations";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface HeroProps {
  locale: Locale;
  maps: { id: string; image: string; preview: string; title: Record<string, string> }[];
  dict: Dictionary;
}

export default function HeroSection({ locale, maps, dict }: HeroProps) {
  return (
    <section className="relative min-h-[min(760px,calc(100svh-4rem))] flex items-center justify-center overflow-hidden bg-bg py-24">
      <MeshGradientBg />
      <GridPattern className="opacity-60" />
      <Image src="/images/hero-forest.webp" alt="" fill priority className="object-cover opacity-30" sizes="100vw" />
      <div className="absolute inset-0 pointer-events-none motion-reduce:hidden" aria-hidden="true"><GeometricCanvas /></div>
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <FloatingMaps locale={locale} maps={maps} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-bg/40 to-bg pointer-events-none" />
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <p className="text-primary-light text-sm tracking-widest mb-6">{dict.hero.greeting}</p>
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary-light via-accent to-secondary bg-clip-text text-transparent glow-text">{dict.hero.name}</h1>
        <p className="text-gray-200 text-sm sm:text-lg mt-6 mb-10 tracking-widest">{dict.hero.description}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}/portfolio`} className="px-7 py-3 rounded-lg bg-primary-dark hover:bg-primary text-white font-medium transition-colors">{dict.hero.cta}</Link>
          <a href="https://github.com/RinFukumuro/orinrin_web" target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-lg bg-bg/70 border border-primary/40 text-primary-light hover:bg-surface transition-colors">
            {dict.hero.code}<span className="sr-only">{dict.contact.newTab}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
