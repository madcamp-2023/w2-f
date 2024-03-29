import { useRecoilValue } from "recoil";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useNavigation } from "@react-navigation/native";

import { userState } from "../recoil/recoil";
import { smallestFontSize } from "../recoil/font";

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
    content.length > 100 ? content.substring(0, 90) + "..." : content;

  if (dueTime.days <= 0 && dueTime.hours <= 0 && dueTime.minutes <= 0) {
    return;
  }

  return (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
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
          <View style={{ flexDirection: "row", width: 180 }}>
            <Entypo name="location-pin" size={20} />
            <Text style={{ fontSize: smallestFontSize }}>{location}</Text>
          </View>
          <MaterialIcons name="timer" size={20} style={{ marginRight: 5 }} />
          {dueTime.minutes > 0 && (
            <DueText isLessThanOneHour={isLessThanOneHour}>마감 </DueText>
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
    fontSize: smallestFontSize,
  },

  postCotent__left: {
    flex: 1,
    flexDirection: "column",
  },

  postFooter: {
    flexDirection: "row",
  },
});
