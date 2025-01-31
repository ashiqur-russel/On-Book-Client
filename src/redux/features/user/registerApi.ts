/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),
  }),
});

export const { useRegisterUserMutation, useGetMeQuery } = userManagementApi;
