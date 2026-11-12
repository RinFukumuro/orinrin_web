import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <div lang={locale} className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">{dict.nav.skip}</a>
      <Header locale={locale as Locale} dict={dict} />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16">{children}</main>
      <Footer dict={dict} />
    </div>
  );
}
