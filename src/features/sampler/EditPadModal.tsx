import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import SamplePreview from "./Sample";
import { getSampleList, Pad, Sample, updatePad } from "./sampleSlice";

interface Props {
  pad: Pad;
  sample: Sample;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPadModal: FC<Props> = ({ visibility = false, setVisibility, sample, pad }) => {
  const dispatch = useAppDispatch();
  const [innerModalVisibility, setInnerModalVisibility] = useState(false);
  const samples = useAppSelector(getSampleList);

  const setPad = (sample: Sample) => {
    dispatch(updatePad({ ...pad, id: sample.id }));
    setVisibility(false);
    setInnerModalVisibility(false);
  };
  return (
    <Modal statusBarTranslucent={true} animationType="slide" visible={visibility}>
      <Screen>
        <View style={styles.header}>
          <Text style={styles.text}>Chosen sample is {sample.name}</Text>
          <Pressable onPress={() => setVisibility(false)} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={33} color="black" />
          </Pressable>
        </View>
        <View>
          <Pressable onPress={() => setInnerModalVisibility(true)}>
            <View style={styles.header}>
              <Text>Change the sample</Text>
              <Entypo name="chevron-with-circle-down" size={28} color="black" />
            </View>
          </Pressable>
          <Modal visible={innerModalVisibility} animationType="slide">
            <Screen>
              <View style={[styles.header, { marginBottom: 16, marginTop: 0, borderTopWidth: 0 }]}>
                <Text>Tap on Sample's name to chose</Text>
                <Pressable onPress={() => setInnerModalVisibility(false)}>
                  <Ionicons name="close-circle-outline" size={34} color="black" />
                </Pressable>
              </View>
              <FlatList
                data={samples}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable onPress={() => setPad(item)}>
                    <SamplePreview sample={item} />
                  </Pressable>
                )}
              />
            </Screen>
          </Modal>
        </View>
      </Screen>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderColor: colors.gray,
    borderBottomWidth: 1,
    padding: 16,
  },
  text: {
    fontWeight: "bold",
  },
  closeButton: { marginRight: -3 },
});

export default EditPadModal;
