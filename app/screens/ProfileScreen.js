import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";

import { postRefreshState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";
import { gray_color, light_gray_color } from "../recoil/color";
import PostItem from "../components/PostItem";
import { contentFontSize } from "../recoil/font";
import LoadingScreen from "./LoadingScreen";

const GrayItem = ({ children }) => {
  return <Text style={{ color: gray_color, marginBottom: 3 }}>{children}</Text>;
};

const ContentItem = ({ children }) => {
  const formattedText =
    children.length > 10 ? `${children.substring(0, 10)}...` : children;
  return (
    <Text style={{ fontSize: 20, marginBottom: 10 }}>{formattedText}</Text>
  );
};

const LocationItem = ({ location }) => {
  return (
    <View
      style={{
        backgroundColor: "#5892FF",
        padding: 3,
        borderRadius: 20,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: contentFontSize }}>
        {" "}
        {location}{" "}
      </Text>
    </View>
  );
};

const EditItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        style={{
          backgroundColor: light_gray_color,
          padding: 3,
          borderRadius: 20,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const user = useRecoilValue(userState);
  const postRefrsh = useRecoilValue(postRefreshState);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePress = () => {
    navigation.navigate("ProfileEdit");
  };

  useEffect(() => {
    const getPostList = async (_) => {
      const response = await axios
        .get(URI + "/post")
        .then((response) => response.data);

      const selectedResponse = response.filter((post) => {
        if (post.user_id === user.id) {
          return post;
        }
      });

      setData(selectedResponse);
      setIsLoading(false);
    };

    getPostList();
  }, [postRefrsh]);

  console.log("user!", user.name, user.bio, user.location);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          marginLeft: 20,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        {/* <Image
          source={{ uri: user.image }}
          style={{ width: 120, height: 120, borderRadius: 100 }}
        /> */}

        <Image
          source={
            user.image
              ? {
                  uri: user.image.startsWith("data:image/jpeg;base64,")
                    ? user.image
                    : `data:image/jpeg;base64,${user.image}`,
                }
              : DefaultImage
          }
          style={{ width: 120, height: 120, borderRadius: 100 }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <GrayItem>이름</GrayItem>
              <ContentItem>{user.name}</ContentItem>
            </View>
            <EditItem onPress={handlePress}>{"프로필 수정"}</EditItem>
          </View>
          <View>
            <GrayItem>자기소개</GrayItem>
            <ContentItem>{user.bio}</ContentItem>
          </View>
          <View>
            <GrayItem>주요 위치</GrayItem>
            {user.location && <LocationItem location={user.location} />}
          </View>
        </View>
      </View>

      <View style={{ flex: 1, marginTop: 20 }}>
        <View
          style={{
            backgroundColor: light_gray_color,
            borderBottomWidth: 0.3,
            borderBottomColor: "#474747",
            borderTopWidth: 0.3,
          }}
        >
          <Text style={{ padding: 10, marginLeft: 5 }}>내가 올린 글</Text>
        </View>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                const {
                  id,
                  user_id,
                  image,
                  body,
                  title,
                  content,
                  price,
                  location,
                  due,
                } = item;
                return (
                  <PostItem
                    id={id}
                    user_id={user_id}
                    image={image}
                    title={title}
                    content={body}
                    price={price}
                    location={location}
                    due={due}
                    prev="ProfileHome"
                  />
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}
