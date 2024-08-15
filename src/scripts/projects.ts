import projects from "../projects.json";

interface Project {
  id: string;
  title: string;
  technologies: string[];
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

export function getAllProjects(): Project[] {
  return projects.sort((a, b) => b.date.localeCompare(a.date));
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

export function getProjectsByTag(tag: string): Project[] {
  return projects
    .filter((project) => project.technologies.includes(tag))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllTags(): [string, number][] {
  const tagCounts: { [key: string]: number } = {};

  projects.forEach((project) => {
    project.technologies.forEach((tag) => {
      if (tagCounts[tag]) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    });
  });

  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  return sortedTags;
}
