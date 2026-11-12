import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import { SectionLabel, GradientDivider, GlowOrb } from "@/components/ui/Decorations";
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
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 overflow-hidden">
        <GlowOrb className="-top-20 -right-20" color="purple" size={250} />

        <ScrollReveal>
          <SectionLabel>Portfolio</SectionLabel>
          <h1 className="text-4xl font-bold text-text mb-2">
            {dict.portfolio.title}
          </h1>
          <p className="text-text-muted mb-14">{dict.portfolio.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ProjectGrid
            projects={projects}
            locale={locale as Locale}
            dict={dict.portfolio}
          />
        </ScrollReveal>

        <GradientDivider className="my-16" />

        <ScrollReveal delay={0.4}>
          <SectionLabel>Maps</SectionLabel>
          <h2 className="text-2xl font-bold text-text mb-2">
            {dict.maps.title}
          </h2>
          <p className="text-text-muted mb-10">{dict.maps.subtitle}</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mapsData.map((map, i) => (
            <ScrollReveal key={map.id} delay={0.5 + i * 0.1}>
              <Link
                href={`/${locale}/maps/${map.id}`}
                className="block glass-card gradient-border rounded-2xl overflow-hidden transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={map.preview}
                    alt={map.title[locale as keyof typeof map.title] || map.title.ja}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
