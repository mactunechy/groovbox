import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const fetchCountry = async () => {
  try {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.NEXT_PUBLIC_GEO_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      return data?.location.country;
      setLoading(false);
    } else {
      console.log('Something went wrong: defaulting to US');
      return 'US';
    }
  } catch (error) {
    console.log(error);
    console.log('defaulting to US');
    return 'US';
  }
};

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        process.env.NEXT_PUBLIC_SHAZAM_CORE_RAPID_API_KEY
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
    getSongsByGenre: builder.query({
      query: (genre) => `v1/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsByCountry: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const countryCode = await fetchCountry();
        const result = await fetchWithBQ(
          `v1/charts/country?country_code=${countryCode}`
        );
        return result.data
          ? { data: { songs: result.data, countryCode } }
          : { error: result.error };
      },
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) =>
        `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
    }),
    getSongDetails: builder.query({
      query: ({ songid }) => `v1/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `v1/tracks/related?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = shazamCoreApi;
