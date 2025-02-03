/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { oldPassword, newPassword },
      }),

      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
