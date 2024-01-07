import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from "axios";

import PostItem from "./PostItem";

import { URI } from "../recoil/constant";

export default function PostList() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const onRefresh = async () => {
    if (!refreshing) {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);
      setData(response);
    }
  };

  const getData = async () => {
    const response = await axios
      .get(URI + "/post")
      .then((response) => response.data);
    setData(response);
  };

  const onEndReached = () => {
    // if (!loading) {
    //   getData();
    // }
  };

  useEffect(() => {
    const getPostList = async (_) => {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);
      setData(response);

      console.log(response);
    };

    getPostList();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
      renderItem={({ item }) => {
        const { title, content, price, location, timestamp } = item;
        return (
          <PostItem
            title={title}
            content={content}
            price={price}
            location={location}
            timestamp={timestamp}
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
