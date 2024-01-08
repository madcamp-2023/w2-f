import { Image, StyleSheet, Text, View } from "react-native";

import Avatar from "../assets/avatar4.png";
import { contentSize } from "../recoil/font";
import { text_color } from "../recoil/color";

export default function Page3() {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.image} />
      <Text style={styles.content}>해결!</Text>
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
    width: 250,
    height: 250,
  },

  content: {
    color: text_color,
    fontSize: contentSize,
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
