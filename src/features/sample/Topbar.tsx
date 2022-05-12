import React, { FC, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../../config/colors";

interface Props {}

const Topbar: FC<Props> = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: colors.gray,
    padding: 16,
    borderRadius: 25,
    color: colors.black,
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Topbar;
