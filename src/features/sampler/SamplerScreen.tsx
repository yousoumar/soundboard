import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import Pad from "./Pad";
import { getPadList } from "./sampleSlice";

const SamplerScreen: FC = () => {
  const padList = useAppSelector(getPadList);
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.pads}>
          {padList.map((p) => (
            <Pad key={p.index} pad={p}></Pad>
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
