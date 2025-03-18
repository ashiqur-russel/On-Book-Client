import { Outlet } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Navbar from "../shared/Navbar/Navbar";

const MainLayout = () => {
  const isCartOpen = useAppSelector(
    (state: RootState) => state.global.isCartOpen
  );

  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />

      <main
        className={`flex-1 relative pt-[60px] ${
          isCartOpen ? "overflow-hidden" : ""
        }`}
      >
        <Outlet />
      </main>

      <div
        className={`fixed inset-0 ${isCartOpen ? "z-[60]" : "z-[-1] hidden"}`}
      >
        <Cart />
      </div>
    </div>
  );
};

export default MainLayout;
