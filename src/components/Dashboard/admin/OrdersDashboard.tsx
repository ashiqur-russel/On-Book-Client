import { useState } from "react";
import {
  FaShoppingCart,
  FaBoxOpen,
  FaRedo,
  FaChartBar,
  FaEllipsisH,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/orderApi";

const getStatusBadge = (status: string) => {
  const statusClasses: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    delivered: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        statusClasses[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrdersDashboard = () => {
  const [queryParams, setQueryParams] = useState({
    deliveryStatus: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const queryArray = Object.entries(queryParams)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => ({ name: key, value }));

  const { data, isLoading, error } = useGetAllOrdersQuery(queryArray);

  const orders = data?.data || [];
  const totalOrders = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPage || 1;

  const handleFilterClick = (filter: string) => {
    setQueryParams({
      ...queryParams,
      deliveryStatus: filter.toLowerCase(),
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setQueryParams({ ...queryParams, page: newPage });
    }
  };

  return (
    <div className="p-6">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md">
          Error fetching data: {JSON.stringify(error)}
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={<FaShoppingCart />}
          title="Total Orders"
          value={totalOrders.toString()}
          change="+25.2%"
        />
        <SummaryCard
          icon={<FaBoxOpen />}
          title="Order Items Over Time"
          value="15"
          change="-18.2%"
        />
        <SummaryCard
          icon={<FaRedo />}
          title="Return Orders"
          value="0"
          change="-1.2%"
        />
        <SummaryCard
          icon={<FaChartBar />}
          title="Fulfilled Orders Over Time"
          value="12"
          change="+12.2%"
        />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-2 items-center mb-4">
        <div className="grid grid-cols-5 gap-2">
          {["All", "PENDING", "DELIVERED", "SHIPPED", "CANCELLED"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-2 py-1 border rounded-sm text-xs ${
                  queryParams.deliveryStatus === filter.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <BsSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Orders..."
            value={queryParams.searchTerm}
            onChange={(e) =>
              setQueryParams({
                ...queryParams,
                searchTerm: e.target.value,
                page: 1,
              })
            }
            className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow-md text-black">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[800px]">
            <thead className="bg-gray-200 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Items</th>
                <th className="px-4 py-2">Fulfillment</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">{order._id}</td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{order.user.name}</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-4 py-3">${order.totalPrice}</td>
                    <td className="px-4 py-3">{order.quantity} item(s)</td>
                    <td className="px-4 py-3">
                      {getStatusBadge(order.deliveryStatus)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-gray-600 hover:text-gray-900">
                        <FaEllipsisH />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-4">
                    {isLoading ? "Loading orders..." : "No orders found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing {(queryParams.page - 1) * queryParams.limit + 1} -{" "}
            {Math.min(queryParams.page * queryParams.limit, totalOrders)} of{" "}
            {totalOrders} orders
          </p>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => handlePageChange(queryParams.page - 1)}
              disabled={queryParams.page === 1}
            >
              <BiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 border rounded-lg text-gray-900">
              {queryParams.page} / {totalPages}
            </span>
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => handlePageChange(queryParams.page + 1)}
              disabled={queryParams.page === totalPages}
            >
              <BiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO: Summary Card  (Static data now)
interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: string;
  change: string;
}

const SummaryCard = ({ icon, title, value, change }: SummaryCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
    <div className="text-3xl text-blue-500">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
      <p className="text-sm text-green-500">{change}</p>
    </div>
  </div>
);

export default OrdersDashboard;
