import projects from "../projects.json";

interface Project {
  id: string;
  title: string;
  technologies: string;
  featured: boolean;
  body: string;
  og: string;
  date: string;
}

export function getProjectById(id: string): Project | undefined {
  const project = projects.find((project) => project.id === id);
  if (!project) {
    throw new Error(`No project found with id ${id}`);
  }
  return project;
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNonFeaturedProjects(): Project[] {
  return projects
    .filter((project) => !project.featured)
    .sort((a, b) => b.date.localeCompare(a.date));
}
