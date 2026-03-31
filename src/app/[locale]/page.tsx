import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import HeroSection from "@/components/hero/HeroSection";
import AutoScrollGallery from "@/components/portfolio/AutoScrollGallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import mapsData from "@/data/maps.json";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <HeroSection locale={locale as Locale} maps={mapsData} dict={dict} />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mb-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-text">
              {dict.maps.title}
            </h2>
            <p className="text-text-muted text-sm mt-1">
              {dict.maps.subtitle}
            </p>
          </ScrollReveal>
        </div>
        <AutoScrollGallery maps={mapsData} locale={locale as Locale} />
      </section>
    </PageTransition>
  );
}
