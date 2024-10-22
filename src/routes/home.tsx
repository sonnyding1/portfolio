import { Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import {
  getFeaturedProjects,
  getNonFeaturedProjects,
} from "../scripts/projects";
import { Canvas } from "@react-three/fiber";
import Fox from "../Fox";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

function Home() {
  const featuredProjects = getFeaturedProjects();
  const nonFeaturedProjects = getNonFeaturedProjects();

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen -z-10">
        <Canvas camera={{ position: [0, 0, 20], fov: 1 }}>
          <Fox />
          {/* <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" />
          </mesh> */}
        </Canvas>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <div className="my-32">
          <p className="font-bold text-5xl" id="about">
            Hi, I'm <span className="text-amber-300">Sonny</span>.
          </p>
          <p className="flex items-center text-lg pt-2 text-slate-600 font-light">
            📍 Los Angeles, California, United States
          </p>
          <div className="flex space-x-2 pt-2">
            <a
              href="https://github.com/sonnyding1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sonny-ding/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-500 transition duration-300"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href="mailto:sonnnyding20@gmail.com"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500 transition duration-300"
            >
              <FaEnvelope size={16} />
            </a>
          </div>
          <div className="mt-8 ml-2 relative">
            <div className="absolute left-0 top-2 bottom-8 transform -translate-x-1/2 border-l-2 border-gray-300"></div>
            <div className="mb-8 flex items-center w-full">
              <div className="relative pl-8">
                <div className="absolute left-0 transform -translate-x-1/2 bg-gray-300 rounded-full h-4 w-4"></div>
                <div>
                  <p className="italic leading-none text-slate-600">
                    June 2024 - Present
                  </p>
                  <p className="font-light">
                    Fullstack Developer Intern at UCLA Trustworthy AI Lab
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-8 flex items-center w-full">
              <div className="relative pl-8">
                <div className="absolute left-0 transform -translate-x-1/2 bg-gray-300 rounded-full h-4 w-4"></div>
                <div>
                  <p className="italic leading-none text-slate-600">
                    February 2024 - June 2024
                  </p>
                  <p className="font-light">
                    Software Engineer Intern at New EIC
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl pt-16"></p>
        </div>
        <div className="my-32">
          <p className="font-bold text-5xl py-8" id="featured">
            Featured
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="py-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer border shadow-lg rounded-lg bg-slate-100 active:bg-slate-200 bg-opacity-50 backdrop-blur">
                  <div className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large mb-2">
                      {project.title}
                    </h4>
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
        <div className="my-32">
          <p className="font-bold text-5xl py-8" id="all">
            All
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {nonFeaturedProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="py-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer border shadow-lg rounded-lg bg-slate-100 active:bg-slate-200 bg-opacity-50 backdrop-blur">
                  <div className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large mb-2">
                      {project.title}
                    </h4>
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
    </>
  );
}

export default Home;
