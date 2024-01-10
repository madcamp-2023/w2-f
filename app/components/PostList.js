import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from "axios";

import PostItem from "./PostItem";

import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import {
  postRefreshState,
  postStatusState,
  selectedLocationState,
} from "../recoil/recoil";
import LoadingScreen from "../screens/LoadingScreen";

export default function PostList() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const postRefresh = useRecoilValue(postRefreshState);
  const postStatus = useRecoilValue(postStatusState);

  const selectedLocation = useRecoilValue(selectedLocationState);

  const [isLoading, setisLoading] = useState(true);

  const onRefresh = async () => {
    setisLoading(true);
    if (!refreshing) {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);
      setData(response);
      setisLoading(false);
    }
  };

  useEffect(() => {
    const getPostList = async (_) => {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);
      setData(response);
    };

    getPostList();
    setisLoading(false);
  }, [postRefresh]);

  useEffect(() => {
    if (data) {
      let sortedData;
      switch (postStatus) {
        case "new":
          sortedData = [...data].sort(
            (a, b) => new Date(b.created_time) - new Date(a.created_time)
          );
          break;
        case "price":
          sortedData = [...data].sort((a, b) => b.price - a.price);
          break;
        case "due":
          sortedData = [...data].sort(
            (a, b) => new Date(a.due) - new Date(b.due)
          );
          break;
        default:
          sortedData = data;
      }
      setData(sortedData);
    }
  }, [postStatus]);

  const filteredData = data?.filter((item) => {
    if (selectedLocation === "전체") {
      return true;
    }
    return item.label === selectedLocation;
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => {
        const {
          id,
          user_id,
          title,
          body,
          price,
          location,
          due,
          image,
          user_name,
          created_time,
          chat_number,
        } = item;

        return (
          <PostItem
            id={id}
            user_id={user_id}
            image={image}
            title={title}
            content={body}
            price={price}
            user_name={user_name}
            location={location}
            due={due}
            created_time={created_time}
            chat_number={chat_number}
            prev="PostHome"
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
