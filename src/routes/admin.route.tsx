import { FaChartLine, FaUsers, FaCog, FaProductHunt } from "react-icons/fa";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateProduct from "../pages/Dashboard/admin/CreateProduct";

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
    icon: <FaProductHunt />,
  },
  {
    name: "Manage Users",
    path: "manage-users",
    element: "Manage Users",
    icon: <FaUsers />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <Dashboard />,
    icon: <FaCog />,
  },
];
