import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";
import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

import AntDesign from "react-native-vector-icons/AntDesign";
import io from "socket.io-client";

const Message = ({ log, isCurrentUser }) => {
  return (
    <View
      style={[
        styles.messageRow,
        isCurrentUser ? styles.currentUserRow : styles.otherUserRow,
      ]}
    >
      {!isCurrentUser && (
        <Image source={{ uri: log.user_image }} style={styles.avatar} />
      )}
      <View
        style={[
          isCurrentUser ? styles.messageBubble : styles.botMessageBubble,
          isCurrentUser
            ? styles.currentMessageBubble
            : styles.otherMessageBubble,
        ]}
      >
        <Text style={styles.messageText}>{log.message}</Text>
      </View>
    </View>
  );
};

export default function ChatDetail({ route }) {
  const { id } = route.params;
  const user = useRecoilValue(userState);
  const [chatLogs, setChatLogs] = useState([]);
  const [text, setText] = useState("");

  const scrollViewRef = useRef();

  const [socket, setSocket] = useState(
    io(URI, {
      transports: ["websocket"],
    })
  );

  useEffect(() => {
    socket.connect();
  }, []);

  //   useEffect(() => {
  //     const socket = io(URI, {
  //       transports: ["websocket"],
  //     });

  //     socket.connect();

  //     socket.emit("join room", { room_id: id });

  //     socket.emit("send chat", { room_id: id, user_id: user.id, message: "111" });

  //     socket.on("receive chat", () => {
  //       console.log("msgasdasdasd", message);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  const sendMessage = () => {
    const newMessage = {
      user_id: user.id,
      message: text,
      user_image: user.image,
    };

    socket.emit("send chat", { room_id: id, user_id: user.id, message: text });
    setChatLogs((prevLogs) => [...prevLogs, newMessage]);
    setText("");

    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const getChatLog = async () => {
      const response = await axios.get(`${URI}/chat`, {
        params: { room_id: id },
      });
      setChatLogs(response.data);
    };

    getChatLog();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {chatLogs.map((log, index) => (
          <Message
            key={index}
            log={log}
            isCurrentUser={log.user_id === user.id}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <AntDesign
            name="message1"
            size={24}
            color="#5892FF"
            style={styles.inputIcon}
          />
          <TextInput
            onChangeText={setText}
            value={text}
            placeholder="메시지를 입력하세요."
            placeholderTextColor="#5892FF"
            style={styles.input}
          />
        </View>
        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <AntDesign name="arrowup" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  messageRow: {
    flexDirection: "row",
    padding: 8,
    alignItems: "flex-end",
  },
  currentUserRow: {
    justifyContent: "flex-end",
  },
  otherUserRow: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  messageBubble: {
    maxWidth: "70%",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    marginBottom: 5,
  },

  botMessageBubble: {
    maxWidth: "70%",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    marginBottom: 5,
  },

  currentMessageBubble: {
    backgroundColor: "#5892FF",
    borderTopRightRadius: 2,
    alignSelf: "flex-end",
  },
  otherMessageBubble: {
    backgroundColor: "#90ee90",
    borderBottomLeftRadius: 2,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  messageContainer: {
    maxWidth: "80%",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  currentUser: {
    alignSelf: "flex-end",
    backgroundColor: "#add8e6",
  },
  otherUser: {
    alignSelf: "flex-start",
    backgroundColor: "#90ee90",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  userName: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#5892FF",
    padding: 5,
    paddingLeft: 15,
    alignItems: "center",
    marginRight: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#5892FF",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  sendButton: {
    backgroundColor: "#5892FF",
    borderRadius: 30,
    padding: 8,
  },
});

// import { useEffect } from "react";
// import { Text, View } from "react-native";
// import axios from "axios";

// import { URI } from "../recoil/constant";

// import io from "socket.io-client";
// import { useRecoilValue } from "recoil";
// import { userState } from "../recoil/recoil";

// const SOCKET_SERVER_URL = "";

// export default function ChatDetail({ route }) {
//   const { id, last_chat, user1_id, user2_id, created_at } = route.params;

//   const user = useRecoilValue(userState);

//   useEffect(() => {
//     const getChatLog = async (_) => {
//       await axios
//         .get(URI + "/chat", {
//           params: {
//             room_id: id,
//           },
//         })
//         .then((response) => console.log(response.data));
//     };

//     getChatLog();
//   }, []);

//   useEffect(() => {
//     const socket = io(URI, {
//       transports: ["websocket"],
//     });

//     socket.connect();

//     socket.emit("join room", { room_id: id });

//     socket.emit("send chat", { room_id: id, user_id: user.id, message: "111" });

//     socket.on("receive chat", () => {
//       console.log("msgasdasdasd", message);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <View>
//       <Text>Socket.IO with Expo</Text>
//     </View>
//   );
// }
