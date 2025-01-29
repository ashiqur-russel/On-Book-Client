import { FaBook, FaUpload, FaCog, FaChartLine } from "react-icons/fa";
import UserDashboard from "../components/Dashboard/user/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: "",
    element: <UserDashboard />,
    icon: <FaChartLine />,
  },
  {
    name: "My Books",
    path: "my-books",
    element: "My Books",
    icon: <FaBook />,
  },
  {
    name: "Upload Books",
    path: "upload",
    element: "Upload Books",
    icon: <FaUpload />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <h1>User Settings</h1>,
    icon: <FaCog />,
  },
];
