import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation({
      query: ({ items, product }) => ({
        url: "/payment/create-checkout-session",
        method: "POST",
        body: {
          items,
          product,
          successUrl: window.location.origin + "/payment-success",
          cancelUrl: window.location.origin + "/payment-failed",
        },
      }),
    }),

    issueRefund: builder.mutation({
      query: (paymentId) => ({
        url: `/payment/${paymentId}/issue-refund`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateCheckoutSessionMutation, useIssueRefundMutation } =
  paymentApi;
