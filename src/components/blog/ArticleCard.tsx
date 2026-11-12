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
    <article className="glass-card gradient-border rounded-2xl p-6 transition-all duration-300">
      <time className="text-xs text-text-muted font-medium">{post.date}</time>
      <h2 className="text-xl font-semibold text-text mt-2 mb-3">{title}</h2>
      <p className="text-text-muted text-sm mb-4 line-clamp-3">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary-light"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="text-sm text-primary-light hover:text-primary font-medium transition-colors"
      >
        {readMore} &rarr;
      </Link>
    </article>
  );
}
