import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
        <IoCloseCircleOutline className="text-red-600 text-6xl mx-auto mb-4" />

        <h2 className="text-xl font-semibold text-gray-900">Payment Failed</h2>
        <p className="text-gray-600 mt-2">
          Unfortunately, we couldn't process your payment. Please try again.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-red-600 text-white py-2 px-4 rounded-lg text-lg font-medium hover:bg-red-700 transition"
        >
          Retry Again
        </button>

        <p className="text-gray-500 text-sm mt-2">
          Redirecting to homepage in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
