import { FaUserCircle } from "react-icons/fa";

interface PaymentInfoProps {
  onCheckout: () => void;
  orderId: string;
  customer: string;
  totalPrice: string;
}

const PaymentInfo: React.FC<PaymentInfoProps> = ({
  onCheckout,
  orderId,
  customer,
  totalPrice,
}) => {
  return (
    <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg flex flex-col min-h-full">
      <h2 className="text-xl font-semibold text-black">Payment Detail</h2>

      {/* User Info */}
      <div className="mt-4 flex items-center space-x-4">
        <FaUserCircle className="text-4xl text-gray-600" />
        <div>
          <h3 className="text-gray-900 font-medium">{customer}</h3>
          <p className="text-gray-500 text-sm">Order ID: {orderId}</p>
        </div>
      </div>

      {/* Amount Due */}
      <div className="mt-6">
        <p className="text-gray-500">Amount Due</p>
        <p className="text-2xl font-bold text-gray-900">{totalPrice}</p>
      </div>

      {/* Billing Plan */}
      <div className="mt-6 p-4 rounded-lg flex-grow">
        <h3 className="font-medium text-gray-800">Billing Plan</h3>
        <p className="text-gray-600 text-sm">Company Start</p>
      </div>

      {/* Checkout Button - Stays at Bottom */}
      <button
        onClick={onCheckout}
        className="mt-auto bg-black text-white w-full py-3 rounded-md hover:bg-gray-800 transition text-lg"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PaymentInfo;
