import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import HeroSection from "@/components/hero/HeroSection";
import AutoScrollGallery from "@/components/portfolio/AutoScrollGallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import mapsData from "@/data/maps.json";
import newsData from "@/data/news.json";

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

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-text">
              {dict.news.title}
            </h2>
            <p className="text-text-muted text-sm mt-1 mb-8">
              {dict.news.subtitle}
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-1">
            {newsData.map((item, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.05}>
                <div className="flex items-start gap-4 py-3 border-b border-emerald-900/20">
                  <time className="text-emerald-400 text-sm font-mono whitespace-nowrap pt-0.5">
                    {item.date}
                  </time>
                  <p className="text-text text-sm">
                    {item.title[locale as keyof typeof item.title] || item.title.ja}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
