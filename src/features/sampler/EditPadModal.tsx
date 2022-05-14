import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../../config/colors";

interface Props {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPadModal: FC<Props> = ({ visibility = false, setVisibility }) => {
  return (
    <Modal statusBarTranslucent={true} animationType="slide" visible={visibility}>
      <SafeAreaView>
        <View style={styles.modalView}>
          <Pressable onPress={() => setVisibility(false)} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={44} color="black" />
          </Pressable>
          <View>
            <Text>Chose media type you want to query</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    flexGrow: 1,
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },

  closeButton: {
    right: 10,
    marginLeft: "auto",
  },

  text: {
    color: colors.white,
  },
});

export default EditPadModal;
