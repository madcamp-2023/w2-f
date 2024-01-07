import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";
import { useState } from "react";
import LabelInput from "./LabelInput";
import PostDatePicker from "./PostDatePicker";

const MyPostDetail = ({ route }) => {
  const { id, user_id, title, content, price, location, due, image, prev } =
    route.params;

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newImage, setnewImage] = useState(image);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // 날짜 상태
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  console.log(
    "MyPostDetail",
    id,
    user_id,
    title,
    content,
    price,
    location,
    due,
    image,
    prev
  );

  const navigation = useNavigation();

  const user = useRecoilValue(userState);

  const [postRefresh, setPostRefresh] = useRecoilState(postRefreshState);

  const handleDeletePost = async () => {
    setPostRefresh((prev) => !prev);
    navigation.navigate(prev);
    await axios.delete(URI + "/post?id=" + id);
  };

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    const uri = result.assets[0].uri;
    setnewImage(uri);

    console.log(uri);
  };

  const handleUpdatePost = async () => {
    function combineDateTime(date, time) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    const due = combineDateTime(date, time);

    setPostRefresh((prev) => !prev);
    navigation.navigate(prev);
    await axios
      .patch(URI + "/post", {
        id: id,
        image: newImage,
        title: newTitle,
        body: newContent,
        location: newLocation,
        price: newPrice,
        due: due,
      })
      .then(() => {
        setPostRefresh((prev) => !prev);
        navigation.navigate(prev);
      });
  };

  return (
    <View>
      <View>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => navigation.navigate("PostHome")}
        />
      </View>
      <View>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image source={{ uri: newImage }} style={styles.image} />
            <FontAwesome
              name="camera"
              size={27}
              style={styles.iconOverlay}
              onPress={() => {}}
            />
          </Pressable>
        </View>
        <View>
          <LabelInput
            label="제목"
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder={title}
          />
          <LabelInput
            label="위치"
            value={newLocation}
            onChangeText={setNewLocation}
            placeholder={location}
          />
          <LabelInput
            label="가격"
            value={newPrice}
            onChangeText={setNewPrice}
            placeholder={String(price)}
          />
          <PostDatePicker handleDate={setDate} handleTime={setTime} />
          <LabelInput
            label="내용"
            value={newContent}
            onChangeText={setNewContent}
            placeholder={content}
          />
          <View style={{ position: "absolute", top: 10 }}>
            <Button
              title="수정하기"
              styles={styles.btn}
              onPress={handleUpdatePost}
            />
            <Button
              title="삭제하기"
              styles={styles.btn}
              onPress={handleDeletePost}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  header: {
    alignSelf: "flex-start",
    padding: 10,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },

  content__child: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingBottom: 20,
  },
});

export default MyPostDetail;
