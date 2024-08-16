import { Badge } from "@/components/ui/badge";
import { getProjectsByTag } from "@/scripts/projects";
import { Image } from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";

function Tag() {
  const { tag } = useParams<{ tag: string }>();
  const projectsWithTag = getProjectsByTag(tag || "");

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="my-32">
        <p className="font-bold text-5xl py-8" id="about">
          #{tag}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projectsWithTag.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <div className="py-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer border shadow-lg rounded-lg bg-slate-100 active:bg-slate-200 bg-opacity-50 backdrop-blur">
                <div className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 className="font-bold text-large mb-2">{project.title}</h4>
                  <small className="text-default-500">
                    <div className="flex gap-1">
                      {project.technologies.map((tech) => (
                        <Badge variant="outline" key={tech}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </small>
                </div>
                <div className="overflow-visible p-2">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={project.og}
                    width="100%"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tag;
