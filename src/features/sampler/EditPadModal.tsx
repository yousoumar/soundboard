import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAppDispatch } from "../../app/hooks/hooks";
import Input from "../../components/Input";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import { useGetSoundWithSearchKeywordQuery } from "../../services/freesound";
import SamplePreview from "./Sample";
import SampleList from "./SampleList";
import { addSampleToList, Pad, Sample, updatePad } from "./sampleSlice";
interface Props {
  pad: Pad;
  sample: Sample;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPadModal: FC<Props> = ({ visibility = false, setVisibility, sample, pad }) => {
  const dispatch = useAppDispatch();
  const [selectModalVisibility, setSelectModalVisibility] = useState(false);
  const [apiModalVisibility, setApiModalVisibility] = useState(false);
  const [recordModalVisibility, setRecordModalVisibility] = useState(false);
  const [sampleName, setSampleName] = useState("");
  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [searchInputValue, setSearchInputValue] = useState("");
  const { data, isFetching } = useGetSoundWithSearchKeywordQuery(searchInputValue, {
    skip: searchInputValue === "",
  });

  const setPad = (sample: Sample) => {
    dispatch(updatePad({ ...pad, id: sample.id }));
    dispatch(addSampleToList(sample));
    setSelectModalVisibility(false);
    setRecordModalVisibility(false);
    setApiModalVisibility(false);
    setVisibility(false);
    setSearchInputValue("");
    setSampleName("");
  };

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      const result = await Audio.requestPermissionsAsync();
      if (!result.granted) {
        return Alert.alert("You cannot record. Please set your permissions settings");
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
      recording.setOnRecordingStatusUpdate((status) => {
        setTimer(status.durationMillis);
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI()!;
    const sample: Sample = { id: Date.now().toString(), name: sampleName, uri, type: "recorded" };
    dispatch(addSampleToList(sample));
    setPad(sample);
    console.log("Recording stopped and stored at", uri);
  }
  return (
    <Modal statusBarTranslucent={true} animationType="slide" visible={visibility}>
      <Screen>
        <View style={styles.header}>
          <Text style={styles.text}>Chosen sample for this pad is {sample.name}</Text>
          <Pressable onPress={() => setVisibility(false)}>
            <Ionicons name="close-circle-outline" size={33} color="black" />
          </Pressable>
        </View>

        <Pressable onPress={() => setSelectModalVisibility(true)}>
          <View style={styles.header}>
            <Text>Select sample from your local library</Text>
            <Entypo
              name="chevron-with-circle-down"
              size={28}
              color="black"
              style={{ marginRight: 2 }}
            />
          </View>
        </Pressable>
        <Pressable onPress={() => setApiModalVisibility(true)}>
          <View style={styles.header}>
            <Text>Get a sample from Freesound</Text>

            <MaterialCommunityIcons name="web" size={28} color="black" style={{ marginRight: 2 }} />
          </View>
        </Pressable>
        <Pressable onPress={() => setRecordModalVisibility(true)}>
          <View style={styles.header}>
            <Text>Recond a new sample</Text>
            <FontAwesome5
              name="creative-commons-sampling"
              size={28}
              color="black"
              style={{ marginRight: 2 }}
            />
          </View>
        </Pressable>
        <Modal visible={selectModalVisibility} animationType="slide">
          <Screen>
            <View style={[styles.header, { marginBottom: 16, marginTop: 0, borderTopWidth: 0 }]}>
              <Text>Tap on Sample's name to chose</Text>
              <Pressable onPress={() => setSelectModalVisibility(false)}>
                <Ionicons name="close-circle-outline" size={34} color="black" />
              </Pressable>
            </View>
            <SampleList handleSamplePress={setPad} />
          </Screen>
        </Modal>

        <Modal visible={apiModalVisibility} animationType="slide">
          <Screen>
            <View style={[styles.header, { marginBottom: 16, marginTop: 0, borderTopWidth: 0 }]}>
              <Text>Tap on Sample's name to chose</Text>
              <Pressable onPress={() => setApiModalVisibility(false)}>
                <Ionicons name="close-circle-outline" size={34} color="black" />
              </Pressable>
            </View>
            <Input
              value={searchInputValue}
              onValueChange={(value) => setSearchInputValue(value)}
              placeholder="Search for samle from Freesound API"
            />
            {isFetching ? (
              <ActivityIndicator style={{ marginTop: 30 }} />
            ) : (
              <FlatList
                style={{ marginTop: 16 }}
                data={data?.results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <SamplePreview
                    onPress={setPad}
                    sample={{
                      id: item.id.toString(),
                      uri: item.name,
                      type: "external",
                      name: item.username,
                    }}
                  />
                )}
              />
            )}
          </Screen>
        </Modal>
        <Modal visible={recordModalVisibility} animationType="slide">
          <Screen>
            <View style={[styles.header, { marginBottom: 16, marginTop: 0, borderTopWidth: 0 }]}>
              <Text>Record a new song</Text>
              <Pressable onPress={() => setRecordModalVisibility(false)}>
                <Ionicons name="close-circle-outline" size={34} color="black" />
              </Pressable>
            </View>
            {!recording ? (
              <View>
                <Input
                  value={sampleName}
                  onValueChange={(value) => setSampleName(value)}
                  placeholder="Enter sample name"
                />
                {sampleName !== "" ? (
                  <Pressable style={styles.recordButton} onPress={() => startRecording()}>
                    <Text style={styles.recordText}>Start recording</Text>
                  </Pressable>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <View>
                <View style={styles.recordTracker}>
                  <Text>Recording...</Text>
                  <Text style={{ fontWeight: "bold" }}>{Math.floor(timer / 1000)}s</Text>
                </View>
                <Pressable style={styles.recordButton} onPress={() => stopRecording()}>
                  <Text style={styles.recordText}>Stop and save</Text>
                </Pressable>
              </View>
            )}
          </Screen>
        </Modal>
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
    padding: 10,
  },
  text: {
    fontWeight: "bold",
  },
  recordButton: {
    backgroundColor: colors.black,
    margin: 16,
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 25,
  },
  recordText: {
    color: colors.white,
  },
  recordTracker: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});

export default EditPadModal;
