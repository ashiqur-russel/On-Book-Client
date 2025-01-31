import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const token = useAppSelector(selectCurrentToken);
  const user = token ? verifyToken(token) : null;

  const userRole: "admin" | "user" =
    (user as TUser)?.role === "admin" ? "admin" : "user";

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        role={userRole}
      />

      <div
        className={`flex-1 transition-all ${
          isOpen ? "ml-1" : "ml-2"
        } p-6 overflow-y-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
