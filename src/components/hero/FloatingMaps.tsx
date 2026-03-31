"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";

interface MapData {
  id: string;
  image: string;
  title: Record<string, string>;
}

interface FloatingMapsProps {
  locale: Locale;
  maps: MapData[];
}

const positions = [
  { top: "8%", left: "5%", rotate: -12, scale: 0.9 },
  { top: "15%", right: "3%", rotate: 8, scale: 0.85 },
  { bottom: "12%", left: "10%", rotate: 5, scale: 0.8 },
];

export default function FloatingMaps({ locale, maps }: FloatingMapsProps) {
  return (
    <>
      {maps.map((map, i) => {
        const pos = positions[i];
        const style: Record<string, string> = {};
        if (pos.top) style.top = pos.top;
        if (pos.left) style.left = pos.left;
        if (pos.right) style.right = pos.right;
        if (pos.bottom) style.bottom = pos.bottom;

        return (
          <motion.div
            key={map.id}
            className="absolute w-48 sm:w-64 md:w-72 pointer-events-auto"
            style={style}
            initial={{ opacity: 0, scale: 0.7, rotate: pos.rotate }}
            animate={{ opacity: 0.15, scale: pos.scale, rotate: pos.rotate }}
            whileHover={{ opacity: 0.6, scale: pos.scale + 0.05 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.3, ease: "easeOut" }}
          >
            <Link
              href={`/${locale}/maps/${map.id}`}
              className="block rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/20 border border-emerald-900/20 hover:border-emerald-500/40 transition-colors"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={map.image}
                  alt={map.title[locale] || map.title.ja}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 256px, 288px"
                />
              </div>
              <div className="bg-surface/80 backdrop-blur-sm px-3 py-2">
                <p className="text-text text-xs sm:text-sm font-medium truncate">
                  {map.title[locale] || map.title.ja}
                </p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </>
  );
}
