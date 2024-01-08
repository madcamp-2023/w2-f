import { Image, StyleSheet, Text, View } from "react-native";

import Avatar_left from "../assets/avatar1.png";
import Avatar_right from "../assets/avatar2.png";
import { text_color } from "../recoil/color";
import { contentSize } from "../recoil/font";

export default function Page1() {
  return (
    <View style={styles.container}>
      <View style={styles.image_container}>
        <Image source={Avatar_left} style={styles.image} />
        <Image source={Avatar_right} style={styles.image} />
      </View>
      <Text style={styles.content}>필요한게 있지 않으신가요?</Text>
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
