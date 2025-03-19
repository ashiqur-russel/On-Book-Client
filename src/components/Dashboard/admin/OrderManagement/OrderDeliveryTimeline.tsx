import React from "react";

interface OrderTimelineProps {
  status: string;
}

const timelineSteps = [
  { key: "pending", label: "Order Placed" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

const OrderDeliveryTimeline: React.FC<OrderTimelineProps> = ({ status }) => {
  if (status === "cancelled") {
    return (
      <div className="flex flex-col items-start space-y-2">
        <div className="text-red-500 font-bold">Order Cancelled</div>
      </div>
    );
  }

  const activeIndex = timelineSteps.findIndex((step) => step.key === status);

  if (activeIndex < 0) {
    return <div className="text-gray-500 font-semibold">Unknown Status</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      {timelineSteps.map((step, index) => {
        // Step is considered completed if index < activeIndex
        // Step is active if index === activeIndex
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <div key={step.key} className="flex items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold
                ${
                  isCompleted
                    ? "bg-blue-500"
                    : isActive
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }
              `}
            >
              {index + 1}
            </div>
            <span className="ml-2">{step.label}</span>
            {index < timelineSteps.length - 1 && (
              <div className="mx-2 w-10 h-1 bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderDeliveryTimeline;
