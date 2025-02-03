import {
  FaChartLine,
  FaUsers,
  FaCog,
  FaBook,
  FaJediOrder,
} from "react-icons/fa";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateProduct from "@/components/Dashboard/admin/ProductManagement/CreateProduct";
import Users from "@/components/Dashboard/admin/UserManagement/Users";
import OrdersDashboard from "@/components/Dashboard/admin/OrdersDashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <Dashboard />,
    icon: <FaChartLine />,
  },
  {
    name: "Add Book",
    path: "add-book",
    element: <CreateProduct />,
    icon: <FaBook />,
  },
  {
    name: "Manage Users",
    path: "manage-users",
    element: <Users />,
    icon: <FaUsers />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <Dashboard />,
    icon: <FaCog />,
  },
  {
    name: "Manage Orders",
    path: "manage-orders",
    element: <OrdersDashboard />,
    icon: <FaJediOrder />,
  },
];
