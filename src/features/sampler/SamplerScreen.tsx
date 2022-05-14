import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import Pad from "./Pad";
import { getSampleList } from "./sampleSlice";

const SamplerScreen: FC = (props) => {
  const samples = useAppSelector(getSampleList);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.pads}>
          {samples.map((m) => (
            <Pad key={m.id} sample={m}></Pad>
          ))}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  pads: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: colors.gray,
    margin: 10,
    borderRadius: 16,
  },
});

export default SamplerScreen;
