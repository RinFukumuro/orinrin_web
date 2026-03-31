export interface ProjectImage {
  src: string;
  alt: { ja: string; en: string };
}

export interface Project {
  id: string;
  title: { ja: string; en: string };
  description: { ja: string; en: string };
  thumbnail: string;
  images: ProjectImage[];
  tags: string[];
  url?: string;
  github?: string;
}
