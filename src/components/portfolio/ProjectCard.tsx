"use client";

import Image from "next/image";
import type { Project } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  onOpen: () => void;
  dict: Pick<Dictionary["portfolio"], "viewProject" | "viewCode" | "preview">;
}

export default function ProjectCard({ project, locale, onOpen, dict }: ProjectCardProps) {
  return (
    <article className="bg-surface rounded-xl border border-emerald-900/50 overflow-hidden">
      <button type="button" onClick={onOpen} disabled={project.images.length === 0}
        aria-label={`${project.title[locale]} — ${dict.preview}`}
        className="relative block w-full aspect-video bg-surface-light cursor-zoom-in disabled:cursor-default">
        <Image src={project.thumbnail} alt={project.title[locale]} fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
      </button>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-3">{project.title[locale]}</h2>
        <p className="text-text-muted text-sm leading-7 mb-5">{project.description[locale]}</p>
        <ul className="flex flex-wrap gap-2 mb-5" aria-label={locale === "ja" ? "使用技術" : "Technologies"}>
          {project.tags.map((tag) => <li key={tag} className="text-xs px-2 py-1 rounded bg-emerald-900/30 text-emerald-300">{tag}</li>)}
        </ul>
        <div className="flex flex-wrap gap-5 text-sm text-emerald-300">
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{dict.viewProject} ↗</a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{dict.viewCode} ↗</a>}
        </div>
      </div>
    </article>
  );
}
