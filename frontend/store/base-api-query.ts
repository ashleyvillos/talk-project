import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQueryAPI = createApi({
  reducerPath: 'users-query',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63438d663f83935a78552378.mockapi.io',
  }),
  tagTypes: ['Users'],
  endpoints: (build) => ({}),
})

export default baseQueryAPI;