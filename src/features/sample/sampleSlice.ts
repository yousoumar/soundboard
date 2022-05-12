import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import { RootState } from "../../app/store";

export interface Sample {
  id: string;
  name: string;
  local: boolean;
  uri: AVPlaybackSource;
}

interface SampleSlice {
  sampleList: Sample[];
}

const initialState: SampleSlice = {
  sampleList: [
    {
      id: "0",
      name: "clapOne",
      uri: require("../../assets/samples/clap_1.wav"),
      local: true,
    },
    {
      id: "1",
      name: "clapTwo",
      uri: require("../../assets/samples/clap_2.wav"),
      local: true,
    },
    {
      id: "2",
      name: "fxOne",
      uri: require("../../assets/samples/fx_1.wav"),
      local: true,
    },
    {
      id: "3",
      name: "fxTwo",
      uri: require("../../assets/samples/fx_2.wav"),
      local: true,
    },
    {
      id: "4",
      name: "kickOne",
      uri: require("../../assets/samples/kick_1.wav"),
      local: true,
    },
    {
      id: "5",
      name: "kickTwo",
      uri: require("../../assets/samples/kick_2.wav"),
      local: true,
    },
    {
      id: "6",
      name: "shakerOne",
      uri: require("../../assets/samples/shaker_1.wav"),
      local: true,
    },
    {
      id: "7",
      name: "shakerTwo",
      uri: require("../../assets/samples/shaker_2.wav"),
      local: true,
    },
    {
      id: "8",
      name: "shakerThree",
      uri: require("../../assets/samples/shaker_3.wav"),
      local: true,
    },
    {
      id: "9",
      name: "snareOne",
      uri: require("../../assets/samples/snare_1.wav"),
      local: true,
    },
    {
      id: "10",
      name: "snareTwo",
      uri: require("../../assets/samples/snare_2.wav"),
      local: true,
    },
    {
      id: "11",
      name: "tomOne",
      uri: require("../../assets/samples/tom_1.wav"),
      local: true,
    },
    {
      id: "12",
      name: "tomTwo",
      uri: require("../../assets/samples/tom_2.wav"),
      local: true,
    },
    {
      id: "13",
      name: "tomThree",
      uri: require("../../assets/samples/tom_3.wav"),
      local: true,
    },
    {
      id: "14",
      name: "tomFour",
      uri: require("../../assets/samples/tom_4.wav"),
      local: true,
    },
    {
      id: "15",
      name: "tomFive",
      uri: require("../../assets/samples/tom_5.wav"),
      local: true,
    },
  ],
};

export const sample = createSlice({
  name: "sample",
  initialState,
  reducers: {
    addSampleToList: (state, action: PayloadAction<Sample>) => {
      state.sampleList.push(action.payload);
    },

    removeSampleFromList: (state, action: PayloadAction<Sample>) => {
      state.sampleList = state.sampleList.filter(
        (m: Sample) => JSON.stringify(m) !== JSON.stringify(action.payload)
      );
    },
  },
});

export const getSampleList = (state: RootState) => state.sample.sampleList;

export const { addSampleToList, removeSampleFromList } = sample.actions;

export default sample.reducer;
