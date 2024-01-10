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
  Dimensions,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import AntDesgin from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

import PostDatePicker from "./PostDatePicker";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";

import DefaultImage from "../assets/defaultImage.png";
import { gray_color } from "../recoil/color";

const screenWidth = Dimensions.get("window").width;

const LocationItem = ({ label }) => {
  return (
    <View
      style={{
        backgroundColor: "#ECECEC",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
      }}
    >
      {label && (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginRight: 10 }}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default function PostEdit({ route }) {
  const { id, title, price, body, loc, due, image } = route.params;

  const navigation = useNavigation();

  const [newTitle, setNewTitle] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newBody, setNewBody] = useState("");
  const [newImageUrl, setNewImageUrl] = useState(image);
  const [newDate, setNewDate] = useState(null);
  const [newtime, setNewTime] = useState(null); // 날짜 상태
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [location, setLocation] = useState("");
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
    navigation.navigate("PostHome");
    await axios
      .patch(URI + "/post", {
        id: id,
        image: newImageUrl,
        title: newTitle === "" ? title : newTitle,
        body: newBody === "" ? body : newBody,
        location: newLocation === "" ? loc : location,
        price: newPrice === 0 ? price : newPrice,
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
      base64: true,
    });

    if (result.canceled) {
      return null;
    }

    const base64Image = `data:image/jpeg;base64,${result.base64}`;
    setNewImageUrl(base64Image);
  };

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocation", { setLocation: setLocation });
  };

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image
              source={
                newImageUrl
                  ? {
                      uri: newImageUrl.startsWith("data:image/jpeg;base64,")
                        ? newImageUrl
                        : `data:image/jpeg;base64,${newImageUrl}`,
                    }
                  : DefaultImage
              }
              style={styles.image}
            />
          </Pressable>
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

              <View
                style={{
                  flex: 1,
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <LocationItem label={loc} />
                  <TouchableOpacity
                    onPress={handleSelectLocation}
                    style={{
                      backgroundColor: "#5892FF",
                      borderRadius: 30,
                    }}
                  >
                    <AntDesgin
                      name="pluscircleo"
                      size={25}
                      color="#fff"
                      style={{ backgroundColor: "#5892FF", borderRadius: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
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
    width: screenWidth,
    height: 200,
    resizeMode: "cover",
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
