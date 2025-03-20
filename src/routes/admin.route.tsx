import { FaChartLine, FaUsers, FaCog, FaJediOrder } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { BiBookAdd } from "react-icons/bi";
import Dashboard from "../components/Dashboard/Dashboard";
import CreateProduct from "@/components/Dashboard/admin/ProductManagement/CreateProduct";
import Users from "@/components/Dashboard/admin/UserManagement/Users";
import OrdersDashboard from "@/components/Dashboard/admin/OrdersDashboard";
import UserSettings from "@/components/Dashboard/user/Settings";
import ManageBooks from "@/components/Dashboard/admin/ProductManagement/ManageBooks";

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
    icon: <BiBookAdd />,
  },
  {
    name: "Manage Books",
    path: "manage-books",
    element: <ManageBooks />,
    icon: <GiBookshelf />,
  },

  {
    name: "Manage Users",
    path: "manage-users",
    element: <Users />,
    icon: <FaUsers />,
  },

  {
    name: "Manage Orders",
    path: "manage-orders",
    element: <OrdersDashboard />,
    icon: <FaJediOrder />,
  },
  {
    name: "Settings",
    path: "settings",
    element: <UserSettings />,
    icon: <FaCog />,
  },
];
