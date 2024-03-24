import "./App.css";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";

function App() {
  return (
    <>
      <Navbar position="static">
        <NavbarBrand>
          <p className="font-bold text-inherit">Sonny's portfolio</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#about">
              About
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#featured">Featured</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#all">
              All
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div id="about">About</div>
      <div id="featured">Featured</div>
      <div id="all">All</div>
    </>
  );
}

export default App;
