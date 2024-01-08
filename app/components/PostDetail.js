import { Button, Image, StyleSheet, Text, View } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";

import axios from "axios";
import { URI } from "../recoil/constant";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/recoil";

export default function PostDetail({ route }) {
  const {
    id,
    user_id,
    title,
    content,
    price,
    location,
    due,
    image,
    chat_number,
  } = route.params;

  console.log(
    id,
    user_id,
    title,
    content,
    price,
    location,
    due,
    image,
    chat_number
  );

  const user = useRecoilValue(userState);

  const handleCreateChatRoom = async () => {
    //TODO : TEST
    await axios
      .post(URI + "/chatRoom", {
        user1_id: user.id,
        user2_id: user_id,
        post_id: id,
      })
      .then((response) => console.log(response.data));
  };

  return (
    <View>
      <View>
        <AntDesign
          name="arrowleft"
          size={30}
          onPress={() => navigation.navigate("PostHome")}
        />
      </View>
      <View>
        <View>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
        <View>
          <Text>{title}</Text>
          <Text>{content}</Text>
          <Text>{price}</Text>
          <Text>{location}</Text>
          <Text>{due}</Text>
        </View>
        <View>
          <Button title="채팅하기" onPress={handleCreateChatRoom} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});
