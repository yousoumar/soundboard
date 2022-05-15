import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { useGetSoundByIdQuery } from "../../services/freesound";
import PadEditModal from "./PadEditModal";
import { getSampleById, Pad } from "./sampleSlice";
import { useSoundContext } from "./soundContext";

interface Props {
  pad: Pad;
}

const PadPreview: FC<Props> = ({ pad }) => {
  const { playSound, sound } = useSoundContext()!;
  const [showModal, setShowModal] = useState(false);
  const sample = useAppSelector(getSampleById(pad.id));
  const [freesoundUri, setFreesoundUri] = useState("");
  const { data } = useGetSoundByIdQuery(sample.id, { skip: sample.type !== "external" });

  useEffect(() => {
    if (!data?.previews) return;
    setFreesoundUri(data.previews["preview-hq-mp3"]);
  }, [data]);

  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pad}
        onPress={() => (freesoundUri ? playSound(freesoundUri) : playSound(sample.uri))}
        onLongPress={() => setShowModal(true)}
      ></Pressable>
      <PadEditModal pad={pad} sample={sample} visibility={showModal} setVisibility={setShowModal} />
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
