import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
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
}) => {
  const navigation = useNavigation();
  const user = useRecoilValue(userState);

  console.log(
    "PostItem",
    id,
    user_id,
    image,
    title,
    content,
    price,
    location,
    due,
    prev
  );

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
            image,
          });
        }
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={styles.postImage}
      />
      <View style={styles.post}>
        <View style={styles.postCotent__left}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postContent}>{content}</Text>
          <Text style={styles.postPrice}>{price}</Text>
        </View>
        <View style={styles.postContent__right}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.due}>{due}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#ffffff",
  },
  postImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  post: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postCotent__left: {
    flexDirection: "column",
  },
  postContent__right: {
    flexDirection: "column",
  },
});
