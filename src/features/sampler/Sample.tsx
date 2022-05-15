import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { isSampleInStore, removeSampleFromList, Sample } from "./sampleSlice";

interface Props {
  sample: Sample;
  onPress?: (sample: Sample) => void;
}

const SamplePreview: FC<Props> = ({ sample, onPress }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const dispath = useAppDispatch();
  const [freesoundUri, setFreesoundUri] = useState("");
  const sampleInStore = useAppSelector(isSampleInStore(sample.id));

  useEffect(() => {
    if (sample.type === "external") {
      fetch(
        `https://freesound.org/apiv2/sounds/${sample.id}/?token=bbuumiZWaZ8jpJyjyFqiGxpYZmfocpy7cnzREzmL`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.previews) return;
          setFreesoundUri(data.previews["preview-hq-mp3"]);
        });
    }
  }, [sample]);

  async function playSound(uri: AVPlaybackSource | string) {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (typeof uri === "string") {
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
    <Pressable
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress(sample);
        }
      }}
    >
      <Text>{sample.name}</Text>
      {(sample.type === "external" || sample.type === "recorded") && sampleInStore ? (
        <Pressable
          onPress={() => dispath(removeSampleFromList(sample.id))}
          style={{ marginLeft: "auto", marginRight: 20 }}
        >
          <AntDesign name="delete" size={24} color={colors.primary} />
        </Pressable>
      ) : (
        <></>
      )}
      <Pressable onPress={() => (freesoundUri ? playSound(freesoundUri) : playSound(sample.uri))}>
        <AntDesign name="playcircleo" size={24} color="black" />
      </Pressable>
    </Pressable>
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
