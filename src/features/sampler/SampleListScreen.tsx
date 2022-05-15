import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import SampleList from "./SampleList";
import { getFiltredSampleList, Sample } from "./sampleSlice";

interface Props {}

const SampleListScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const [sampleType, setSampleType] = useState<"local" | "external" | "recorded" | "all">("all");
  const samples = useAppSelector(getFiltredSampleList(searchText));
  let filtredSample: Sample[];
  if (sampleType === "external") {
    filtredSample = samples.filter((s) => s.type === "external");
  } else if (sampleType === "recorded") {
    filtredSample = samples.filter((s) => s.type === "recorded");
  } else if (sampleType === "local") {
    filtredSample = samples.filter((s) => s.type === "local");
  } else {
    filtredSample = samples;
  }
  return (
    <Screen>
      <SampleList />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  topbar: {
    marginBottom: 16,
  },
});

export default SampleListScreen;
