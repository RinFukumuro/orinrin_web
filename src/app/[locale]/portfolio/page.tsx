import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import Image from "next/image";
import Link from "next/link";
import mapsData from "@/data/maps.json";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.portfolio.title, description: dict.portfolio.subtitle };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const projects = getProjects();

  return (
    <PageTransition>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-text mb-2">
            {dict.portfolio.title}
          </h1>
          <p className="text-text-muted mb-12">{dict.portfolio.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ProjectGrid
            projects={projects}
            locale={locale as Locale}
            dict={dict.portfolio}
          />
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <h2 className="text-2xl font-bold text-text mt-16 mb-2">
            {dict.maps.title}
          </h2>
          <p className="text-text-muted mb-8">{dict.maps.subtitle}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mapsData.map((map, i) => (
            <ScrollReveal key={map.id} delay={0.5 + i * 0.1}>
              <Link
                href={`/${locale}/maps/${map.id}`}
                className="block bg-surface rounded-xl border border-emerald-900/30 overflow-hidden hover:border-emerald-700/50 transition-colors group"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={map.preview}
                    alt={map.title[locale as keyof typeof map.title] || map.title.ja}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-text font-medium">
                    {map.title[locale as keyof typeof map.title] || map.title.ja}
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    {map.description[locale as keyof typeof map.description] || map.description.ja}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
