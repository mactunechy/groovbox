import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const coreApi = createApi({
  reducerPath: 'coreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  endpoints: (builder) => ({
    getAllDjs: builder.query({
      query: () => 'users/all-djs',
    }),
    requestSong: builder.mutation({
      query: ({ song, djId }) => ({
        url: 'requests/create',
        method: 'POST',
        body: {
          song,
          djId,
        },
      }),
    }),
    upcomingRequests: builder.query({
      query: (djId) => `requests/upcoming/${djId}`,
    }),
  }),
});

export const {
  useGetAllDjsQuery,
  useRequestSongMutation,
  useUpcomingRequestsQuery,
} = coreApi;
