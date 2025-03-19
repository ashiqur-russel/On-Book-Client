import React from "react";
import { toast } from "sonner";
import { useCancelOrderMutation } from "@/redux/features/orders/orderApi";
import OrderTimeLine from "./OrderTimeline";
import { IOrder } from "@/types";

const OrderCard: React.FC<{ order: IOrder; refetch: () => void }> = ({
  order,
  refetch,
}) => {
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const handleCancelOrder = async () => {
    try {
      await cancelOrder(order._id);
      toast.success("Order cancelled successfully!");
      refetch();
    } catch {
      toast.error("Failed to cancel order. Try again.");
    }
  };

  const getActiveSteps = (ds: IOrder["deliveryStatus"]) => {
    if (ds === "pending") return 1;
    if (ds === "shipped") return 2;
    if (ds === "delivered") return 3;
    return 0;
  };

  const activeSteps = getActiveSteps(order.deliveryStatus);

  const progressMap: { [key in IOrder["deliveryStatus"] | string]: number } = {
    pending: 25,
    shipped: 50,
    delivered: 100,
    revoked: 0,
  };
  const progress = progressMap[order.deliveryStatus] || 0;

  return (
    <div className="shadow-md rounded-xl p-7 mb-4 w-full border border-gray-200 relative">
      <p className="font-bold text-lg mb-2 text-gray-900">
        {order.status === "completed"
          ? "Order Completed"
          : order.status === "cancelled"
          ? "Order Cancelled"
          : order.deliveryStatus === "pending"
          ? "Waiting for Shipping"
          : order.deliveryStatus === "shipped"
          ? "Order has been shipped"
          : order.deliveryStatus === "delivered"
          ? "Order Delivered"
          : "Unknown Status"}
      </p>

      <div className="flex flex-col md:flex-row items-start gap-4">
        <img
          src={order.product.productImg}
          alt={order.product.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-md font-semibold">{order.product.title}</h2>
          <p className="text-gray-600">Quantity: {order.quantity}</p>
          <p className="text-gray-600">Total: €{order.totalPrice}</p>
          <p className="text-sm text-gray-500">
            Order Date: {new Date(order.createdAt).toDateString()}
          </p>
        </div>
      </div>

      <OrderTimeLine progress={progress} activeSteps={activeSteps} />

      {order.status === "completed" && (
        <button
          onClick={handleCancelOrder}
          disabled={isLoading || order.deliveryStatus !== "pending"}
          className={`w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-6 md:right-4 px-4 py-2 rounded-lg text-sm font-medium transition ${
            order.deliveryStatus !== "pending"
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {isLoading ? "Cancelling..." : "Cancel Order"}
        </button>
      )}

      {order.status === "cancelled" && order.payment.status !== "refunded" && (
        <button
          disabled
          className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-6 md:right-4 px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          Refund Processing...
        </button>
      )}

      {order.status === "cancelled" && order.payment.status === "refunded" && (
        <button
          disabled
          className="w-full md:w-auto mt-4 md:mt-0 md:absolute md:top-6 md:right-4 px-4 py-2 rounded-lg text-sm font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          Refund Completed
        </button>
      )}
    </div>
  );
};

export default OrderCard;
