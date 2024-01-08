import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function ChatRoom({
  id,
  last_chat,
  user1_id,
  user2_id,
  created_at,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatDetail", {
          id,
          last_chat,
          user1_id,
          user2_id,
          created_at,
        });
      }}
    >
      <View>
        <View>
          <Text>{id}</Text>
          <Text>{last_chat}</Text>
          <Text>{user1_id}</Text>
          <Text>{user2_id}</Text>
          <Text>{created_at}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
