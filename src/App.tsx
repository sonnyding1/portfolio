import { useEffect, useState } from "react";
import "./App.css";
import {
  Navbar,
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
import { Link } from "react-scroll";
import ReactGA from "react-ga4";

ReactGA.initialize("G-12ERTDWKXD");

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const navbarElement = document.getElementById("navbar");
    if (navbarElement) {
      setNavbarHeight(navbarElement.offsetHeight);
    }
  }, []);

  const menuItems = ["About", "Featured", "All"];

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
      <Navbar onMenuOpenChange={setIsMenuOpen} id="navbar">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Sonny's portfolio</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item}>
              <Link
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                offset={-navbarHeight}
                className={`p-4 ${
                  activeSection === item ? "text-blue-500" : "text-black"
                }`}
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarItem key={item}>
              <Link
                to={item.toLowerCase()}
                smooth={true}
                duration={500}
                offset={-navbarHeight}
                className={`p-4 ${
                  activeSection === item ? "text-blue-500" : "text-black"
                }`}
              >
                {item}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <div className="max-w-5xl mx-auto p-8">
        <div className="my-32">
          <p className="font-bold text-5xl py-8 a" id="about">
            About
          </p>
          <p className="text-xl pt-16">
            Hi there! My name is <span className="font-bold">Sonny Ding</span>,
            I am enthusiastic about anything software related! I am currently a
            3rd year student at the University of California, Los Angeles.
            Welcome to my portfolio!
          </p>
        </div>
        <div className="my-32">
          <p className="font-bold text-5xl py-8" id="featured">
            Featured
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="my-32">
          <p className="font-bold text-5xl py-8" id="all">
            All
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">Math Mastery Web App</h4>
                <small className="text-default-500">
                  Next.js, React.js, MongoDB
                </small>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="/math-webapp.png"
                  width="100%"
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
