import React, { useEffect, useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";

const CheckoutModal = ({ onClose }: { onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // Smooth fade-in effect
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>

        {/* User Info */}
        <div className="flex items-center space-x-3 mb-4">
          <FaUserCircle size={40} className="text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Adison Rosser
            </h3>
            <p className="text-gray-500 text-sm">Mar 20, 2021</p>
          </div>
        </div>

        {/* Total Amount */}
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800">Amount Due</h3>
          <p className="text-2xl font-bold text-gray-900">$250.00</p>
          <p className="text-gray-500 text-sm">Visa - $250.00</p>
        </div>

        {/* Payment Details */}
        <div className="mb-4 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800">Billing Plan</h3>
          <p className="text-gray-600 text-sm">Company Start</p>
          <ul className="text-gray-500 text-sm mt-2 space-y-1">
            <li>✔ 5 team members ($5 / Month each)</li>
            <li>✔ 10 GB extra storage ($2.00)</li>
            <li>✔ 8 work hours ($2 / hour)</li>
          </ul>
        </div>

        {/* Card Details */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            placeholder="**** **** **** ****"
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Expiry Date & CVC */}
        <div className="flex space-x-3">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Confirm Payment Button */}
        <button
          onClick={() => alert("Payment Confirmed!")}
          className="mt-4 bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition text-lg"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal;
