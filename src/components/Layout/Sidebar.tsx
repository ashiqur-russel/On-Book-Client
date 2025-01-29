import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`bg-gray-900 text-white fixed h-full transition-all ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      <div className="p-5 flex justify-between items-center">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-lg">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-6 space-y-4">
          <Link to="/dashboard" className="block p-3 hover:bg-gray-700">
            Dashboard
          </Link>
          <Link to="/dashboard/payment" className="block p-3 hover:bg-gray-700">
            Payments
          </Link>
          <Link to="/" className="block p-3 hover:bg-gray-700">
            Home
          </Link>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
