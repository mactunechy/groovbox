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
          songKey: song.key,
          title: song.title,
          coverUrl: song.images.coverart,
          djId,
        },
      }),
    }),
  }),
});

export const { useGetAllDjsQuery, useRequestSongMutation } = coreApi;
