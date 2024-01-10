import { useState } from "react";
import {
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
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";
import { smallestFontSize } from "../recoil/font";

import DefaultImage from "../assets/defaultImage.png";

const screenWidth = Dimensions.get("window").width;

const DueText = ({ children, isLessThanOneHour }) => {
  return (
    <Text
      style={[
        isLessThanOneHour ? { color: "red" } : null,
        { fontSize: smallestFontSize },
      ]}
    >
      {children}
    </Text>
  );
};

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

  const navigation = useNavigation();

  const [postRefresh, setPostRefresh] = useRecoilState(postRefreshState);

  const handleDeletePost = async () => {
    setPostRefresh((prev) => !prev);
    navigation.goBack();
    await axios.delete(URI + "/post?id=" + id);
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
    content.length > 100 ? content.substring(0, 90) + "..." : content;

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
          <Image
            source={
              image
                ? {
                    uri: image.startsWith("data:image/jpeg;base64,")
                      ? image
                      : `data:image/jpeg;base64,${image}`,
                  }
                : DefaultImage
            }
            style={styles.image}
          />
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 24, marginBottom: 20 }}
                >
                  {title}
                </Text>
                <View>
                  <Text style={{ marginLeft: 10, color: "#5892FF" }}>
                    ₩ {price}
                  </Text>
                </View>
              </View>

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
                    <DueText isLessThanOneHour={isLessThanOneHour}>
                      마감{" "}
                    </DueText>
                  )}
                  {dueTime.days > 0 && (
                    <DueText isLessThanOneHour={isLessThanOneHour}>
                      {dueTime.days}일{" "}
                    </DueText>
                  )}
                  {dueTime.hours > 0 && (
                    <DueText isLessThanOneHour={isLessThanOneHour}>
                      {dueTime.hours}시간{" "}
                    </DueText>
                  )}
                  {dueTime.minutes > 0 && (
                    <DueText isLessThanOneHour={isLessThanOneHour}>
                      {dueTime.minutes}분
                    </DueText>
                  )}
                  <DueText>전</DueText>
                </View>
              </View>
            </View>

            <View style={{ padding: 20 }}>
              <Text>{truncatedContent}</Text>
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
                  loc: location,
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
    backgroundColor: "white",
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

export default MyPostDetail;
