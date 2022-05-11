import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC } from "react";
import { Image, Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks/hooks";
import { RootState } from "../../app/store";
import colors from "../../config/colors";
import {
  addMediaToList,
  getMediaList,
  Media,
  removeMediaFromList,
  setPlayingMedia,
} from "./mediaSlice";

interface Props extends PressableProps {
  media: Media;
}

const MediaPreview: FC<Props> = ({ media }) => {
  const dispatch = useAppDispatch();
  const mediaList = useAppSelector(getMediaList);
  const playingMedia = useAppSelector((state: RootState) => state.media.playingMedia);

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.img} source={{ uri: media.artworkUrl100 }} />
        {playingMedia?.trackId === media.trackId ? (
          <View style={styles.playingIcon}>
            <Entypo name="bar-graph" size={24} color="white" />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.text}>
        {media.trackName.length > 30 ? media.trackName.substring(0, 27) + "..." : media.trackName}
      </Text>
      <View style={styles.buttons}>
        {JSON.stringify(playingMedia) !== JSON.stringify(media) && media.kind == "song" ? (
          <Pressable
            style={styles.leftButton}
            onPress={() => dispatch(setPlayingMedia({ ...media }))}
          >
            <AntDesign name="playcircleo" size={24} color={colors.black} />
          </Pressable>
        ) : (
          <></>
        )}
        {mediaList.find((m: Media) => JSON.stringify(m) === JSON.stringify(media)) ? (
          <Pressable onPress={() => dispatch(removeMediaFromList(media))}>
            <MaterialCommunityIcons name="delete-circle-outline" size={26} color="black" />
          </Pressable>
        ) : (
          <Pressable onPress={() => dispatch(addMediaToList(media))}>
            <AntDesign name="pluscircle" size={24} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: colors.gray,
    borderBottomWidth: 1,
  },
  text: {
    marginLeft: 10,
  },
  img: {
    backgroundColor: colors.gray,
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  buttons: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  leftButton: {
    marginRight: 20,
  },
  playingIcon: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default MediaPreview;
