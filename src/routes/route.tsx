import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import App from "../App";
import SignIn from "../pages/Signin/Signin";
import SignUp from "../pages/Signup/Signup";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Payment from "../components/Dashboard/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "payment", element: <Payment /> },
    ],
  },
]);

export default router;
