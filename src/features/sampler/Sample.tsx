import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { removeSampleFromList, Sample } from "./sampleSlice";

interface Props {
  sample: Sample;
}

const SamplePreview: FC<Props> = ({ sample }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const dispath = useAppDispatch();
  async function playSound(uri: AVPlaybackSource | string) {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (typeof uri == "string") {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(uri);
      setSound(sound);
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text>{sample.name}</Text>
      {sample.type === "external" || sample.type === "recorded" ? (
        <Pressable
          onPress={() => dispath(removeSampleFromList(sample.id))}
          style={{ marginLeft: "auto", marginRight: 20 }}
        >
          <AntDesign name="delete" size={24} color={colors.primary} />
        </Pressable>
      ) : (
        <></>
      )}
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
