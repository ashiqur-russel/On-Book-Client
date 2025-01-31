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
      query: () => ({
        url: `/orders/my-orders`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        console.log(response);
        return response.data;
      },
    }),
  }),
});

export const { useGetAllOrdersQuery, useGetMyordersQuery } = orderApi;
