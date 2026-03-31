import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";
import ContactForm from "@/components/contact/ContactForm";

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
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-text mb-2">
            {dict.contact.title}
          </h1>
          <p className="text-text-muted mb-12">{dict.contact.subtitle}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-surface rounded-xl border border-emerald-900/30 p-6 mb-8">
            <ContactForm dict={dict.contact.form} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:orinring0g0@gmail.com"
              className="flex items-center gap-4 bg-surface rounded-xl border border-emerald-900/30 p-6 hover:border-emerald-700/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-text font-medium">{dict.contact.email}</p>
                <p className="text-text-muted text-sm">
                  orinring0g0@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://x.com/orin_rensyusuru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-surface rounded-xl border border-emerald-900/30 p-6 hover:border-emerald-700/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/50 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <p className="text-text font-medium">{dict.contact.twitter}</p>
                <p className="text-text-muted text-sm">@orin_rensyusuru</p>
              </div>
            </a>
          </div>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
