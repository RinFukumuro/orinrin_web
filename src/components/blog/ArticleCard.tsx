import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import type { Locale } from "@/lib/i18n/config";

interface ArticleCardProps {
  post: BlogPost;
  locale: Locale;
  readMore: string;
}

export default function ArticleCard({
  post,
  locale,
  readMore,
}: ArticleCardProps) {
  const title = locale === "en" && post.titleEn ? post.titleEn : post.title;
  const description =
    locale === "en" && post.descriptionEn
      ? post.descriptionEn
      : post.description;

  return (
    <article className="bg-surface rounded-xl border border-emerald-900/30 p-6 hover:border-emerald-700/50 transition-colors">
      <time className="text-xs text-text-muted">{post.date}</time>
      <h2 className="text-xl font-semibold text-text mt-2 mb-3">{title}</h2>
      <p className="text-text-muted text-sm mb-4 line-clamp-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-emerald-900/30 text-emerald-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        {readMore} &rarr;
      </Link>
    </article>
  );
}
