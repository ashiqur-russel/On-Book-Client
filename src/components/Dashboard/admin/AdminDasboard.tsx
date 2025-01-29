import { FaChartBar, FaBook, FaUsers, FaDollarSign } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard
          title="Total Revenue"
          value="$10,250"
          icon={<FaDollarSign />}
        />
        <StatCard title="Total Books" value="1,245" icon={<FaBook />} />
        <StatCard title="Total Users" value="3,876" icon={<FaUsers />} />
        <StatCard
          title="Sales Overview"
          value="Monthly Report"
          icon={<FaChartBar />}
        />
      </div>

      {/* Admin Graphs */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h3>
          <p className="text-gray-600">Graph Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">
            Revenue Analytics
          </h3>
          <p className="text-gray-600">Graph Placeholder</p>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
    <div className="text-blue-500 text-3xl">{icon}</div>
    <div className="ml-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
