import { Text, View } from "react-native";
import ChatList from "../components/ChatList";

export default function ChatScreen() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ChatList />
    </View>
  );
}
