import { FaChartBar, FaCreditCard, FaBook, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Dashboard Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Dashboard Grid (Stats Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Payments */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaCreditCard className="text-3xl text-blue-500" />
          <div>
            <p className="text-gray-600">Total Payments</p>
            <h2 className="text-xl font-semibold text-gray-900">$12,500</h2>
          </div>
        </div>

        {/* Total Books */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaBook className="text-3xl text-green-500" />
          <div>
            <p className="text-gray-600">Total Books</p>
            <h2 className="text-xl font-semibold text-gray-900">1,250</h2>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUser className="text-3xl text-purple-500" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <h2 className="text-xl font-semibold text-gray-900">320</h2>
          </div>
        </div>

        {/* Reports & Insights */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaChartBar className="text-3xl text-yellow-500" />
          <div>
            <p className="text-gray-600">Reports</p>
            <h2 className="text-xl font-semibold text-gray-900">
              View Reports
            </h2>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-3">John Doe</td>
              <td className="px-4 py-3">Purchased a Book</td>
              <td className="px-4 py-3">Jan 12, 2024</td>
              <td className="px-4 py-3 text-green-500">Completed</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-3">Emma Smith</td>
              <td className="px-4 py-3">Added Payment</td>
              <td className="px-4 py-3">Jan 14, 2024</td>
              <td className="px-4 py-3 text-blue-500">Pending</td>
            </tr>
            <tr className="border-t border-gray-200 hover:bg-gray-100">
              <td className="px-4 py-3">Michael Brown</td>
              <td className="px-4 py-3">Updated Profile</td>
              <td className="px-4 py-3">Jan 15, 2024</td>
              <td className="px-4 py-3 text-yellow-500">In Progress</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex space-x-4">
        <Link
          to="/dashboard/payment"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Manage Payments
        </Link>
        <Link
          to="/dashboard/reports"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition"
        >
          View Reports
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
