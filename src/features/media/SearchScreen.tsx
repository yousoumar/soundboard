import React, { FC, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useAppSelector } from "../../app/hooks/hooks";
import Screen from "../../components/Screen";
import { useGetMediaBySearchKeywordQuery } from "../../services/media";
import EmptyListMessage from "./EmptyListMessage";
import MediaPreview from "./MediaPreview";
import { getFilter, Media } from "./mediaSlice";
import Topbar from "./Topbar";

const SearchScreen: FC = () => {
  const [searchText, setSearchText] = useState("");
  const filter = useAppSelector(getFilter);
  const [mediaList, setMediaList] = useState<Media[]>([]);

  const { data, isFetching } = useGetMediaBySearchKeywordQuery(
    searchText ? `term=${searchText}&media=${filter}` : ""
  );

  useEffect(() => {
    if (data) {
      setMediaList(data.results);
    }
  }, [data]);

  return (
    <Screen>
      <Topbar
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder={`Search for ${filter}s from iTunes`}
      />
      <FlatList
        data={mediaList}
        renderItem={({ item }) => <MediaPreview media={item} />}
        keyExtractor={(item) => JSON.stringify(item)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() =>
          searchText ? (
            <EmptyListMessage message={isFetching ? "Loading..." : "No matching result :)"} />
          ) : (
            <EmptyListMessage
              message={`Search for musics and podcasts. Chosen media type is "${filter}".`}
            />
          )
        }
      />
    </Screen>
  );
};

export default SearchScreen;
