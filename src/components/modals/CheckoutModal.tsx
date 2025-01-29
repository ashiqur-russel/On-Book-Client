import { useState } from "react";
import OnModal from "../utils/OnModal";

interface CheckoutModalProps {
  onClose: () => void;
  customer: string;
  amount: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  customer,
  amount,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const handlePayment = () => {
    if (!cardNumber || !expiryDate || !cvc) {
      alert("❌ Please enter all card details!");
      return;
    }
    alert(`✅ Payment Confirmed for ${customer} of ${amount}`);
    onClose();
  };

  const checkoutContent = (
    <>
      {/* User Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{customer}</h3>
          <p className="text-gray-500 text-sm">
            Billing Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Total Amount */}
      <div className="mb-4 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800">Amount Due</h3>
        <p className="text-2xl font-bold text-gray-900">{amount}</p>
        <p className="text-gray-500 text-sm">Payment Method: Visa</p>
      </div>

      {/* Payment Details */}
      <div className="mb-4 bg-gray-100 p-4 rounded-lg">
        <h3 className="font-medium text-gray-800">Billing Plan</h3>
        <p className="text-gray-600 text-sm">Company Start</p>
      </div>

      {/* Card Details */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          placeholder="**** **** **** ****"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
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
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700">CVC</label>
          <input
            type="text"
            placeholder="123"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  );

  return (
    <OnModal
      title="Checkout"
      content={checkoutContent}
      buttonLabel="Confirm Payment"
      onClose={onClose}
      onConfirm={handlePayment}
    />
  );
};

export default CheckoutModal;
