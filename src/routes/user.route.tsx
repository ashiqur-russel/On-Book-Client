import { FaBook, FaCog, FaChartLine } from "react-icons/fa";
import UserDashboard from "../components/Dashboard/user/UserDashboard";
import MyOrders from "../components/Dashboard/user/OrderManagement/MyOrder";
import Settings from "@/components/Dashboard/user/Settings";

export const userPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <UserDashboard />,
    icon: <FaChartLine />,
  },
  {
    name: "My Orders",
    path: "my-orders",
    element: <MyOrders />,
    icon: <FaBook />,
  },

  {
    name: "Settings",
    path: "settings",
    element: <Settings />,
    icon: <FaCog />,
  },
];
