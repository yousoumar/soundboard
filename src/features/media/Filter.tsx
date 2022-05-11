import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { FC, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, ViewProps } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import colors from "../../config/colors";
import { changeFilter, getFilter } from "./mediaSlice";

interface Props extends ViewProps {}

const Filter: FC<Props> = ({ style }) => {
  const filter = useAppSelector(getFilter);
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={() => setModalVisible((modalVisible) => !modalVisible)}>
        <Ionicons name="list-circle-outline" size={44} color="black" />
      </Pressable>
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible((modalVisible) => !modalVisible)}
              style={styles.closeButton}
            >
              <Ionicons name="close-circle-outline" size={44} color="black" />
            </Pressable>
            <View>
              <Text>Chose media type you want to query</Text>
              <Pressable
                onPress={() => {
                  dispatch(changeFilter("music"));
                  setModalVisible(false);
                }}
                style={styles.choiceButton}
              >
                <Text style={styles.text}>Music</Text>
                {filter === "music" ? (
                  <AntDesign name="checkcircle" size={30} color="white" />
                ) : (
                  <AntDesign name="checkcircleo" size={30} color="white" />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(changeFilter("podcast"));
                  setModalVisible(false);
                }}
                style={styles.choiceButton}
              >
                <Text style={styles.text}>Podcast</Text>

                {filter === "podcast" ? (
                  <AntDesign name="checkcircle" size={30} color="white" />
                ) : (
                  <AntDesign name="checkcircleo" size={30} color="white" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalView: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: "auto",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
  },

  closeButton: {
    position: "absolute",
    right: 10,
  },
  choiceButton: {
    backgroundColor: colors.black,
    marginTop: 16,
    padding: 10,
    borderRadius: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: colors.white,
  },
});

export default Filter;
