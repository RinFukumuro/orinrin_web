import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

interface MapItem {
  id: string;
  image: string;
  preview: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

export default function MapGallery({ maps, locale }: { maps: MapItem[]; locale: Locale }) {
  return (
    <ul className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {maps.map((map) => (
        <li key={map.id}>
          <Link href={`/${locale}/maps/${map.id}`}
            className="block h-full group glass-card gradient-border rounded-2xl overflow-hidden transition-all duration-300">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={map.preview} alt={map.title[locale]} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className="p-5">
              <h3 className="text-text font-medium">{map.title[locale]}</h3>
              <p className="text-text-muted text-sm leading-6 mt-2">{map.description[locale]}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
