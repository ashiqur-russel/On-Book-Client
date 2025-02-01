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
import ErrorPage from "../pages/Error/ErrorsPage";
import Product from "../pages/BookStore/ProductDetails";
import Products from "../pages/BookStore/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <Product /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute role="admin" />,
    errorElement: <ErrorPage />,
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

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
