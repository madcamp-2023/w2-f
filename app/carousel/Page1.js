import { Image, StyleSheet, Text, View } from "react-native";

import Avatar_left from "../assets/avatar1.png";
import Avatar_right from "../assets/avatar2.png";
import { contentSize } from "../recoil/font";

export default function Page1() {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image source={Avatar_left} style={styles.image} />
        <Image source={Avatar_right} style={styles.image} />
      </View>
      <Text style={styles.content}>이런 적 있으신가요?</Text>
      <Text style={{ color: "#A4A4A4" }}>
        주변에 공용 킥보드가 없어서 힘들게 걸어가고...
      </Text>
      <Text style={{ color: "#A4A4A4" }}>
        실수로 도서관에 두고 온 이어폰을 가지러 가고...
      </Text>
      <Text style={{ color: "#A4A4A4" }}>
        졸려 죽겠는데 빨래는 돌려야겠고...
      </Text>
      <Text style={{ marginTop: 10, fontSize: 20 }}>
        귀찮은 일들이 너무 많아!
      </Text>
      <View style={styles.position}>
        <Text style={styles.position__pt}>•</Text>
        <Text style={styles.position__pt}>⸰</Text>
        <Text style={styles.position__pt}>⸰</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    heigh: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image_container: {
    flexDirection: "row",
  },

  image: {
    width: 200,
    height: 200,
  },

  content: {
    color: "#16459E",
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10,
  },

  position: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    padding: 10,
    fontSize: contentSize,
  },

  position__pt: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: contentSize,
  },
});
