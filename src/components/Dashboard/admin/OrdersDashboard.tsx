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

// Define Allowed Statuses
type PaymentStatus = "Pending" | "Success";
type FulfillmentStatus = "Unfulfilled" | "Fulfilled";

// Order Type Interface
interface OrderType {
  id: string;
  date: string;
  customer: string;
  payment: PaymentStatus;
  total: string;
  items: string;
  fulfillment: FulfillmentStatus;
}

// Mock Orders Data
const ordersData: OrderType[] = [
  {
    id: "#1002",
    date: "11 Feb, 2024",
    customer: "Wade Warren",
    payment: "Pending",
    total: "$20.00",
    items: "2 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1004",
    date: "13 Feb, 2024",
    customer: "Esther Howard",
    payment: "Success",
    total: "$22.00",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1007",
    date: "15 Feb, 2024",
    customer: "Jenny Wilson",
    payment: "Pending",
    total: "$25.00",
    items: "1 item",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1009",
    date: "17 Feb, 2024",
    customer: "Guy Hawkins",
    payment: "Success",
    total: "$27.00",
    items: "5 items",
    fulfillment: "Fulfilled",
  },
  {
    id: "#1011",
    date: "19 Feb, 2024",
    customer: "Jacob Jones",
    payment: "Pending",
    total: "$32.00",
    items: "4 items",
    fulfillment: "Unfulfilled",
  },
  {
    id: "#1013",
    date: "21 Feb, 2024",
    customer: "Kristin Watson",
    payment: "Success",
    total: "$25.00",
    items: "3 items",
    fulfillment: "Fulfilled",
  },
];

// Get Status Badge with TypeScript Validation
const getStatusBadge = (status: PaymentStatus | FulfillmentStatus) => {
  const statusClasses: Record<PaymentStatus | FulfillmentStatus, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Success: "bg-green-100 text-green-800",
    Unfulfilled: "bg-red-100 text-red-800",
    Fulfilled: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

const OrdersDashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersData.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(ordersData.length / ordersPerPage);

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={<FaShoppingCart />}
          title="Total Orders"
          value="21"
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

      {/* Filters & Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {["All", "Unfulfilled", "Unpaid", "Open", "Closed"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              {filter}
            </button>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            + Add
          </button>
        </div>

        <div className="relative">
          <BsSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search Orders..."
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
                <th className="px-4 py-2">Order</th>
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
              {currentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{getStatusBadge(order.payment)}</td>
                  <td className="px-4 py-3">{order.total}</td>
                  <td className="px-4 py-3">{order.items}</td>
                  <td className="px-4 py-3">
                    {getStatusBadge(order.fulfillment)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-600 hover:text-gray-900">
                      <FaEllipsisH />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-600">
            Showing {indexOfFirstOrder + 1} - {indexOfLastOrder} of{" "}
            {ordersData.length} orders
          </p>
          <div className="flex items-center space-x-2">
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <BiChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 border rounded-lg text-gray-900">
              {currentPage} / {totalPages}
            </span>
            <button
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <BiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
