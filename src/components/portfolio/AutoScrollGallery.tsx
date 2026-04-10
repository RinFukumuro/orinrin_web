"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface MapItem {
  id: string;
  image: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

interface AutoScrollGalleryProps {
  maps: MapItem[];
  locale: Locale;
}

export default function AutoScrollGallery({
  maps,
  locale,
}: AutoScrollGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const items = [...maps, ...maps, ...maps];

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide"
      onMouseEnter={() => {
        scrollRef.current?.classList.add("pause-scroll");
      }}
      onMouseLeave={() => {
        scrollRef.current?.classList.remove("pause-scroll");
      }}
    >
      <div className="flex gap-6 animate-scroll w-max">
        {items.map((map, i) => (
          <Link
            key={`${map.id}-${i}`}
            href={`/${locale}/maps/${map.id}`}
            className="flex-shrink-0 w-72 sm:w-80 group"
          >
            <div className="glass-card gradient-border rounded-xl overflow-hidden transition-all duration-300">
              <div className="relative aspect-[4/3]">
                <Image
                  src={map.image}
                  alt={map.title[locale] || map.title.ja}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="px-4 py-3">
                <p className="text-text font-medium text-sm truncate">
                  {map.title[locale] || map.title.ja}
                </p>
                <p className="text-text-muted text-xs mt-1 truncate">
                  {map.description[locale] || map.description.ja}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
