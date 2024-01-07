import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

import LabelInput from "./LabelInput";
import PostDatePicker from "./PostDatePicker";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";

export default function PostCreate() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [body, setBody] = useState("");
  const [image, setImage] = useState(
    "https://github.com/haejunejung/haejunejung.github.io/assets/99087502/d2817771-d076-4012-af8d-b2bd9330eea7"
  );
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null); // 날짜 상태
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const user = useRecoilValue(userState);

  const [postRefresh, setPostRefresh] = useRecoilState(postRefreshState);

  const handleSubmit = async () => {
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

    //TODO : 한 개라도 안적거나 선택안하면 경고창
    await axios
      .post(URI + "/post/create", {
        image: image,
        title: title,
        body: body,
        location: location,
        price: price,
        user_id: user.id,
        user_name: user.name,
        user_image: user.image,
        due: due,
      })
      .then(() => {
        setPostRefresh((prev) => !prev);
        navigation.navigate("PostHome");
      });
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
    setImage(uri);

    console.log(uri);
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
            <Image source={{ uri: image }} style={styles.image} />
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
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력하세요."
          />
          <LabelInput
            label="위치"
            value={location}
            onChangeText={setLocation}
            placeholder="위치를 입력하세요."
          />
          <LabelInput
            label="가격"
            value={price}
            onChangeText={setPrice}
            placeholder="가격을 입력하세요."
          />
          <PostDatePicker handleDate={setDate} handleTime={setTime} />
          <LabelInput
            label="내용"
            value={body}
            onChangeText={setBody}
            placeholder="내용을 입력하세요."
          />
          <Button title="추가하기" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    right: 20,
    bottom: 20,
  },
});
