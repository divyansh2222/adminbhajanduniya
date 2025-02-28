import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Bhajan Duniya</h1>

        {/* Hamburger Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navbar Links - Desktop */}
        <div className="hidden md:flex space-x-7">
          <Link to="/form" className="hover:underline">Create New Song</Link>
          <Link to="/entries" className="hover:underline">List of Songs</Link>
        </div>
      </div>

      {/* Mobile Menu - Shows when isOpen is true */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 text-center">
          <Link to="/form" className="block hover:underline">Create New Song</Link>
          <Link to="/entries" className="block hover:underline">List of Songs</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
