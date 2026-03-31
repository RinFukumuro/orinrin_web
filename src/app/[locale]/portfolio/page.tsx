import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
      </section>
    </PageTransition>
  );
}
