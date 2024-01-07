import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import axios from "axios";

import PostItem from "./PostItem";

import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import { postRefreshState } from "../recoil/recoil";

export default function PostList() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  const postRefresh = useRecoilValue(postRefreshState);

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
    };

    getPostList();
  }, [postRefresh]);

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
        const {
          id,
          user_id,
          title,
          body,
          price,
          location,
          due,
          created_time,
          image,
        } = item;
        console.log(
          "!!!!",
          id,
          user_id,
          title,
          body,
          price,
          location,
          due,
          created_time,
          image
        );
        return (
          <PostItem
            id={id}
            user_id={user_id}
            image={image}
            title={title}
            content={body}
            price={price}
            location={location}
            due={due}
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
