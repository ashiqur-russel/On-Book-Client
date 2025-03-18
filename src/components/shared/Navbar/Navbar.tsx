import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineLock,
  AiOutlineLogout,
} from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logOut, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { selectCurrentStore } from "@/redux/features/product/productSlice";
import { toggleCart } from "@/redux/features/global/globalSlice";

import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import NotificationList from "@/components/Notifications/NotificatonList";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  const { cart } = useAppSelector(selectCurrentStore);

  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.length || 0;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
  };

  const openCartHandler = () => {
    dispatch(toggleCart());
  };

  return (
    <nav className="fixed bg-black z-40 w-full px-3 md:px-10 lg:px-24 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left side: Logo + Desktop Nav Links */}
        <div className="flex items-center space-x-8">
          <h1 className="text-3xl font-bold text-white">
            <NavLink to="/" className="hover:text-gray-300">
              On.Book
            </NavLink>
          </h1>

          <div className="hidden lg:flex items-center space-x-6">
            <NavLinks user={user} />
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <div
            onClick={openCartHandler}
            className="w-5 h-5 relative cursor-pointer text-white hover:text-gray-300 transition"
          >
            <ShoppingBag width={18} />
            {totalItems > 0 && (
              <span
                className="absolute inline-flex items-center justify-center 
                         rounded-full text-xs bg-red-600 text-white 
                         -top-2 -right-2 w-5 h-5"
              >
                {totalItems}
              </span>
            )}
          </div>

          {user && <NotificationList />}

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to="/signin"
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLock className="w-5 h-5" />
              <span>Login</span>
            </NavLink>
          )}
        </div>

        <button
          className="lg:hidden text-white focus:outline-none"
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
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={user}
        handleLogout={handleLogout}
        totalItems={totalItems}
        openCartHandler={openCartHandler}
        NotificationBell={user ? <NotificationList /> : null}
      />
    </nav>
  );
}
