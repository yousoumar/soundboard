import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../config/colors";
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
      <Text>{sample.name}</Text>
      <Pressable onPress={() => playSound(sample.uri)}>
        <AntDesign name="playcircleo" size={24} color="black" />
      </Pressable>
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
    borderRadius: 25,
    padding: 16,
  },
});

export default SamplePreview;
