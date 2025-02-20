import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/product/productSlice";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Auto-redirect after 3 seconds
  useEffect(() => {
    dispatch(clearCart());
    const timer = setTimeout(() => {
      navigate("/dashboard/user/my-orders");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-20 h-20 mx-auto mb-4 bg-green-500 text-white flex items-center justify-center rounded-full shadow-md"
        >
          <CheckCircle size={40} />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Successful
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your payment has been processed successfully.
        </p>

        {/* Auto-Redirect Info */}
        <p className="text-sm text-gray-400 mt-2">
          Redirecting to order page in a few seconds...
        </p>

        <button
          onClick={() => navigate("/dashboard/user/my-orders")}
          className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition w-full"
        >
          Go to Homepage
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
