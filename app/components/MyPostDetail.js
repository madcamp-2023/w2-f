import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";
import { useState } from "react";
import LabelInput from "./LabelInput";
import PostDatePicker from "./PostDatePicker";
import { gray_color } from "../recoil/color";

const screenWidth = Dimensions.get("window").width;

const MyPostDetail = ({ route }) => {
  const {
    id,
    user_id,
    title,
    content,
    price,
    location,
    due,
    image,
    prev,
    chat_number,
  } = route.params;

  console.log("id!!!", id);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newImage, setnewImage] = useState(image);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // 날짜 상태
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const navigation = useNavigation();

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

  const calculateTimeLeft = (due) => {
    const dueDate = new Date(due);
    const now = new Date();

    const difference = dueDate - now;

    // 일 시간, 분, 초 및 밀리초 단위로 변환
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);

    return { days: daysLeft, hours: hoursLeft, minutes: minutesLeft };
  };

  const dueTime = calculateTimeLeft(due);

  const isLessThanOneHour =
    dueTime.days === 0 && dueTime.hours === 0 && dueTime.minutes > 0;

  const truncatedContent =
    content.length > 100 ? content.substring(0, 100) + "..." : content;

  if (dueTime.days <= 0 && dueTime.hours <= 0 && dueTime.minutes <= 0) {
    return;
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            marginTop: 50,

            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "black",
            borderBottomWidth: 1,
            borderTopColor: "black",
            borderTopWidth: 1,
          }}
        >
          <Pressable onPress={uploadImage}>
            <Image source={{ uri: newImage }} style={styles.image} />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "column",
                padding: 20,
                borderBottomColor: "black",
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 24, marginBottom: 20 }}
              >
                {title}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Entypo name="location-pin" size={20} />
                  <Text>{location}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <MaterialIcons
                    name="timer"
                    size={20}
                    style={{ marginRight: 5 }}
                  />
                  {dueTime.minutes > 0 && (
                    <Text style={isLessThanOneHour ? { color: "red" } : null}>
                      마감{" "}
                    </Text>
                  )}
                  {dueTime.days > 0 && <Text>{dueTime.days}일 </Text>}
                  {dueTime.hours > 0 && <Text>{dueTime.hours}시간 </Text>}
                  {dueTime.minutes > 0 && (
                    <Text style={isLessThanOneHour ? { color: "red" } : null}>
                      {dueTime.minutes}분
                    </Text>
                  )}
                  <Text style={isLessThanOneHour ? { color: "red" } : null}>
                    전
                  </Text>
                </View>
                <View>
                  <Text style={{ marginLeft: 10, color: "#5892FF" }}>
                    ₩ {price}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ padding: 20 }}>
              <Text>{content}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PostEdit", {
                  id: id,
                  title: title,
                  price: price,
                  body: content,
                  location: location,
                  due: due,
                  image: image,
                })
              }
              style={{
                flex: 1, // 추가된 스타일
                backgroundColor: "#5892FF",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRightColor: "black",
                borderRightWidth: 1,
              }}
            >
              <Text style={{ color: "white" }}>수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeletePost}
              style={{
                flex: 1, // 추가된 스타일
                backgroundColor: "#5892FF",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>삭제하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: screenWidth,
    height: 200,
    resizeMode: "cover",
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
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//   },

//   header: {
//     alignSelf: "flex-start",
//     padding: 10,
//   },

//   content: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     marginBottom: 20,
//   },

//   content__child: {
//     justifyContent: "center",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "black",
//     width: "100%",
//   },

//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     paddingBottom: 20,
//   },
// });

export default MyPostDetail;
