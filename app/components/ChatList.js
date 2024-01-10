import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";

import ChatRoom from "./ChatRoom";

import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";
export default function ChatList() {
  const [chatRoomList, setchatRoomList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const user = useRecoilValue(userState);

  useEffect(() => {
    const getChatLoomList = async () => {
      await axios.get(URI + "/chatRoom").then((response) => {
        // id, last_chat, user1_image, user2_image, user1_name, user2_name, user1_id, user2_id, created_at

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
      onRefresh={onRefresh}
      refreshing={refreshing}
      style={{ marginTop: 50, borderTopColor: "#e0e0e0", borderTopWidth: 1 }}
      renderItem={({ item }) => {
        const {
          id,
          last_chat,
          user1_name,
          user2_name,
          user1_image,
          user2_image,
          user1_id,
          user2_id,
          created_at,
        } = item;
        return (
          <ChatRoom
            id={id}
            last_chat={last_chat}
            user1_name={user1_name}
            user2_name={user2_name}
            user1_image={user1_image}
            user2_image={user2_image}
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
