import { useNavigate } from "react-router-dom";
import { FaPaypal, FaTimes } from "react-icons/fa";

const orders = [
  {
    id: "ZX9847417485",
    date: "Sep 3 Fri, 18:36",
    customer: "Mustafa Namoğlu",
    products: 3,
    productImg: "https://via.placeholder.com/40",
    status: "Pending",
    price: "$2,350.49",
  },
  {
    id: "WQRE148T793RF",
    date: "Sep 4 Fri, 19:24",
    customer: "Oğuz Yağız Kara",
    products: 2,
    productImg: "https://via.placeholder.com/40",
    status: "Pending",
    price: "$7,478.99",
  },
  {
    id: "PHK5395GJK54",
    date: "Sep 4 Fri, 21:41",
    customer: "Ömercan Çelikler",
    products: 2,
    productImg: "https://via.placeholder.com/40",
    status: "Pending",
    price: "$18,478.99",
  },
  {
    id: "PK821GJ6ZYPY912",
    date: "Sep 4 Sat, 16:39",
    customer: "Umut Ozan Yıldırım",
    products: 2,
    productImg: "https://via.placeholder.com/40",
    status: "Pending",
    price: "$18,478.99",
  },
];

const MyOrders = () => {
  const navigate = useNavigate();

  // Function to handle payment click
  const handlePaymentClick = (order: { id: string; customer: string; price: string }) => {
    navigate(
      `/payment?orderId=${order.id}&customer=${order.customer}&totalPrice=${order.price}`
    );
  };

  return (
    <div className="p-8 bg-blue-50 min-h-screen flex items-center justify-center text-black">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-2">Orders</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-3">
                    <span className="text-blue-600 font-medium">
                      {order.id}
                    </span>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <img
                      src={order.productImg}
                      alt="Product"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm">
                      +{order.products}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.price}</td>
                  <td className="px-4 py-3 flex space-x-3">
                    {/* Payment Button with Navigation */}
                    <button
                      className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 transition"
                      onClick={() => handlePaymentClick(order)}
                    >
                      <FaPaypal className="w-5 h-5" />
                    </button>

                    {/* Cancel Order Button */}
                    <button className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition">
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
