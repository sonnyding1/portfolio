import projects from "../projects.json";

interface Project {
  id: string;
  title: string;
  technologies: string;
  featured: boolean;
  body: string;
}

export function getProjectById(id: string): Project | undefined {
  const project = projects.find((project) => project.id === id);
  if (!project) {
    throw new Error(`No project found with id ${id}`);
  }
  return project;
}
