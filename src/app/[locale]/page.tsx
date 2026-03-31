import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProjects } from "@/lib/projects";
import HeroSection from "@/components/hero/HeroSection";
import AutoScrollGallery from "@/components/portfolio/AutoScrollGallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import Link from "next/link";
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
  const projects = getProjects();

  return (
    <PageTransition>
      <HeroSection locale={locale as Locale} maps={mapsData} dict={dict} />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto mb-8 flex items-end justify-between">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-text">
              {dict.portfolio.title}
            </h2>
            <p className="text-text-muted text-sm mt-1">
              {dict.portfolio.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <Link
              href={`/${locale}/portfolio`}
              className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
            >
              {dict.portfolio.viewProject} →
            </Link>
          </ScrollReveal>
        </div>
        <AutoScrollGallery projects={projects} locale={locale as Locale} />
      </section>
    </PageTransition>
  );
}
