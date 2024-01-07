import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { postRefreshState, userState } from "../recoil/recoil";
import PostItem from "../components/PostItem";
import { URI } from "../recoil/constant";

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState(null);

  const user = useRecoilValue(userState);

  const handlePress = () => {
    navigation.navigate("ProfileEdit");
  };

  const postRefrsh = useRecoilValue(postRefreshState);

  useEffect(() => {
    const getPostList = async (_) => {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);

      const selectedResponse = response.filter((post) => {
        if (post.user_id === user.id) {
          return post;
        }
      });

      setData(selectedResponse);
    };

    getPostList();
  }, [postRefrsh]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profile} onPress={handlePress}>
        <Text style={{ marginRight: 20 }}>{user.name}</Text>
        <Image
          source={{
            uri: user.image,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <Text style={styles.text}>내가 올린 글</Text>
          {/* <Text style={styles.text}>내가 좋아하는 글</Text> */}
        </View>
        <View style={styles.post__main}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            style={styles.container}
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profile: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 30,
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 20,
  },

  post: {
    flex: 1,
    flexDirection: "column",
  },

  post__header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  post__main: {
    flex: 1,
    flexDirection: "column",
  },

  text: {
    padding: 10,
  },
});
