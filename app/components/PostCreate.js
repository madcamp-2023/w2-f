import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Button,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

import LabelInput from "./LabelInput";
import PostDatePicker from "./PostDatePicker";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";

import DefaultImage from "../assets/defaultImage.png";
import { blue_color, gray_color } from "../recoil/color";

export default function PostCreate() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
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
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image
              source={image ? { uri: image } : DefaultImage}
              style={styles.image}
            />
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>제목</Text>
              <TextInput
                onChangeText={setTitle}
                value={title}
                placeholder={"제목"}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>가격</Text>
              <TextInput
                onChangeText={setPrice}
                value={String(price)}
                placeholder={"₩ 가격을 입력해주세요."}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>자세한 설명</Text>
              <TextInput
                onChangeText={setBody}
                value={body}
                placeholder={"게시글 내용을 작성해주세요."}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>거래 희망 장소</Text>
              <TextInput
                onChangeText={setLocation}
                value={location}
                placeholder={"위치 추가"}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log("1");
              }}
              style={{ padding: 20 }}
            >
              <Text>마감 기한 선택 {">"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                flex: 1,
                backgroundColor: "#99CCFF",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>업로드하기</Text>
            </TouchableOpacity>
          </ScrollView>
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
    width: 150,
    height: 150,
    marginBottom: 30,
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
