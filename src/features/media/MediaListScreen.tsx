import React, { FC, useState } from "react";
import { FlatList } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import EmptyListMessage from "./EmptyListMessage";
import MediaPreview from "./MediaPreview";
import { getFilter, getFiltredMediaList, getFiltredMediaWithSearch } from "./mediaSlice";
import Player from "./Player";
import Topbar from "./Topbar";

const MediaListScreen: FC = () => {
  const [searchText, setSearchText] = useState("");
  const filtredMediaList = useAppSelector(getFiltredMediaList);
  const filtredWithSearchMediaList = useAppSelector(getFiltredMediaWithSearch(searchText));
  const mediaListIsEmpty = filtredMediaList.length > 0;
  const filter = useAppSelector(getFilter);

  return (
    <Screen>
      <Topbar
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder={`Search for ${filter}s from your list`}
      />
      <FlatList
        data={filtredWithSearchMediaList}
        renderItem={({ item }) => <MediaPreview media={item} />}
        keyExtractor={(item) => JSON.stringify(item)}
        ListEmptyComponent={() => (
          <EmptyListMessage
            message={
              !mediaListIsEmpty
                ? `No media added in your local ${filter} list :(`
                : `No matching result in your local ${filter} list :(`
            }
          />
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      <Player />
    </Screen>
  );
};

export default MediaListScreen;
