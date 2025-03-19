/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),

      transformResponse: (response: TResponseRedux<any[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    markNotificationRead: builder.mutation({
      query: (notificationId: string) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PATCH",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetNotificationsQuery, useMarkNotificationReadMutation } =
  notificationApi;
