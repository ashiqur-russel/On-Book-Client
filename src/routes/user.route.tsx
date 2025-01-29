import { FaBook, FaUpload, FaCog, FaChartLine } from "react-icons/fa";
import UserDashboard from "../components/Dashboard/user/UserDashboard";
import MyOrders from "../components/Dashboard/user/Order-Management/MyOrder";
import Payment from "../components/Dashboard/Payment/Payment";

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
    children: [
      {
        name: "Payment",
        path: "payment",
        element: <Payment />,
      },
    ],
  },

  {
    name: "Upload Books",
    path: "upload",
    element: <Payment />,
    icon: <FaUpload />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <h1>User Settings</h1>,
    icon: <FaCog />,
  },
];
