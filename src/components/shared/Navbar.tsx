import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLock,
} from "react-icons/ai";
import { NavLink } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <NavLink to={"/"}>On.Book</NavLink>
          </h1>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Books
            </a>
            <a
              href="#"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Categories
            </a>
            <a
              href="#"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Wishlist
            </a>
            <a
              href="#"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Blog
            </a>
            <NavLink
              to={"/payment"}
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Dashboard
            </NavLink>
            <a
              href="#"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              About Us
            </a>
          </div>
        </div>

        {/* Right Section: Search and Login */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-gray-600 w-5 h-5 absolute left-2" />
            <input
              type="text"
              placeholder="Search book..."
              className="border-b border-gray-300 pl-8 pr-4 py-1 text-sm text-gray-800 focus:outline-none focus:border-gray-500"
            />
          </div>

          {/* Lock Icon and Login */}
          <button className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-medium">
            <AiOutlineLock className="w-5 h-5" />
            <NavLink to={"/signin"}>Login</NavLink>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <AiOutlineClose className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMenuOpen(false)}
          >
            <AiOutlineClose className="w-6 h-6" />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Books
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Categories
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Wishlist
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-800 hover:text-gray-600">
              Blog
            </a>
          </li>
          <li>
            <a href="/" className="text-gray-800 hover:text-gray-600">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
