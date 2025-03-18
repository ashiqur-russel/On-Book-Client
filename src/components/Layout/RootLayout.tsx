import { Outlet } from "react-router-dom";
import Notification from "../Notification";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function RootLayout() {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.email;

  return (
    <>
      {userId && <Notification userId={userId} />}

      <Outlet />
    </>
  );
}
