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
          <div className="pt-4 flex flex-col gap-1 font-semibold">
            <p>Programming languages 👨‍💻</p>
            <div className="flex">
              <a href="https://www.python.org/" target="__blank">
                <img
                  alt="Python"
                  src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"
                />
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="__blank"
              >
                <img
                  alt="JavaScript"
                  src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"
                />
              </a>
              <a href="https://www.typescriptlang.org/" target="__blank">
                <img
                  alt="TypeScript"
                  src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
                />
              </a>
              <a href="https://cplusplus.com/" target="__blank">
                <img
                  alt="C++"
                  src="https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white"
                />
              </a>
            </div>
            <p>Web 🌐</p>
            <div className="flex flex-wrap">
              <a href="https://en.wikipedia.org/wiki/HTML" target="__blank">
                <img
                  alt="HTML5"
                  src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"
                />
              </a>
              <a href="https://en.wikipedia.org/wiki/CSS" target="__blank">
                <img
                  alt="CSS3"
                  src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"
                />
              </a>
              <a href="https://tailwindcss.com/" target="__blank">
                <img
                  alt="Tailwind"
                  src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
                />
              </a>
              <a href="https://ui.shadcn.com/" target="__blank">
                <img
                  alt="ShadCN"
                  src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white"
                />
              </a>
              <a href="https://mui.com/material-ui/" target="__blank">
                <img
                  alt="MUI"
                  src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"
                />
              </a>
              <a href="https://nodejs.org/en" target="__blank">
                <img
                  alt="NodeJS"
                  src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"
                />
              </a>
              <a href="https://react.dev/" target="__blank">
                <img
                  alt="React"
                  src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"
                />
              </a>
              <a href="https://vuejs.org/" target="__blank">
                <img
                  alt="Vue"
                  src="https://img.shields.io/badge/Vue%20js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"
                />
              </a>
              <a href="https://nuxt.com/" target="__blank">
                <img
                  alt="Nuxt"
                  src="https://img.shields.io/badge/nuxt%20js-00C58E?style=for-the-badge&logo=nuxtdotjs&logoColor=white"
                />
              </a>
              <a href="https://expressjs.com/" target="__blank">
                <img
                  alt="ExpressJS"
                  src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"
                />
              </a>
              <a href="https://nextjs.org/" target="__blank">
                <img
                  alt="NextJS"
                  src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"
                />
              </a>
              <a href="https://www.mongodb.com/" target="__blank">
                <img
                  alt="MongoDB"
                  src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"
                />
              </a>
              <a href="https://www.prisma.io/" target="__blank">
                <img
                  alt="Prisma"
                  src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"
                />
              </a>
              <a href="https://threejs.org/" target="__blank">
                <img
                  alt="ThreeJS"
                  src="https://img.shields.io/badge/ThreeJs-black?style=for-the-badge&logo=three.js&logoColor=white"
                />
              </a>
              <a href="https://www.djangoproject.com/" target="__blank">
                <img
                  alt="Django"
                  src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green"
                />
              </a>
              <a href="https://flask.palletsprojects.com/" target="__blank">
                <img
                  alt="Flask"
                  src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"
                />
              </a>
            </div>
            <p>Machine Learning 🤖</p>
            <div className="flex">
              <a href="https://scikit-learn.org/stable/" target="__blank">
                <img
                  alt="ScikitLearn"
                  src="https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"
                />
              </a>
              <a href="https://pandas.pydata.org/" target="__blank">
                <img
                  alt="Pandas"
                  src="https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white"
                />
              </a>
              <a href="https://numpy.org/" target="__blank">
                <img
                  alt="Numpy"
                  src="https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white"
                />
              </a>
            </div>
            <p>Tools 🛠️</p>
            <div className="flex">
              <a href="https://git-scm.com/" target="__blank">
                <img
                  alt="Git"
                  src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"
                />
              </a>
              <a href="https://www.gnu.org/software/bash/" target="__blank">
                <img
                  alt="GNUBash"
                  src="https://img.shields.io/badge/GNU%20Bash-4EAA25?style=for-the-badge&logo=GNU%20Bash&logoColor=white"
                />
              </a>
              <a href="https://aws.amazon.com/" target="__blank">
                <img
                  alt="GNUBash"
                  src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"
                />
              </a>
              <a href="https://www.latex-project.org/" target="__blank">
                <img
                  alt="Latex"
                  src="https://img.shields.io/badge/LaTeX-47A141?style=for-the-badge&logo=LaTeX&logoColor=white"
                />
              </a>
              <a href="https://www.virtualbox.org/" target="__blank">
                <img
                  alt="VirtualBox"
                  src="https://img.shields.io/badge/VirtualBox-21416b?style=for-the-badge&logo=VirtualBox&logoColor=white"
                />
              </a>
              <a href="https://godotengine.org/" target="__blank">
                <img
                  alt="Godot"
                  src="https://img.shields.io/badge/Godot-478CBF?style=for-the-badge&logo=GodotEngine&logoColor=white"
                />
              </a>
              <a href="https://unity.com/" target="__blank">
                <img
                  alt="Unity"
                  src="https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white"
                />
              </a>
              <a href="https://www.arduino.cc/" target="__blank">
                <img
                  alt="Arduino"
                  src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white"
                />
              </a>
            </div>
          </div>
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
