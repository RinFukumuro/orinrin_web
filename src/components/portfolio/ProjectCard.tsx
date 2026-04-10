"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  onOpen: () => void;
  dict: {
    viewProject: string;
    viewCode: string;
  };
}

export default function ProjectCard({
  project,
  locale,
  onOpen,
  dict,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card gradient-border rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      onClick={onOpen}
    >
      <div className="aspect-video bg-surface-light flex items-center justify-center overflow-hidden relative">
        {project.thumbnail ? (
          <>
            <img
              src={project.thumbnail}
              alt={project.title[locale]}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </>
        ) : (
          <div className="text-primary/30 text-4xl">&#x2B21;</div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-text mb-2">
          {project.title[locale]}
        </h3>
        <p className="text-text-muted text-sm mb-4 line-clamp-2">
          {project.description[locale]}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-primary-light hover:text-primary font-medium transition-colors"
            >
              {dict.viewProject} &rarr;
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-text-muted hover:text-text transition-colors"
            >
              {dict.viewCode}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
