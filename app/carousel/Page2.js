import { Image, StyleSheet, Text, View } from "react-native";

import Avatar from "../assets/avatar3.png";
import { text_color } from "../recoil/color";
import { contentSize } from "../recoil/font";

export default function Page2() {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.image} />
      <Text style={styles.content}>
        누군가가 해줬으면 하는 일이 있지 않았나요?
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
    color: text_color,
    fontSize: contentSize,
    marginTop: 50,
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
    color: text_color,
    fontSize: contentSize,
  },
});
