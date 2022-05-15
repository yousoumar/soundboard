import { AntDesign } from "@expo/vector-icons";
import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { useGetSoundByIdQuery } from "../../services/freesound";
import { isSampleInStore, removeSampleFromList, Sample } from "./sampleSlice";
import { useSoundContext } from "./soundContext";

interface Props {
  sample: Sample;
  onPress?: (sample: Sample) => void;
}

const SamplePreview: FC<Props> = ({ sample, onPress }) => {
  const dispath = useAppDispatch();
  const [freesoundUri, setFreesoundUri] = useState("");
  const sampleInStore = useAppSelector(isSampleInStore(sample.id));
  const { sound, playSound } = useSoundContext()!;
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
    <Pressable
      style={styles.container}
      onPress={() => {
        if (onPress) {
          console.log("hi");
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
