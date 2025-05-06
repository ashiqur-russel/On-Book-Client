import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { TUser } from "@/redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
  user: TUser | null;
}

function NavLinks({ user }: NavLinksProps) {
  return (
    <div className="flex items-center gap-6">
      <NavLink
        to="/products"
        className="text-white font-medium hover:text-gray-300 transition"
      >
        Books
      </NavLink>
      <NavLink
        to="/"
        className="text-white font-medium hover:text-gray-300 transition"
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className="text-white font-medium hover:text-gray-300 transition"
      >
        About Us
      </NavLink>
   


      {/* Categories Dropdown */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white cursor-pointer hover:text-gray-300 transition bg-transparent  text-md">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white shadow-md rounded p-4 min-w-[200px] ">
              <ul className="flex flex-col gap-2">
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/categories/science-fiction"
                    className="text-black hover:text-gray-700 transition"
                  >
                    Science Fiction
                  </NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/categories/novel"
                    className="text-black hover:text-gray-700 transition"
                  >
                    Novel
                  </NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/categories/history"
                    className="text-black hover:text-gray-700 transition"
                  >
                    History
                  </NavLink>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <NavLink
                    to="/categories"
                    className="text-black hover:text-gray-700 transition font-semibold"
                  >
                    All Categories
                  </NavLink>
                </NavigationMenuLink>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>

      {user && (
        <NavLink
          to={`/dashboard/${user.role}`}
          className="text-white font-medium hover:text-gray-300 transition"
        >
          Dashboard
        </NavLink>
      )}
    </div>
  );
}

export default NavLinks;
