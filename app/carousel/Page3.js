import { Image, StyleSheet, Text, View } from "react-native";

import Avatar from "../assets/avatar4.png";
import { contentSize } from "../recoil/font";
import { text_color } from "../recoil/color";

export default function Page3() {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.image} />
      <Text style={styles.content}>해결!</Text>
      <Text style={{ color: "#A4A4A4" }}>앞선 이야기들에 공감한 당신,</Text>
      <Text style={{ color: "#A4A4A4" }}>BOOLER가 필요한 분이시네요!</Text>
      <Text>{""}</Text>
      <Text style={{ color: "#A4A4A4" }}>용돈벌이를 하고 싶은 분도,</Text>
      <Text style={{ color: "#A4A4A4" }}>
        귀찮은 일, 돈으로 해결하고 싶은 분도
      </Text>

      <Text style={{ marginTop: 10, fontSize: 20 }}>
        귀찮은 일들이 너무 많아!
      </Text>
      <View style={styles.position}>
        <Text style={styles.position__pt}>⸰</Text>
        <Text style={styles.position__pt}>⸰</Text>
        <Text style={styles.position__pt}>•</Text>
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

  image: {
    width: 240,
    height: 240,
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
