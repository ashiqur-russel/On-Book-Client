import CustomStyledSpinner from "@/components/shared/LoaderSpinner";
import { lazy, Suspense } from "react";
import { FaBook, FaCog, FaChartLine } from "react-icons/fa";

const LazyUserDashboard = lazy(
  () => import("@/components/Dashboard/user/UserDashboard")
);
const LazyMyOrders = lazy(
  () => import("@/components/Dashboard/user/OrderManagement/MyOrder")
);
const LazySettings = lazy(() => import("@/components/Dashboard/user/Settings"));

export const userPaths = [
  {
    name: "Dashboard",
    path: "",
    icon: <FaChartLine />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyUserDashboard />
      </Suspense>
    ),
  },
  {
    name: "My Orders",
    path: "my-orders",
    icon: <FaBook />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyMyOrders />
      </Suspense>
    ),
  },
  {
    name: "Settings",
    path: "settings",
    icon: <FaCog />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazySettings />
      </Suspense>
    ),
  },
];
