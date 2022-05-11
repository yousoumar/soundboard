import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../../config/colors";
import Filter from "./Filter";

interface Props {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const Topbar: FC<Props> = ({ searchText, setSearchText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.black}
        style={styles.input}
        placeholder={placeholder}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Filter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  input: {
    backgroundColor: colors.gray,
    padding: 10,
    borderRadius: 25,
    color: colors.black,
    flex: 1,
    marginHorizontal: 10,
  },
});

export default Topbar;
