import { useEffect } from "react";
import { Text, View } from "react-native";
import axios from "axios";

import { URI } from "../recoil/constant";

import io from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

const SOCKET_SERVER_URL = "";

export default function ChatDetail({ route }) {
  const { id, last_chat, user1_id, user2_id, created_at } = route.params;

  const user = useRecoilValue(userState);

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

  useEffect(() => {
    const socket = io(URI, {
      transports: ["websocket"],
    });

    socket.connect();

    socket.emit("join room", { room_id: id });

    socket.emit("send chat", { room_id: id, user_id: user.id, message: "111" });

    socket.on("receive chat", () => {
      console.log("msgasdasdasd", message);
    });

    // socket.emit("leave room", { room_id: id });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <View>
      <Text>Socket.IO with Expo</Text>
    </View>
  );
}
