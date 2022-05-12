import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import SamplePreview from "./Sample";
import { getSampleList } from "./sampleSlice";
import Topbar from "./Topbar";

interface Props {}

const SampleListScreen: FC<Props> = (props) => {
  const samples = useAppSelector(getSampleList);

  return (
    <Screen>
      <Topbar />
      <ScrollView>
        <View>
          {samples.map((m) => (
            <SamplePreview key={m.id} sample={m} />
          ))}
        </View>
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
});

export default SampleListScreen;
