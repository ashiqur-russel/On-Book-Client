/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/products",
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
    getBestSellingProducts: builder.query({
      query: () => ({
        url: "/products/best-sellers",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any[]>) => {
        return response.data;
      },
    }),
    getProductById: builder.query({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),

   offerProduct: builder.mutation<void, { productIds: string[], offerRate: number, start: string, end: string }>({
  query: (payload) => ({
    url: '/products/offer',
    method: 'POST',
    body: payload,
  }),
}),

    
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useGetBestSellingProductsQuery,
  useOfferProductMutation,
} = productApi;
