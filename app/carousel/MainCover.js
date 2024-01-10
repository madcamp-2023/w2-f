import { StyleSheet, Text, View } from "react-native";
import { contentFontSize } from "../recoil/font";

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
    color: "#16459E",
    fontSize: 40,
    marginBottom: 10,
  },

  content: {
    color: "#16459E",
    fontSize: contentFontSize,
    paddingBottom: 20,
  },
});
