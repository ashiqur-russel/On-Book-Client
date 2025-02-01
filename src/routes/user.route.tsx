import { FaBook, FaCog, FaChartLine } from "react-icons/fa";
import UserDashboard from "../components/Dashboard/user/UserDashboard";
import MyOrders from "../components/Dashboard/user/Order-Management/MyOrder";

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
    element: <h1>User Settings</h1>,
    icon: <FaCog />,
  },
];
