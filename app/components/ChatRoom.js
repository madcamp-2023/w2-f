import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

export default function ChatRoom({
  id,
  last_chat,
  user1_name,
  user2_name,
  user1_image,
  user2_image,
  user1_id,
  user2_id,
  created_at,
}) {
  const navigation = useNavigation();
  const user = useRecoilValue(userState);

  const name = user.id === user1_id ? user2_name : user1_name;
  const image = user.id === user1_id ? user2_image : user1_image;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatDetail", {
          id,
          last_chat,
          user1_name,
          user2_name,
          user1_image,
          user2_image,
          user1_id,
          user2_id,
          created_at,
        });
      }}
      style={styles.chatItem}
    >
      <Image source={{ uri: image }} style={styles.chatImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{name}</Text>
        <Text style={styles.lastChat}>{last_chat}</Text>
      </View>
      <Text style={styles.chatTimestamp}>{created_at}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "#cccccc", // Placeholder color
  },
  chatDetails: {
    flex: 1,
    justifyContent: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  lastChat: {
    fontSize: 14,
    color: "#555",
  },
  chatTimestamp: {
    fontSize: 12,
    color: "#888",
  },
});
