/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/orders",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getMyorders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args && typeof args === "object") {
          Object.entries(args).forEach(([key, value]) => {
            if (value !== "") {
              params.append(key, String(value));
            }
          });
        }

        return {
          url: `/orders/my-orders`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}/cancel`,
        method: "PATCH",
      }),

      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),

    changeDeliveryStatus: builder.mutation({
      query: ({
        orderId,
        deliveryStatus,
      }: {
        orderId: string;
        deliveryStatus: "shipped" | "delivered";
      }) => ({
        url: `/orders/${orderId}/delivery-status`,
        method: "PATCH",
        body: { deliveryStatus },
      }),
      transformResponse: (response: TResponseRedux<any>) => response.data,
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetMyordersQuery,
  useCancelOrderMutation,
  useChangeDeliveryStatusMutation,
} = orderApi;
