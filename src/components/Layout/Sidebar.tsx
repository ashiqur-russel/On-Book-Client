import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { adminPaths } from "../../routes/admin.route";
import { userPaths } from "../../routes/user.route";
import { useAppDispatch } from "@/redux/hooks";
import { logOut } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/user/registerApi";

type UserRole = "admin" | "user";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  role: UserRole;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar, role }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: myData, isLoading, isError } = useGetMeQuery("");

  const user = myData?.[0] || null;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/signin");
  };

  const menuItems = role === "admin" ? adminPaths : userPaths;

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`h-screen bg-white shadow-lg fixed top-0 left-0 z-50 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col overflow-y-auto`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2
            className={`text-xl font-bold text-gray-900 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 focus:outline-none lg:hidden"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Navigation Links Based on Role */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              to={`/dashboard/${role}/${item.path}`}
              label={item.name}
              icon={item.icon}
              isOpen={isOpen}
            />
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t flex items-center justify-between">
          {/* User Avatar */}
          <div className="flex items-center space-x-3">
            <FaUserCircle size={34} className="text-gray-600" />
            <div
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {isLoading ? (
                <p className="text-gray-500">Loading...</p>
              ) : isError ? (
                <p className="text-red-500">Error</p>
              ) : user ? (
                <>
                  <p className="text-gray-900 font-medium">{user.name}</p>
                  <p className="text-gray-500 text-sm capitalize">{role}</p>
                </>
              ) : (
                <p className="text-gray-500">Guest</p>
              )}
            </div>
          </div>

          {/* Icons for Logout & Home */}
          <div className="flex items-center space-x-3">
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 cursor-pointer bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              <FaSignOutAlt size={20} />
            </button>

            {/* Home Button */}
            <button className="p-2 cursor-pointer bg-gray-700 text-white rounded-full hover:bg-gray-800 transition">
              <NavLink to={"/"}>
                <FaHome size={20} />
              </NavLink>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
}

const SidebarItem: FC<SidebarItemProps> = ({ to, label, icon, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-200 transition ${
        isActive ? "bg-gray-300" : ""
      }`
    }
  >
    {icon}
    <span
      className={`ml-3 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 hidden"
      }`}
    >
      {label}
    </span>
  </NavLink>
);

export default Sidebar;
