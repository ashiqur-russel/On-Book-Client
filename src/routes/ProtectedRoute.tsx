import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

interface ProtectedRouteProps {
  role: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
