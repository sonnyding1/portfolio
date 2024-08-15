import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white bg-opacity-50 backdrop-blur">
      <div className="flex justify-between items-center border-b border-gray-300 py-8 mx-8">
        <div>
          <p className="font-bold text-inherit">Sonny's portfolio</p>
        </div>
        <div className="hidden md:block">
          <Link to="/" className="p-4">
            Home
          </Link>
          <Link to="/tags" className="p-4">
            Tags
          </Link>
        </div>
        <div className="md:hidden">
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            variant="ghost"
            size="icon"
            className="focus:bg-transparent active:bg-transparent"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center border-b border-gray-300 mx-8">
          <Link to="/" className="p-4" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/tags" className="p-4" onClick={() => setIsMenuOpen(false)}>
            Tags
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
