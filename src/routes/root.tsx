import { useEffect, useState } from "react";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Card,
  CardHeader,
  CardBody,
  Image,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import {
  getFeaturedProjects,
  getNonFeaturedProjects,
} from "../scripts/projects";
import { Canvas } from "@react-three/fiber";
import Fox from "../Fox";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const featuredProjects = getFeaturedProjects();
  const nonFeaturedProjects = getNonFeaturedProjects();

  useEffect(() => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

  const menuItems = ["Home", "Tags"];

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "";
      const offsets = menuItems.map((item) => {
        const element = document.getElementById(item.toLowerCase());
        return element ? element.offsetTop : 0;
      });

      offsets.forEach((offset, index) => {
        if (window.scrollY >= offset - 200) {
          currentSection = menuItems[index];
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          <p className="font-bold text-5xl py-8" id="about">
            About
          </p>
          <p className="text-xl pt-16">
            Hi there, my name is <span className="font-bold">Sonny Ding</span>,
            I am enthusiastic about software development. I am currently a 3rd
            year student at UCLA, welcome to my portfolio!
          </p>
        </div>
        <div className="my-32">
          <p className="font-bold text-5xl py-8" id="featured">
            Featured
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featuredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <div className="py-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer border shadow-lg rounded-lg bg-slate-100 bg-opacity-50 backdrop-blur">
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
                <div className="py-4 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer border shadow-lg rounded-lg bg-slate-100 bg-opacity-50 backdrop-blur">
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

export default Root;
