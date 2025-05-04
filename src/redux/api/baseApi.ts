/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { RootState } from "../store";
import { redirect } from "react-router";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL_LOCAL,

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuthHandling: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error) {
    const { status } = result.error as {
      status: number;
      data?: { message: string };
    };

    if (status === 401) {
      api.dispatch(logOut());
      toast.error("Unauthorized. Logging out...");
      redirect("/login");
    }

    return result;
  }

  // If the API call is successful and user is logged in, set the user immediately
  if (result?.data) {
    const user = (api.getState() as RootState).auth.user;
    const token = (api.getState() as RootState).auth.token;

    if (user && token) {
      api.dispatch(
        setUser({
          user,
          token,
        })
      );
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithAuthHandling,
  endpoints: () => ({}),
});
