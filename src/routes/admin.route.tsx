import { lazy, Suspense } from "react";
import { FaChartLine, FaUsers, FaCog, FaJediOrder } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import CustomStyledSpinner from "@/components/shared/LoaderSpinner";

const LazyDashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const LazyCreateProduct = lazy(
  () => import("@/components/Dashboard/admin/ProductManagement/CreateProduct")
);
const LazyManageBooks = lazy(
  () => import("@/components/Dashboard/admin/ProductManagement/ManageBooks")
);
const LazyUsers = lazy(
  () => import("@/components/Dashboard/admin/UserManagement/Users")
);
const LazyOrdersDashboard = lazy(
  () => import("@/components/Dashboard/admin/OrdersDashboard")
);
const LazyUserSettings = lazy(
  () => import("@/components/Dashboard/user/Settings")
);

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    icon: <FaChartLine />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyDashboard />
      </Suspense>
    ),
  },
  {
    name: "Add Book",
    path: "add-book",
    icon: <BiBookAdd />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyCreateProduct />
      </Suspense>
    ),
  },
  {
    name: "Manage Books",
    path: "manage-books",
    icon: <GiBookshelf />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyManageBooks />
      </Suspense>
    ),
  },
  {
    name: "Manage Users",
    path: "manage-users",
    icon: <FaUsers />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyUsers />
      </Suspense>
    ),
  },
  {
    name: "Manage Orders",
    path: "manage-orders",
    icon: <FaJediOrder />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyOrdersDashboard />
      </Suspense>
    ),
  },
  {
    name: "Settings",
    path: "settings",
    icon: <FaCog />,
    element: (
      <Suspense fallback={<div><CustomStyledSpinner /> </div>}>
        <LazyUserSettings />
      </Suspense>
    ),
  },
];
