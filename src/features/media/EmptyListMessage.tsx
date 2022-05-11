import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  message: string;
}

const EmptyListMessage: FC<Props> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    textAlign: "center",
  },
});

export default EmptyListMessage;
