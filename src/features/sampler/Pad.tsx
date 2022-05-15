import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import EditPadModal from "./EditPadModal";
import { getSampleById, Pad } from "./sampleSlice";

interface Props {
  pad: Pad;
}

const PadPreview: FC<Props> = ({ pad }) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [showModal, setShowModal] = useState(false);
  const sample = useAppSelector(getSampleById(pad.id));
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
      <Pressable
        style={styles.pad}
        onPress={() => playSound(sample.uri)}
        onLongPress={() => setShowModal(true)}
      ></Pressable>
      <EditPadModal pad={pad} sample={sample} visibility={showModal} setVisibility={setShowModal} />
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

export default PadPreview;
