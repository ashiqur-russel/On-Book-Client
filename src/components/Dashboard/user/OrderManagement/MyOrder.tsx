import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { useGetMyordersQuery } from "@/redux/features/orders/orderApi";
import OrderCard from "./OrderCard";
import { IOrder } from "@/types";

const MyOrders = () => {
  const [queryParams, setQueryParams] = useState({
    deliveryStatus: "",
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useGetMyordersQuery(queryParams);

  const totalOrders = orders?.meta?.total || 0;
  const totalPages = Math.max(1, Math.ceil(totalOrders / queryParams.limit));

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: Math.max(1, Math.min(newPage, totalPages)),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        Something went wrong! Please try again later.
      </div>
    );
  }

  if (
    !orders?.data ||
    !Array.isArray(orders.data) ||
    orders.data.length === 0
  ) {
    return (
      <div className="text-center text-lg font-semibold text-gray-600">
        You have no orders yet.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600">
          Showing{" "}
          {Math.min(
            (queryParams.page - 1) * queryParams.limit + 1,
            totalOrders
          )}{" "}
          - {Math.min(queryParams.page * queryParams.limit, totalOrders)} of{" "}
          {totalOrders} orders
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={() => handlePageChange(queryParams.page - 1)}
            disabled={queryParams.page === 1}
          >
            <BiChevronLeft className="w-5 h-5" />
          </button>
          <span className="px-3 py-1 border rounded-lg text-gray-900">
            {queryParams.page} / {totalPages}
          </span>
          <button
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            onClick={() => handlePageChange(queryParams.page + 1)}
            disabled={queryParams.page >= totalPages}
          >
            <BiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full mx-auto">
        {orders.data.map((order: IOrder) => (
          <OrderCard key={order._id} order={order} refetch={refetch} />
        ))}
      </div>
    </>
  );
};

export default MyOrders;
