import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";

import ChatRoom from "./ChatRoom";

import { URI } from "../recoil/constant";
export default function ChatList() {
  const [chatRoomList, setchatRoomList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getChatLoomList = async () => {
      await axios.get(URI + "/chatRoom").then((response) => {
        // id, last_chat, user1_id, user2_id, created_at

        //TODO : user1,2 name,image 필요 -> back에서 수정되는 db를 가져오게끔 수정 필요
        setchatRoomList(response.data);
      });
    };

    getChatLoomList();
  }, []);

  const onRefresh = async () => {
    if (!refreshing) {
      await axios.get(URI + "/chatRoom").then((response) => {
        setchatRoomList(response.data);
      });
    }
  };

  return (
    <FlatList
      data={chatRoomList}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
      onRefresh={onRefresh}
      refreshing={refreshing}
      renderItem={({ item }) => {
        const { id, last_chat, user1_id, user2_id, created_at } = item;
        console.log(id, last_chat, user1_id, user2_id, created_at);
        return (
          <ChatRoom
            id={id}
            last_chat={last_chat}
            user1_id={user1_id}
            user2_id={user2_id}
            created_at={created_at}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({});
