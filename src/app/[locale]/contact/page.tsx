import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import PageTransition from "@/components/ui/PageTransition";
import { SectionLabel, GlowOrb } from "@/components/ui/Decorations";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.contact.title, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const links = [
    { title: "GitHub", description: dict.contact.github, url: "https://github.com/RinFukumuro", handle: "RinFukumuro" },
  ];

  return (
    <PageTransition>
      <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <GlowOrb className="-top-20 -left-20" color="purple" size={200} />
        <div className="relative z-10">
        <SectionLabel>Links</SectionLabel>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{dict.contact.title}</h1>
        <p className="text-text-muted leading-7 mb-10">{dict.contact.subtitle}</p>
        <div className="grid gap-4">
          {links.map((link) => (
            <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer"
              className="block glass-card gradient-border rounded-2xl p-6 transition-all duration-300">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{link.title}</h2>
                <span aria-hidden="true" className="text-primary-light">↗</span>
              </div>
              <p className="text-primary-light text-sm mt-2">{link.handle}</p>
              <p className="text-text-muted text-sm mt-3">{link.description}</p>
              <span className="sr-only">{dict.contact.newTab}</span>
            </a>
          ))}
        </div>
        </div>
      </section>
    </PageTransition>
  );
}
