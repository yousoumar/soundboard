import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Media {
  artworkUrl100: string;
  previewUrl: string;
  trackName: string;
  trackId: string;
  kind: "song" | "podcast";
}

interface MediaSlice {
  mediaList: Media[];
  playingMedia: Media | null;
  filter: "music" | "podcast";
}

const initialState: MediaSlice = { mediaList: [], playingMedia: null, filter: "music" };

export const media = createSlice({
  name: "media",
  initialState,
  reducers: {
    addMediaToList: (state, action: PayloadAction<Media>) => {
      state.mediaList.push(action.payload);
    },

    removeMediaFromList: (state, action: PayloadAction<Media>) => {
      state.mediaList = state.mediaList.filter(
        (m: Media) => JSON.stringify(m) !== JSON.stringify(action.payload)
      );
    },

    setPlayingMedia: (state, action: PayloadAction<Media | null>) => {
      state.playingMedia = action.payload;
    },

    changeFilter: (state, action: PayloadAction<"music" | "podcast">) => {
      state.filter = action.payload;
    },
  },
});

const filterMediaList = (mediaList: Media[], filter: "podcast" | "music") => {
  return mediaList.filter((m) => {
    if (m.kind == "song" && filter == "music") return true;
    if (m.kind == filter) return true;
    return false;
  });
};

export const getFilter = (state: RootState) => state.media.filter;

export const getMediaList = (state: RootState) => state.media.mediaList;

export const getFiltredMediaList = (state: RootState) =>
  filterMediaList(state.media.mediaList, state.media.filter);

export const getFiltredMediaWithSearch = (searchText: string) => (state: RootState) =>
  filterMediaList(state.media.mediaList, state.media.filter).filter((m) =>
    m.trackName.includes(searchText.trim().toLowerCase())
  );

export const { addMediaToList, setPlayingMedia, removeMediaFromList, changeFilter } = media.actions;

export default media.reducer;
