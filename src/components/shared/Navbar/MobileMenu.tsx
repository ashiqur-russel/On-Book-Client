import { AiOutlineClose, AiOutlineLogout, AiOutlineLock } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import NavLinks from "./NavLinks";
import { TUser } from "@/redux/features/auth/authSlice";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  user: TUser | null;
  handleLogout: () => void;
  totalItems: number;
  openCartHandler: () => void;
  NotificationBell?: React.ReactNode;
}

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  user,
  handleLogout,
  totalItems,
  openCartHandler,
  NotificationBell,
}: MobileMenuProps) {
  return (
    <div
      className={`fixed top-0 right-0 z-30 h-full w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        menuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <span className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <div
            onClick={openCartHandler}
            className="relative cursor-pointer text-white hover:text-gray-300 transition"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute inline-flex size-3 -top-3 bg-amber-100 text-amber-700 -right-2 rounded-full text-center items-center p-2 justify-center text-sm">
                {totalItems}
              </span>
            )}
          </div>
        </span>

        {user && NotificationBell}

        <button
          className="text-white focus:outline-none hover:text-gray-300"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>
      </div>

      <ul className="p-4 space-y-4">
        <li>
          <div
            onClick={() => setMenuOpen(false)}
            className="flex flex-col space-y-4"
          >
            <NavLinks user={user} />
          </div>
        </li>

        <li>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
            >
              <AiOutlineLogout className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <NavLink
              to="/signin"
              className="flex items-center space-x-1 text-white hover:text-gray-300 font-medium transition"
              onClick={() => setMenuOpen(false)}
            >
              <AiOutlineLock className="w-5 h-5" />
              <span>Login</span>
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );
}
