import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Media } from "../features/media/mediaSlice";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  endpoints: (builder) => ({
    getMediaBySearchKeyword: builder.query<{ results: Media[] }, string>({
      query: (searchParam) => `search?limit=14&${searchParam}`,
    }),
  }),
});

export const { useGetMediaBySearchKeywordQuery } = mediaApi;
