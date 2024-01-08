import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import AntDesgin from "react-native-vector-icons/AntDesign";

import PostList from "../components/PostList";
import { useState } from "react";
import PostMap from "../components/PostMap";
import Dropdown from "../components/Dropdown";
import DropdownLocation from "../components/DropdownLocation";

import Avatar from "../assets/avatar6.png";

export default function PostScreen() {
  const navigation = useNavigation();
  const [nav, setNav] = useState("Feed");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header__location}>
          <DropdownLocation />
        </View>
      </View>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text} onPress={() => setNav("Feed")}>
              목록
            </Text>
            <Text style={styles.text} onPress={() => setNav("Map")}>
              지도
            </Text>
          </View>

          <View>
            <Dropdown />
          </View>
        </View>

        <View style={styles.banner}>
          <Text>
            언제든지{" "}
            <Text
              style={{
                color: "blue",
              }}
            >
              불러
            </Text>{" "}
            주세요.
          </Text>
          <Image source={Avatar} style={styles.image} />
        </View>
        <View style={styles.post__main}>
          {nav === "Feed" ? <PostList /> : <PostMap />}

          {/* //TODO : navigate : createPost */}
          <TouchableOpacity
            style={styles.createPost}
            onPress={() => navigation.navigate("PostCreate")}
          >
            <AntDesgin
              name="pluscircleo"
              size={40}
              color="#000"
              style={{ backgroundColor: "white", borderRadius: 30 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
  },

  header__location: {
    flex: 1,
    flexDirection: "row",
  },

  header__location__text: {
    marginRight: 10,
  },

  header__location__select: {
    marginLeft: 10,
  },

  image: {
    height: "100%",
    resizeMode: "contain",
    width: 70,
    height: 70,
  },

  post: {
    flex: 1,
    flexDirection: "column",
  },

  post__header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    zIndex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },

  post__main: {
    flex: 1,
    flexDirection: "column",
  },

  text: {
    padding: 10,
  },

  dropdownContainer: {
    width: 100,
    height: 40,
    zIndex: 1000,
    elevation: 1000,
  },

  createPost: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000,
    elevation: 1000,
  },

  banner: {
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
