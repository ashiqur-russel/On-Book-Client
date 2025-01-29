import { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLock,
  AiOutlineLogout,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
  };

  return (
    <nav className="p-4 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo & Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <NavLink to={"/"}>On.Book</NavLink>
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/books"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Books
            </NavLink>
            <NavLink
              to="/categories"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Categories
            </NavLink>
            <NavLink
              to="/wishlist"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/blog"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              Blog
            </NavLink>
            {user && (
              <NavLink
                to={`/dashboard/${user.role}`}
                className="text-gray-800 font-medium hover:text-gray-600 transition"
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              to="/about"
              className="text-gray-800 font-medium hover:text-gray-600 transition"
            >
              About Us
            </NavLink>
          </div>
        </div>

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

          {/* Login / Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-medium"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to={"/signin"}
              className="flex items-center space-x-1 text-gray-800 hover:text-gray-600 font-medium"
            >
              <AiOutlineLock className="w-5 h-5" />
              <span>Login</span>
            </NavLink>
          )}
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
            <NavLink
              to="/books"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              Books
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                to={`/dashboard/${user.role}`}
                className="text-gray-800 hover:text-gray-600"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/about"
              className="text-gray-800 hover:text-gray-600"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>
          </li>

          {user && (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-gray-800 hover:text-gray-600 flex items-center space-x-2"
              >
                <AiOutlineLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
