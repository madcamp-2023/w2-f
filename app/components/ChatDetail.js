import { useEffect } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { URI } from "../recoil/constant";

export default function ChatDetail({ route }) {
  const { id, last_chat, user1_id, user2_id, created_at } = route.params;

  useEffect(() => {
    const getChatLog = async (_) => {
      await axios
        .get(URI + "/chat", {
          params: {
            room_id: id,
          },
        })
        .then((response) => console.log(response.data));
    };

    getChatLog();
  }, []);

  return (
    <View>
      <Text>1</Text>
    </View>
  );
}
