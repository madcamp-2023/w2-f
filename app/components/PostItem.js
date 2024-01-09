import { useRecoilValue } from "recoil";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";

import { userState } from "../recoil/recoil";

const PostItem = ({
  id,
  user_id,
  image,
  title,
  content,
  price,
  location,
  due,
  prev,
  created_time,
  chat_number,
}) => {
  const navigation = useNavigation();
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

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
        console.log(user.id, user_id);
        if (user && user.id === user_id) {
          navigation.navigate("MyPostDetail", {
            id,
            user_id,
            title,
            content,
            price,
            location,
            due,
            image,
            chat_number,
            prev,
          });
        } else {
          navigation.navigate("PostDetail", {
            id,
            user_id,
            title,
            content,
            price,
            location,
            due,
            chat_number,
            image,
          });
        }
      }}
    >
      <View style={styles.post}>
        <View style={styles.postContent__header}>
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postPrice}>₩ {price}</Text>
        </View>
        <Text style={styles.postContent}>{truncatedContent}</Text>
        <View style={styles.postFooter}>
          <View style={{ flexDirection: "row", width: 80 }}>
            <Entypo name="location-pin" size={20} />
            <Text>{location}</Text>
          </View>
          <MaterialIcons name="timer" size={20} style={{ marginRight: 5 }} />
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
          <Text style={isLessThanOneHour ? { color: "red" } : null}>전</Text>
        </View>
        <View style={styles.postContent__right}></View>
      </View>
    </TouchableOpacity>
  );
};
// location-pin
export default PostItem;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 0.3,
    borderBottomColor: "#474747",
  },

  post: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },

  postTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },

  postContent__header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  postContent: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    color: "#A4A4A4",
  },

  postPrice: {
    marginLeft: 10,
    color: "#5892FF",
  },

  postCotent__left: {
    flex: 1,
    flexDirection: "column",
  },

  postFooter: {
    flexDirection: "row",
  },
});
