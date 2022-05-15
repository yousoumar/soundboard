import { Ionicons } from "@expo/vector-icons";
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
import SampleList from "./SampleList";
import SamplePreview from "./SamplePreview";
import { addSampleToList, Pad, Sample, updatePad } from "./sampleSlice";
interface Props {
  pad: Pad;
  sample: Sample;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const PadEditModal: FC<Props> = ({ visibility = false, setVisibility, sample, pad }) => {
  const dispatch = useAppDispatch();

  const [sampleName, setSampleName] = useState("");
  const [timer, setTimer] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [sampleType, setSampleType] = useState<"local" | "api" | "record">("local");
  const { data, isFetching } = useGetSoundWithSearchKeywordQuery(searchInputValue, {
    skip: searchInputValue === "",
  });

  const setPad = (sample: Sample) => {
    dispatch(updatePad({ ...pad, id: sample.id }));
    dispatch(addSampleToList(sample));
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
          <View>
            <Text>Chosen sample for this pad is {sample.name}.</Text>
            <Text>Tape on a sample to change it, or record.</Text>
          </View>
          <Pressable onPress={() => setVisibility(false)}>
            <Ionicons name="close-circle-outline" size={40} color="black" />
          </Pressable>
        </View>

        <View style={styles.buttons}>
          <Pressable
            onPress={() => setSampleType("local")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "local" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "local" ? colors.white : colors.black }}>
              Local
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSampleType("api")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "api" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "api" ? colors.white : colors.black }}>
              Freesound
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSampleType("record")}
            style={{
              ...styles.button,
              backgroundColor: sampleType == "record" ? colors.black : colors.gray,
            }}
          >
            <Text style={{ color: sampleType == "record" ? colors.white : colors.black }}>
              Record
            </Text>
          </Pressable>
        </View>

        {sampleType == "local" ? (
          <>
            <SampleList handleSamplePress={setPad} />
          </>
        ) : (
          <></>
        )}

        {sampleType === "api" ? (
          <>
            <Input
              value={searchInputValue}
              onValueChange={(value) => setSearchInputValue(value)}
              placeholder="Search for sample from Freesound API"
            />
            {isFetching ? (
              <ActivityIndicator style={{ marginTop: 30 }} />
            ) : (
              <>
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
              </>
            )}
          </>
        ) : (
          <></>
        )}

        {sampleType === "record" ? (
          <>
            {!recording ? (
              <View>
                <Input
                  value={sampleName}
                  onValueChange={(value) => setSampleName(value)}
                  placeholder="Enter sample name to start recording"
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
          </>
        ) : (
          <></>
        )}
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
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 16,
    borderColor: colors.gray,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
});

export default PadEditModal;
