// src/routes/route.tsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/Layout/RootLayout";
import MainLayout from "@/components/Layout/MainLayout";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/Error/ErrorsPage";
import SignIn from "@/pages/Signin/Signin";
import SignUp from "@/pages/Signup/Signup";
import App from "@/App";
import Product from "@/pages/BookStore/ProductDetails";
import Products from "@/pages/BookStore/ProductList";
import PaymentSuccess from "@/pages/Payment/Sucess";
import { adminPaths } from "./admin.route";
import { userPaths } from "./user.route";
import { routeGenerator } from "../utils/routeGenerator";

const router = createBrowserRouter([
  {
    // 1) The top-level route uses RootLayout
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,

    // 2) All child routes go inside children
    children: [
      // MainLayout path
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

      // Dashboard path (admin)
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

      // Dashboard path (user)
      {
        path: "/dashboard",
        element: <ProtectedRoute role="user" />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "user",
            element: <DashboardLayout />,
            children: routeGenerator(userPaths),
          },
        ],
      },

      // Payment success route
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },

  // Fallback for anything not matched
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
