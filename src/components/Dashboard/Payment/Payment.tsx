import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckoutModal from "../../modals/CheckoutModal";
import CardInfo from "./CardInfo";
import PaymentDetails from "./PaymentDetails";
import PaymentInfo from "./PaymentInfo";

// Mock Payment Data (Replace with API Data)
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
  const [searchParams] = useSearchParams();

  // Fetch order details from query params
  const orderId = searchParams.get("orderId") || "N/A";
  const customer = searchParams.get("customer") || "Unknown";
  const totalPrice = searchParams.get("totalPrice") || "$0.00";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e5f5] to-[#e3f2fd] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl mt-10 bg-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl text-black font-semibold">Your Credit Card</h2>
          <CardInfo />
          <PaymentDetails payments={payments} />
        </div>

        {/* Payment Info */}
        <PaymentInfo
          onCheckout={() => setShowModal(true)}
          orderId={orderId}
          customer={customer}
          totalPrice={totalPrice}
        />
      </div>

      {/* Checkout Modal */}
      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Payment;
