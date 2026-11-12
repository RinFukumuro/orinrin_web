"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ImageLightbox from "./ImageLightbox";
import type { Project } from "@/types/project";
import type { Locale } from "@/lib/i18n/config";

interface ProjectGridProps {
  projects: Project[];
  locale: Locale;
  dict: {
    viewProject: string;
    viewCode: string;
    close: string;
    prev: string;
    next: string;
    preview: string;
  };
}

export default function ProjectGrid({
  projects,
  locale,
  dict,
}: ProjectGridProps) {
  const [lightbox, setLightbox] = useState<{
    project: Project;
    index: number;
  } | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            dict={dict}
            onOpen={() =>
              project.images.length > 0
                ? setLightbox({ project, index: 0 })
                : undefined
            }
          />
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <ImageLightbox
            images={lightbox.project.images}
            initialIndex={lightbox.index}
            locale={locale}
            dict={dict}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
