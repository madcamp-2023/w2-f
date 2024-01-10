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

export default function PostEdit({ route }) {
  const { id, title, price, body, location, due, image } = route.params;

  const navigation = useNavigation();

  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newBody, setNewBody] = useState("");
  const [newImage, setNewImage] = useState(image);
  const [newDate, setNewDate] = useState(null);
  const [newtime, setNewTime] = useState(null); // 날짜 상태
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
    const due = combineDateTime(newDate, newtime);

    setPostRefresh((prev) => !prev);
    navigation.goBack();
    await axios
      .patch(URI + "/post", {
        id: id,
        image: newImage,
        title: newTitle,
        body: newBody,
        location: newLocation,
        price: newPrice,
        due: due,
      })
      .then(() => {
        setPostRefresh((prev) => !prev);
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
    setNewImage(uri);
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={image ? { uri: newImage } : DefaultImage}
            style={styles.image}
          />
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>제목</Text>
              <TextInput
                onChangeText={setNewTitle}
                value={newTitle}
                placeholder={title}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>가격</Text>
              <TextInput
                onChangeText={setNewPrice}
                value={String(newPrice)}
                placeholder={String(price)}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>자세한 설명</Text>
              <TextInput
                onChangeText={setNewBody}
                value={newBody}
                placeholder={body}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20 }}>
              <Text style={{ marginBottom: 10 }}>거래 희망 장소</Text>
              <TextInput
                onChangeText={setNewLocation}
                value={newLocation}
                placeholder={location}
                style={{ borderColor: gray_color, borderWidth: 1, padding: 10 }}
              />
            </View>
            <View style={{ padding: 20, flexDirection: "row" }}>
              <Text>마감 기한 선택</Text>
            </View>
            <PostDatePicker handleDate={setNewDate} handleTime={setNewTime} />

            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                flex: 1,
                backgroundColor: "#5892FF",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>수정하기</Text>
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
