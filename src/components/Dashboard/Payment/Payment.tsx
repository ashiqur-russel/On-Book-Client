import { useState } from "react";
import { FaEllipsisH, FaUserCircle } from "react-icons/fa";
import CheckoutModal from "./CheckoutModal";

const payments = [
  {
    id: 1,
    name: "Charge Back",
    type: "PAYMENT",
    date: "Mar 20, 2021",
    amount: "-$140.20",
    statusColor: "text-red-500",
  },
  {
    id: 2,
    name: "Information Requested",
    type: "REFUND",
    date: "Mar 20, 2021",
    amount: "+$40.20",
    statusColor: "text-green-500",
  },
  {
    id: 3,
    name: "Settled",
    type: "PAYMENT",
    date: "Mar 20, 2021",
    amount: "-$74.70",
    statusColor: "text-red-500",
  },
  {
    id: 4,
    name: "Authorized",
    type: "CREDIT",
    date: "Mar 19, 2021",
    amount: "-$1.20",
    statusColor: "text-blue-500",
  },
];

const Payment = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e5f5] to-[#e3f2fd] flex flex-col items-center py-10 px-4">
      {/* Main Content */}
      <div className="w-full max-w-5xl mt-10 bg-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6">
        {/* Credit Card Section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">Your Credit Card</h2>

          {/* Credit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
            {/* Primary Card */}
            <div className="w-full min-h-[8rem] bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl flex flex-col justify-between">
              <h3 className="text-lg font-bold">VISA</h3>
              <p className="text-lg">**** **** 222 0034</p>
              <p className="text-sm">Craig S.</p>
            </div>

            {/* Secondary Card */}
            <div className="w-full min-h-[8rem] bg-gray-100 p-4 rounded-xl flex flex-col justify-between">
              <h3 className="text-lg font-bold text-gray-700">VISA</h3>
              <p className="text-lg text-gray-700">**** **** 002 0329</p>
              <p className="text-sm text-gray-600">Craig S.</p>
            </div>
          </div>

          {/* Recent Payments Table */}
          <h3 className="text-lg font-semibold mt-6">Recent Payment</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden bg-white shadow-md">
              <thead className="bg-gray-200 text-gray-600 text-left">
                <tr>
                  <th className="px-4 py-2">Transaction</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-t border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3 text-gray-700">{payment.name}</td>
                    <td className="px-4 py-3 text-gray-500">{payment.type}</td>
                    <td className="px-4 py-3 text-gray-500">{payment.date}</td>
                    <td
                      className={`px-4 py-3 font-medium text-right ${payment.statusColor}`}
                    >
                      {payment.amount}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <FaEllipsisH className="text-gray-500 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Details + Checkout Button */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Payment Detail</h2>
          <div className="mt-4 flex items-center space-x-4">
            <FaUserCircle className="text-4xl text-gray-600" />
            <div>
              <h3 className="text-gray-900 font-medium">Adison Rosser</h3>
              <p className="text-gray-500 text-sm">Mar 20, 2021</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-500">Amount Due</p>
            <p className="text-2xl font-bold text-gray-900">$250.00</p>
            <p className="text-gray-500 text-sm">Visa $250.00</p>
          </div>

          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800">Billing Plan</h3>
            <p className="text-gray-600 text-sm">Company Start</p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition text-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Payment;
