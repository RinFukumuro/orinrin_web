import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllBlogPosts } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PageTransition from "@/components/ui/PageTransition";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return { title: dict.blog.title, description: dict.blog.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const posts = getAllBlogPosts();

  return (
    <PageTransition>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-text mb-2">
            {dict.blog.title}
          </h1>
          <p className="text-text-muted mb-12">{dict.blog.subtitle}</p>
        </ScrollReveal>

        <div className="flex flex-col gap-6">
          {posts.length === 0 && (
            <p className="text-text-muted">{dict.blog.empty}</p>
          )}
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={0.1 * i}>
              <ArticleCard
                post={post}
                locale={locale as Locale}
                readMore={dict.blog.readMore}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
