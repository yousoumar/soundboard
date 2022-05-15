import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Freesound {
  id: number;
  license: string;
  name: string;
  tags: string[];
  username: string;
}
export const freesoundApi = createApi({
  reducerPath: "freesoundApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://freesound.org/apiv2/search/text/?token=bbuumiZWaZ8jpJyjyFqiGxpYZmfocpy7cnzREzmL&query=",
  }),
  endpoints: (builder) => ({
    getSoundWithSearchKeyword: builder.query<{ results: Freesound[] }, string>({
      query: (searchParam) => searchParam,
    }),
  }),
});

export const { useGetSoundWithSearchKeywordQuery } = freesoundApi;
