"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";

interface AutoScrollGalleryProps {
  projects: Project[];
  locale: Locale;
}

export default function AutoScrollGallery({
  projects,
  locale,
}: AutoScrollGalleryProps) {
  // Duplicate items for seamless loop
  const items = [...projects, ...projects, ...projects];

  return (
    <div className="overflow-hidden">
      <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
        {items.map((project, i) => (
          <Link
            key={`${project.id}-${i}`}
            href={`/${locale}/portfolio`}
            className="flex-shrink-0 w-72 sm:w-80 group"
          >
            <div className="bg-surface rounded-xl border border-emerald-900/30 overflow-hidden hover:border-emerald-700/50 transition-colors">
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.thumbnail}
                  alt={project.title[locale]}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="320px"
                />
              </div>
              <div className="px-4 py-3">
                <p className="text-text font-medium text-sm truncate">
                  {project.title[locale]}
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
