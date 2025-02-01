import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCurrentToken,
  setUser,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useGetMeQuery } from "@/redux/features/user/registerApi";

export type TUser = {
  userId: string;
  role: string;
  iat: number;
  exp: number;
};

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const { data: myData, refetch } = useGetMeQuery("");

  useEffect(() => {
    if (token) {
      refetch();
      const user = token ? verifyToken(token) : null;
      dispatch(setUser({ user, token }));
    }
  }, [token, dispatch, refetch]);

  const userRole: "admin" | "user" =
    myData?.[0]?.role === "admin" ? "admin" : "user";

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
