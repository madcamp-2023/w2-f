import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useRecoilValue } from "recoil";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import axios from "axios";
import { URI } from "../recoil/constant";
import { userState } from "../recoil/recoil";

import DefaultImage from "../assets/defaultImage.png";

const screenWidth = Dimensions.get("window").width;

export default function PostDetail({ route }) {
  const {
    id,
    user_id,
    title,
    content,
    price,
    location,
    due,
    image,
    chat_number,
  } = route.params;

  console.log("image", image);

  const user = useRecoilValue(userState);

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

  const handleCreateChatRoom = async () => {
    //TODO : TEST
    await axios
      .post(URI + "/chatRoom", {
        user1_id: user.id,
        user2_id: user_id,
        post_id: id,
      })
      .then((response) => console.log(response.data));
  };

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
            source={image ? { uri: image } : DefaultImage}
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
          <TouchableOpacity
            onPress={handleCreateChatRoom}
            style={{
              backgroundColor: "#5892FF",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>채팅하기</Text>
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

  image: {
    width: screenWidth,
    height: 200,
  },
});
