import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log(err);
        }
      },
    }),

    logout: builder.query({
        query: () => ({
            url: "/logout",
        }),
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
            try {
            await queryFulfilled;
            dispatch(userApi.endpoints.getMe.initiate(null));
            } catch (err) {
            console.log(err);
            }
        },
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery} = authApi;
