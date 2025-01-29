import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role: "admin" | "user";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  //const user = useAppSelector(selectCurrentUser);

  const user = { name: " Ashiqur Russel", role: "user" };

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
