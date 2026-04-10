import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import ContactForm from "@/components/contact/ContactForm";
import { SectionLabel, GlowOrb } from "@/components/ui/Decorations";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <PageTransition>
      <section className="relative max-w-2xl mx-auto px-4 sm:px-6 py-24 overflow-hidden">
        <GlowOrb className="-top-20 -left-20" color="purple" size={200} />

        <ScrollReveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-4xl font-bold text-text mb-2">
            {dict.contact.title}
          </h1>
          <p className="text-text-muted mb-14">{dict.contact.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card rounded-2xl p-6 sm:p-8 mb-8">
            <ContactForm dict={dict.contact.form} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <a
            href="https://x.com/orin_rensyusuru"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 glass-card gradient-border rounded-2xl p-6 transition-all duration-300 group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-light group-hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-300"
              style={{ background: "linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(168, 85, 247, 0.1))" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <div>
              <p className="text-text font-medium">{dict.contact.twitter}</p>
              <p className="text-text-muted text-sm">@orin_rensyusuru</p>
            </div>
          </a>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
