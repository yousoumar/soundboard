import React, { FC, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import colors from "../../config/colors";
import SamplePreview from "./Sample";
import { getFiltredSampleList } from "./sampleSlice";

interface Props {}

const SampleListScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const samples = useAppSelector(getFiltredSampleList(searchText));

  return (
    <Screen>
      <View style={styles.topbar}>
        <TextInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor={colors.black}
          style={styles.input}
          placeholder={"Search for sample"}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <ScrollView>
        <View>
          {samples.map((m) => (
            <SamplePreview key={m.id} sample={m} />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    backgroundColor: colors.gray,
    padding: 16,
    borderRadius: 25,
    color: colors.black,
    flex: 1,
    marginHorizontal: 10,
  },
  topbar: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
});

export default SampleListScreen;
