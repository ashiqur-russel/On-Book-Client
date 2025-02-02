import { useNavigate } from "react-router-dom";
import { FaPaypal, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useGetMyordersQuery } from "@/redux/features/orders/orderApi";

interface Order {
  _id: string;
  user: string;
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  payment: string | null;
  deliveryStatus: "pending" | "shipped" | "delivered";
  createdAt: string;
  updatedAt: string;
}

const MyOrders = () => {
  const { data, isLoading, isError } = useGetMyordersQuery("");
  const navigate = useNavigate();

  console.log(data);

  // Function to handle payment click
  const handlePaymentClick = (order: Order) => {
    navigate(
      `/payment?orderId=${order._id}&customer=${order.email}&totalPrice=${order.totalPrice}`
    );
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Something went wrong! Please Logout and come back later.
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen flex items-center justify-center text-black">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 My Orders</h2>

        <div className="overflow-auto">
          <table className="w-full border border-gray-200 text-left min-w-[900px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm tracking-wider">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3">Total Price</th>
                <th className="px-4 py-3">Delivery Status</th>
                <th className="px-4 py-3">Payment Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-900">
              {data?.data?.map((order: Order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{order.email}</td>
                  <td className="px-4 py-3 text-center">{order.quantity}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${order.totalPrice}
                  </td>

                  {/* Delivery Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 font-semibold text-xs ${
                        order.deliveryStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.deliveryStatus === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.deliveryStatus}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="px-4 py-3">
                    {order.payment === null ? (
                      <span className="text-red-600 font-semibold">Unpaid</span>
                    ) : (
                      <span className="text-green-600 flex items-center font-semibold">
                        <FaCheckCircle className="w-4 h-4 mr-1" /> Paid
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 flex justify-center gap-3">
                    {order.payment === null && (
                      <>
                        {/* Pay Now Button */}
                        <button
                          className="bg-black text-white px-4 py-1 text-sm font-semibold hover:bg-gray-800 transition"
                          onClick={() => handlePaymentClick(order)}
                        >
                          <FaPaypal className="inline-block mr-1" /> Pay
                        </button>

                        {/* Cancel Order Button */}
                        <button className="bg-red-600 text-white px-4 py-1 text-sm font-semibold hover:bg-red-700 transition">
                          <FaTimes className="inline-block mr-1" /> Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*  Mobile View - List Layout */}
        <div className="sm:hidden">
          {data?.data?.map((order: Order) => (
            <div
              key={order._id}
              className="border border-gray-200 p-4 rounded-md mb-4"
            >
              <p className="text-sm text-gray-600">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> {order.email}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Quantity:</strong> {order.quantity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Total Price:</strong> ${order.totalPrice}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Delivery Status:</strong>{" "}
                <span
                  className={`px-2 py-1 font-semibold text-xs ${
                    order.deliveryStatus === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.deliveryStatus === "shipped"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.deliveryStatus}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Payment:</strong>{" "}
                {order.payment === null ? (
                  <span className="text-red-600 font-semibold">Unpaid</span>
                ) : (
                  <span className="text-green-600 font-semibold">Paid</span>
                )}
              </p>

              {/* Actions */}
              {order.payment === null && (
                <div className="mt-3 flex justify-between">
                  <button
                    className="bg-black text-white px-4 py-1 text-sm font-semibold hover:bg-gray-800 transition"
                    onClick={() => handlePaymentClick(order)}
                  >
                    <FaPaypal className="inline-block mr-1" /> Pay
                  </button>
                  <button className="bg-red-600 text-white px-4 py-1 text-sm font-semibold hover:bg-red-700 transition">
                    <FaTimes className="inline-block mr-1" /> Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
