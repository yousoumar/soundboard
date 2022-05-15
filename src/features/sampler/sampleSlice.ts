import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import { RootState } from "../../app/store";

export interface Sample {
  id: string;
  name: string;
  local: boolean;
  uri: AVPlaybackSource;
}

export interface Pad {
  index: number;
  id: string;
}

interface SampleSlice {
  sampleList: Sample[];
  padList: Pad[];
}

const initialState: SampleSlice = {
  sampleList: [
    {
      id: "0",
      name: "ClapOne",
      uri: require("../../assets/samples/clap_1.wav"),
      local: true,
    },
    {
      id: "1",
      name: "ClapTwo",
      uri: require("../../assets/samples/clap_2.wav"),
      local: true,
    },
    {
      id: "2",
      name: "FxOne",
      uri: require("../../assets/samples/fx_1.wav"),
      local: true,
    },
    {
      id: "3",
      name: "FxTwo",
      uri: require("../../assets/samples/fx_2.wav"),
      local: true,
    },
    {
      id: "4",
      name: "KickOne",
      uri: require("../../assets/samples/kick_1.wav"),
      local: true,
    },
    {
      id: "5",
      name: "KickTwo",
      uri: require("../../assets/samples/kick_2.wav"),
      local: true,
    },
    {
      id: "6",
      name: "ShakerOne",
      uri: require("../../assets/samples/shaker_1.wav"),
      local: true,
    },
    {
      id: "7",
      name: "ShakerTwo",
      uri: require("../../assets/samples/shaker_2.wav"),
      local: true,
    },
    {
      id: "8",
      name: "ShakerThree",
      uri: require("../../assets/samples/shaker_3.wav"),
      local: true,
    },
    {
      id: "9",
      name: "SnareOne",
      uri: require("../../assets/samples/snare_1.wav"),
      local: true,
    },
    {
      id: "10",
      name: "SnareTwo",
      uri: require("../../assets/samples/snare_2.wav"),
      local: true,
    },
    {
      id: "11",
      name: "TomOne",
      uri: require("../../assets/samples/tom_1.wav"),
      local: true,
    },
    {
      id: "12",
      name: "TomTwo",
      uri: require("../../assets/samples/tom_2.wav"),
      local: true,
    },
    {
      id: "13",
      name: "TomThree",
      uri: require("../../assets/samples/tom_3.wav"),
      local: true,
    },
    {
      id: "14",
      name: "TomFour",
      uri: require("../../assets/samples/tom_4.wav"),
      local: true,
    },
    {
      id: "15",
      name: "TomFive",
      uri: require("../../assets/samples/tom_5.wav"),
      local: true,
    },
  ],
  padList: [
    { index: 0, id: "0" },
    { index: 1, id: "1" },
    { index: 2, id: "2" },
    { index: 3, id: "3" },
    { index: 4, id: "4" },
    { index: 5, id: "5" },
    { index: 6, id: "6" },
    { index: 7, id: "7" },
    { index: 8, id: "8" },
    { index: 9, id: "9" },
    { index: 10, id: "10" },
    { index: 11, id: "11" },
    { index: 12, id: "12" },
    { index: 13, id: "13" },
    { index: 14, id: "14" },
    { index: 15, id: "15" },
  ],
};

export const sample = createSlice({
  name: "sample",
  initialState,
  reducers: {
    addSampleToList: (state, action: PayloadAction<Sample>) => {
      state.sampleList.push(action.payload);
    },
    updatePad: (state, action: PayloadAction<Pad>) => {
      state.padList[action.payload.index].id = action.payload.id;
    },
    removeSampleFromList: (state, action: PayloadAction<Sample>) => {
      state.sampleList = state.sampleList.filter(
        (m: Sample) => JSON.stringify(m) !== JSON.stringify(action.payload)
      );
    },
  },
});

export const getSampleList = (state: RootState) => state.sample.sampleList;
export const getPadList = (state: RootState) => state.sample.padList;
export const getSampleById = (id: string) => (state: RootState) =>
  state.sample.sampleList.find((s) => s.id === id)!;

export const { addSampleToList, removeSampleFromList, updatePad } = sample.actions;

export default sample.reducer;
