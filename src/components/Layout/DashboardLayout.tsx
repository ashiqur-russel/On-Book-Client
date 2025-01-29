import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const userRole = "user";

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={() => setIsOpen(!isOpen)}
        role={userRole}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all ${
          isOpen ? "ml-64" : "ml-20"
        } p-6 overflow-y-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
