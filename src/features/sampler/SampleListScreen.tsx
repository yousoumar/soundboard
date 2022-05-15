import React, { FC, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Input from "../../components/Input";
import Screen from "../../components/Screen";
import SamplePreview from "./Sample";
import { getFiltredSampleList } from "./sampleSlice";

interface Props {}

const SampleListScreen: FC<Props> = (props) => {
  const [searchText, setSearchText] = useState("");
  const samples = useAppSelector(getFiltredSampleList(searchText));

  return (
    <Screen>
      <View style={styles.topbar}>
        <Input
          value={searchText}
          onValueChange={(value: string) => setSearchText(value)}
          placeholder="Search for sample"
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

  topbar: {
    marginBottom: 16,
  },
});

export default SampleListScreen;
