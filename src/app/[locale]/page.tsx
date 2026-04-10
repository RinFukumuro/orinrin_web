import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import HeroSection from "@/components/hero/HeroSection";
import AutoScrollGallery from "@/components/portfolio/AutoScrollGallery";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import { GlowOrb, GradientDivider, SectionLabel } from "@/components/ui/Decorations";
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
      <HeroSection locale={locale as Locale} dict={dict} />

      {/* About / Mission / Vision */}
      <section className="relative py-24 px-4 sm:px-6 animated-gradient-bg overflow-hidden">
        <GlowOrb className="top-0 right-[10%]" color="purple" size={300} />
        <GlowOrb className="bottom-0 left-[5%]" color="blue" size={250} />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <SectionLabel>{dict.about.title}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-6">
              {dict.about.subtitle}
            </h2>
            <p className="text-text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              {dict.about.description}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
            <ScrollReveal delay={0.15}>
              <div className="glass-card gradient-border rounded-2xl p-8 text-center transition-all duration-300">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(6, 182, 212, 0.1))" }}
                >
                  <svg className="w-7 h-7 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text mb-3">
                  {dict.about.mission}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {dict.about.missionText}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="glass-card gradient-border rounded-2xl p-8 text-center transition-all duration-300">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(139, 92, 246, 0.1))" }}
                >
                  <svg className="w-7 h-7 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-text mb-3">
                  {dict.about.vision}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {dict.about.visionText}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Maps Gallery */}
      <GradientDivider />
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto mb-10">
          <ScrollReveal>
            <SectionLabel>Maps</SectionLabel>
            <h2 className="text-2xl font-bold text-text">
              {dict.maps.title}
            </h2>
            <p className="text-text-muted text-sm mt-2">
              {dict.maps.subtitle}
            </p>
          </ScrollReveal>
        </div>
        <AutoScrollGallery maps={mapsData} locale={locale as Locale} />
      </section>

      {/* News */}
      <GradientDivider />
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden">
        <GlowOrb className="-top-20 -right-20" color="cyan" size={200} />
        <div className="relative z-10 max-w-3xl mx-auto">
          <ScrollReveal>
            <SectionLabel>Updates</SectionLabel>
            <h2 className="text-2xl font-bold text-text">
              {dict.news.title}
            </h2>
            <p className="text-text-muted text-sm mt-2 mb-10">
              {dict.news.subtitle}
            </p>
          </ScrollReveal>

          <div className="flex flex-col">
            {newsData.map((item, i) => (
              <ScrollReveal key={i} delay={0.1 + i * 0.05}>
                <div className="flex items-start gap-5 py-5" style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}>
                  <time className="text-primary-light text-sm font-mono whitespace-nowrap pt-0.5 font-medium">
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
