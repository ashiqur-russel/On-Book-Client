import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { routeGenerator } from "../utils/routeGenerator";
import { adminPaths } from "./admin.route";
import { userPaths } from "./user.route";
import SignIn from "../pages/Signin/Signin";
import SignUp from "../pages/Signup/Signup";
import App from "../App";
import MainLayout from "../components/Layout/MainLayout";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Payment from "../components/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
  {
    path: "/payment",
    element: <ProtectedRoute role="user" />,
    children: [{ index: true, element: <Payment /> }],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        path: "admin",
        element: <DashboardLayout />,
        children: routeGenerator(adminPaths),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute role="user" />,
    children: [
      {
        path: "user",
        element: <DashboardLayout />,
        children: routeGenerator(userPaths),
      },
    ],
  },
]);

export default router;
