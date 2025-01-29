import { FaChartLine, FaUsers, FaCog, FaPaypal } from "react-icons/fa";
import Dashboard from "../components/Dashboard/Dashboard";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <Dashboard />,
    icon: <FaChartLine />,
  },
  {
    name: "Check Payments",
    path: "check-payments",
    element: "Check Payments",
    icon: <FaPaypal />,
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
    element: <h1>Admin Settings</h1>,
    icon: <FaCog />,
  },
];
