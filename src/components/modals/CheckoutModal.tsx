import { useCreateCheckoutSessionMutation } from "@/redux/features/payment/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import OnModal from "../utils/OnModal";
import { useEffect, useState } from "react";
import { IProduct } from "@/types";

interface CheckoutModalProps {
  items: IProduct[];

  onClose: () => void;

  onSuccess: () => void;

  customer: string;

  amount: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  onClose,
  customer,
  amount,
  items,
}) => {
  const [createCheckoutSession, { isLoading }] =
    useCreateCheckoutSessionMutation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  }, [items]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (!items || items.length === 0) {
        throw new Error("No items found for checkout.");
      }

      const formattedItems = items.map((item) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const product = items[0]?.id;

      if (!product) {
        throw new Error("Missing required fields: user, email, product.");
      }

      // Create Stripe Checkout Session
      const response = await createCheckoutSession({
        items: formattedItems,
        product,
      }).unwrap();

      if (!response?.data?.sessionId) {
        throw new Error("No sessionId returned from API.");
      }

      const stripe = await loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
      if (!stripe) {
        throw new Error("Stripe failed to initialize.");
      }

      const redirectResult = await stripe.redirectToCheckout({
        sessionId: response?.data?.sessionId,
      });

      if (redirectResult.error) {
        throw new Error(redirectResult.error.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message || "An unknown error occurred.");
    }
  };

  return (
    <OnModal title="Checkout" onClose={onClose}>
      <form onSubmit={handlePayment}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{customer}</h3>
            <p className="text-gray-500 text-sm">
              Billing Date: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Order Summary</h3>
          <div className="max-h-40 overflow-y-auto bg-gray-100 p-4 rounded-md">
            {items.map((item, index) => (
              <div key={index} className="border-b pb-2 mb-2">
                <p className="font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-600">By {item.author}</p>
                <p className="text-sm text-gray-500">
                  Quantity:{" "}
                  <span className="font-semibold">{item.quantity}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Price: <span className="font-semibold">${item.price}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 bg-gray-100 p-4 rounded-md">
          <h3 className="font-medium text-gray-800">Amount to be paid</h3>
          <p className="text-2xl font-bold text-gray-900">${amount}</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full btn-error text-white py-2"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="w-full btn-primary text-white py-2"
            disabled={isLoading}
          >
            {isLoading ? "PROCESSING..." : "CONFIRM"}
          </button>
        </div>
      </form>
    </OnModal>
  );
};

export default CheckoutModal;
