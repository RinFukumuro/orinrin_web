import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import PageTransition from "@/components/ui/PageTransition";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import mapsData from "@/data/maps.json";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    mapsData.map((map) => ({ locale, id: map.id }))
  );
}

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale as Locale);
  const map = mapsData.find((m) => m.id === id);

  if (!map) notFound();

  const title = map.title[locale as keyof typeof map.title] || map.title.ja;
  const description =
    map.description[locale as keyof typeof map.description] ||
    map.description.ja;

  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-emerald-400 transition-colors text-sm mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {dict.maps.backToHome}
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-3xl sm:text-4xl font-bold text-text mb-4">
            {title}
          </h1>
          <p className="text-text-muted mb-8">{description}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative w-full rounded-xl overflow-hidden border border-emerald-900/30">
            <Image
              src={map.image}
              alt={title}
              width={1200}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
