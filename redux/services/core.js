import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { SONG_STATUS } from '@utils/enums';

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
    markAsPlayed: builder.mutation({
      query: (requestId) => ({
        url: `requests/${requestId}/change-status`,
        method: 'PATCH',
        body: {
          status: SONG_STATUS.PLAYED,
        },
      }),
    }),
  }),
});

export const {
  useGetAllDjsQuery,
  useRequestSongMutation,
  useUpcomingRequestsQuery,
  useMarkAsPlayedMutation,
} = coreApi;
