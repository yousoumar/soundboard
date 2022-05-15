import React, { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../config/colors";

interface Props {
  value: string;
  onValueChange: (text: string) => void;
  placeholder: string;
}

const Input: FC<Props> = ({ value, onValueChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        placeholderTextColor={colors.black}
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    padding: 16,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  input: {
    color: colors.black,
  },
});

export default Input;
