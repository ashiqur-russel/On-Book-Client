import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className={`flex-1 transition-all ${isOpen ? "ml-64" : "ml-0"}`}>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
