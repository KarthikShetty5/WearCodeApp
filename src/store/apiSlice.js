import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://192.168.225.168:3000/';
//i found this IPv4 address by running ipconfig in command line

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    // Orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
    //user
    getUser: builder.query({
      query: (email) => `user/${email}`,
    }),
    // Orders
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'user',
        method: 'POST',
        body: newUser,
      }),
    }),
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useCreateUserMutation,
  useGetOrderQuery,
  useGetUserQuery,
  useCreatePaymentIntentMutation
} = apiSlice;
