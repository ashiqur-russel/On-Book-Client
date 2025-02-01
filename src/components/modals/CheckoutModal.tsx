import { useForm } from "react-hook-form";
import OnModal from "../utils/OnModal";

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess: () => void;
  customer: string;
  amount: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  onSuccess,
  customer,
  amount,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentData>();

  interface PaymentData {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
  }

  const handlePayment = (data: PaymentData) => {
    console.log("Payment Success:", data);
    alert(`✅ Payment Confirmed for ${customer} of ${amount}`);
    onSuccess();
  };

  return (
    <OnModal title="Checkout" onClose={onClose}>
      <form onSubmit={handleSubmit(handlePayment)}>
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

        {/* Card Details */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            placeholder="**** **** **** ****"
            {...register("cardNumber", {
              required: "Card number is required",
              minLength: 16,
            })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber?.message}</p>
          )}
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
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              {...register("cvc", {
                required: "CVC is required",
                minLength: 3,
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md"
        >
          Confirm Payment
        </button>
      </form>
    </OnModal>
  );
};

export default CheckoutModal;
