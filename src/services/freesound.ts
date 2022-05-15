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
    baseUrl: "https://freesound.org/apiv2/",
  }),

  endpoints: (builder) => ({
    getSoundWithSearchKeyword: builder.query<{ results: Freesound[] }, string>({
      query: (searchParam) =>
        `search/text/?token=bbuumiZWaZ8jpJyjyFqiGxpYZmfocpy7cnzREzmL&query=${searchParam}`,
    }),
    getSoundById: builder.query<{ previews: { "preview-hq-mp3": string } }, string>({
      query: (id) => `sounds/${id}/?token=bbuumiZWaZ8jpJyjyFqiGxpYZmfocpy7cnzREzmL`,
    }),
  }),
});

export const { useGetSoundWithSearchKeywordQuery, useGetSoundByIdQuery } = freesoundApi;
