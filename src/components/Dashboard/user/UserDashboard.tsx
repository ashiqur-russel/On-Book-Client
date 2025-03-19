import { FaBook, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import StatCard from "../shared/StatCard";

const UserDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">User Dashboard</h2>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <StatCard title="My Books" value="32" icon={<FaBook />} />
        <StatCard title="Books Purchased" value="8" icon={<FaShoppingCart />} />
        <StatCard title="Total Spent" value="$540" icon={<FaDollarSign />} />
      </div>

      {/* User Recent Purchases */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Purchases
        </h3>
        <ul className="mt-4 space-y-3">
          <li className="text-gray-700">✔️ "The Alchemist" - $12</li>
          <li className="text-gray-700">✔️ "Atomic Habits" - $15</li>
          <li className="text-gray-700">✔️ "Deep Work" - $18</li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
