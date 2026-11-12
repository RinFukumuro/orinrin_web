import type { Project } from "@/types/project";
import projectsData from "@/data/projects.json";

export function getProjects(): Project[] {
  return projectsData satisfies Project[];
}
