import { useRecoilValue } from "recoil";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";

import { userState } from "../recoil/recoil";

const PostItem = ({
  id,
  user_id,
  image,
  title,
  content,
  price,
  location,
  due,
  prev,
  chat_number,
}) => {
  const navigation = useNavigation();
  const user = useRecoilValue(userState);

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
        console.log(user.id, user_id);
        if (user && user.id === user_id) {
          navigation.navigate("MyPostDetail", {
            id,
            user_id,
            title,
            content,
            price,
            location,
            due,
            image,
            chat_number,
            prev,
          });
        } else {
          navigation.navigate("PostDetail", {
            id,
            user_id,
            title,
            content,
            price,
            location,
            due,
            chat_number,
            image,
          });
        }
      }}
    >
      <View style={styles.post}>
        <View style={styles.postContent__header}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postPrice}>$ {price}</Text>
        </View>
        <Text style={styles.postContent}>{content}</Text>
        <View style={styles.postFooter}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Entypo name="location-pin" size={20} />
            <Text>{location}</Text>
          </View>
          <Text>{due}</Text>
        </View>
        <View style={styles.postContent__right}></View>
      </View>
    </TouchableOpacity>
  );
};
// location-pin
export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#474747",
  },

  post: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },

  postTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },

  postContent__header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  postContent: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    color: "#525252",
  },

  postPrice: {
    marginLeft: 10,
    color: "blue",
  },

  postCotent__left: {
    flex: 1,
    flexDirection: "column",
  },

  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
