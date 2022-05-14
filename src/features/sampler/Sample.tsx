import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import Pad from "./Pad";
import { Sample } from "./sampleSlice";

interface Props {
  sample: Sample;
}

const SamplePreview: FC<Props> = ({ sample }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  async function playSound(uri: AVPlaybackSource) {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(uri);
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{sample.name}</Text>
      <Pad sample={sample} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.gray,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  pad: {
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 16,
  },
  text: {
    paddingLeft: 10,
    fontWeight: "bold",
  },
});

export default SamplePreview;
