import { StyleSheet, Text, View } from "react-native";
import { text_color } from "../recoil/color";
import { contentSize } from "../recoil/font";

export default function MainCover() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOOLER</Text>
      <Text style={styles.content}>"불러만 주이소!"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: text_color,
    fontSize: 40,
    marginBottom: 10,
  },

  content: {
    color: text_color,
    fontSize: contentSize,
    paddingBottom: 20,
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
  },
});
