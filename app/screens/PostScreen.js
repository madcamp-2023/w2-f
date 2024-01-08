import { useState } from "react";
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
import PostMap from "../components/PostMap";
import Dropdown from "../components/Dropdown";
import Banner from "../assets/banner.png";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

export default function PostScreen() {
  const navigation = useNavigation();
  const [nav, setNav] = useState("Feed");

  const user = useRecoilValue(userState);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header__location}>
          <TouchableOpacity
            onPress={() => {
              console.log("TODO");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, marginRight: 10 }}>N1</Text>
              <AntDesgin name="down" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.post}>
        <View style={styles.post__header}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={nav === "Feed" ? styles.selectedText : styles.text}
              onPress={() => setNav("Feed")}
            >
              목록
            </Text>
            <Text
              style={nav === "Map" ? styles.selectedText : styles.text}
              onPress={() => setNav("Map")}
            >
              지도
            </Text>
          </View>

          <View>
            <Dropdown />
          </View>
        </View>

        <Image source={Banner} style={{ width: "100%", height: 100 }} />
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
    paddingLeft: 15,
    justifyContent: "space-between",
  },

  post__main: {
    flex: 1,
    flexDirection: "column",
  },

  selectedText: {
    padding: 5,
    borderBottomWidth: 4,
    borderBottomColor: "black",
    paddingBottom: 5,
    marginRight: 5,
  },

  text: {
    padding: 5,
    marginRight: 5,
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
