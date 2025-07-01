import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-core.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        `${import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY}`
      );
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: (countryCode) =>
        `/v1/charts/world?country_code=${countryCode || "IN"}`,
    }),
    getSongDetails: builder.query({
      query: (songId) => `/v2/tracks/details?track_id=${songId}`,
    }),
    getSongRelated: builder.query({
      query: (songId) => `/v1/tracks/related?track_id=${songId}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/v2/artists/details?artist_id=${artistId}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) =>
        `/v1/charts/country?country_code=${countryCode || "IN"}`,
    }),
    getSongsByGenre: builder.query({
      query: ({ countryCode, genre }) =>
        `/v1/charts/genre-world?genre_code=${genre || "POP"}&country_code=${
          countryCode || "IN"
        }`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/v1/search/multi?offset=0&search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsByCountryQuery,
  useGetSongsByGenreQuery,
  useGetSongsBySearchQuery
} = shazamCoreApi;
