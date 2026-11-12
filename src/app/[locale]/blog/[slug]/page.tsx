import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getBlogSlugs, getBlogPost, renderMarkdown } from "@/lib/blog";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import PageTransition from "@/components/ui/PageTransition";

export function generateStaticParams() {
  const slugs = getBlogSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const post = getBlogPost(slug);

  if (!post) notFound();

  const html = await renderMarkdown(locale === "en" && post.contentEn ? post.contentEn : post.content);
  const title =
    locale === "en" && post.titleEn ? post.titleEn : post.title;

  return (
    <PageTransition>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <Link
          href={`/${locale}/blog`}
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors mb-8 inline-block"
        >
          &larr; {dict.blog.backToList}
        </Link>

        <header className="mb-10">
          <time className="text-sm text-text-muted">{post.date}</time>
          <h1 className="text-4xl font-bold text-text mt-2 mb-4">{title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded bg-emerald-900/30 text-emerald-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <MarkdownRenderer html={html} />
      </article>
    </PageTransition>
  );
}
