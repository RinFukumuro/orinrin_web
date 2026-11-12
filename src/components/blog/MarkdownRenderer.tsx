interface MarkdownRendererProps {
  html: string;
}

export default function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return (
    <div
      className="prose prose-invert max-w-none
        [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-text [&_h1]:mb-6 [&_h1]:mt-8
        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-text [&_h2]:mb-4 [&_h2]:mt-6 [&_h2]:pb-2
        [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text [&_h3]:mb-3 [&_h3]:mt-5
        [&_p]:text-text-muted [&_p]:leading-7 [&_p]:mb-4
        [&_a]:text-primary-light [&_a]:hover:text-primary [&_a]:transition-colors [&_a]:underline
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:text-text-muted
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:text-text-muted
        [&_li]:mb-1
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:text-text-muted [&_blockquote]:italic [&_blockquote]:my-4
        [&_code]:bg-surface-light [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-primary-light [&_code]:text-sm
        [&_pre]:bg-surface [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4
        [&_pre_code]:bg-transparent [&_pre_code]:p-0
        [&_img]:rounded-lg [&_img]:my-4
        [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
