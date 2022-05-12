import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
import { Sample } from "../sample/sampleSlice";
import Pad from "./Pad";

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
      <Pad sample={sample} />

      <Text style={styles.text}>{sample.name}</Text>
      <Pressable>
        <Ionicons name="add-circle-outline" size={64} color={colors.black} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pad: {
    backgroundColor: colors.primary,
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 16,
  },
  text: {
    fontWeight: "900",
  },
});

export default SamplePreview;
