import { Image, StyleSheet, Text, View } from "react-native";

import Avatar from "../assets/avatar3.png";
import { text_color } from "../recoil/color";
import { contentSize } from "../recoil/font";

export default function Page2() {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.image} />
      <Text style={styles.content}>이런 생각 해보셨나요?</Text>
      <Text style={{ color: "#A4A4A4" }}>그냥 차라리 돈 좀 쓰고</Text>
      <Text style={{ color: "#A4A4A4" }}>일들이 해결되면 좋겠다고...</Text>
      <Text style={{ color: "#A4A4A4" }}>{""}</Text>
      <Text style={{ marginTop: 10, fontSize: 20 }}>
        누가 나 대신 해주면 좋겠는데!
      </Text>
      <View style={styles.position}>
        <Text style={styles.position__pt}>⸰</Text>
        <Text style={styles.position__pt}>•</Text>
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
