import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Cart from "../Cart/Cart";
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
        <Outlet />

        <div className="fixed top-0 right-0 bg-gray-100 p-4 shadow-lg">
          <Cart />{" "}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
