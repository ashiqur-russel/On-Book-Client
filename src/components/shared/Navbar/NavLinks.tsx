import { TUser } from "@/redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
  user: TUser | null;
}

function NavLinks({ user }: NavLinksProps) {
  return (
    <>
      <NavLink
        to="/products"
        className="text-white font-medium hover:text-gray-300 transition"
      >
        Books
      </NavLink>

      {user && (
        <NavLink
          to={`/dashboard/${user.role}`}
          className="text-white font-medium hover:text-gray-300 transition"
        >
          Dashboard
        </NavLink>
      )}
    </>
  );
}

export default NavLinks;
