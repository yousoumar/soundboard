import React, { FC, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Input from "../../components/Input";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import SamplePreview from "./SamplePreview";
import { getFiltredSampleList, Sample } from "./sampleSlice";

interface Props {
  handleSamplePress?: (sample: Sample) => void;
}

const SampleList: FC<Props> = ({ handleSamplePress }) => {
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
      <View style={styles.topbar}>
        <Input
          value={searchText}
          onValueChange={(value: string) => setSearchText(value)}
          placeholder="Search for local sample"
        />
        <View style={styles.buttons}>
          <Pressable
            onPress={() => setSampleType("all")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "all" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "all" ? colors.white : colors.black }}>All</Text>
          </Pressable>
          <Pressable
            onPress={() => setSampleType("local")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "local" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "local" ? colors.white : colors.black }}>
              Default
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSampleType("recorded")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "recorded" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "recorded" ? colors.white : colors.black }}>
              Recorded
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSampleType("external")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "external" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "external" ? colors.white : colors.black }}>
              External
            </Text>
          </Pressable>
        </View>
      </View>
      <ScrollView>
        {filtredSample.map((m) => (
          <SamplePreview key={m.id} sample={m} onPress={handleSamplePress} />
        ))}
      </ScrollView>
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

export default SampleList;
