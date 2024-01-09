import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesgin from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

import LabelInput from "./LabelInput";

import { userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";

const LocationItem = ({ label }) => {
  return (
    <View
      style={{
        backgroundColor: "#ECECEC",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
      }}
    >
      <Text style={{ marginRight: 10 }}>{label}</Text>
      <Feather name="x" size={15} color="gray" />
    </View>
  );
};

const ProfileEdit = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();

  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [bio, setBio] = useState(user.bio);
  const [imageUrl, setImageUrl] = useState(user.image);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (user.image) {
      setImageUrl(user.image);
    }
  }, [user]);

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return null;
    }

    const uri = result.assets[0].uri;
    setImageUrl(uri);
  };

  const handleSubmit = async () => {
    await axios
      .patch(URI + "/user", {
        id: user.id,
        bio: bio,
        image: imageUrl,
        location: location,
        name: name,
      })
      .then((response) => {
        navigation.navigate("ProfileHome");

        const userData = response.data;
        const { bio, id, image, kakao_id, location, name } = userData;
        setUser({
          id: id,
          name: name,
          image: image,
          bio: bio,
          kakao_id: kakao_id,
          location: location,
        });
      });
  };

  const handleSelectLocation = () => {
    navigation.navigate("SelectLocation", { setLocation: setLocation });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Pressable onPress={uploadImage}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <FontAwesome
              name="camera"
              size={27}
              style={styles.iconOverlay}
              onPress={uploadImage}
            />
          </Pressable>
        </View>
        <LabelInput
          label="이름"
          value={name}
          onChangeText={setName}
          placeholder={user.name}
        />
        <LabelInput
          label="자기소개"
          value={bio}
          onChangeText={setBio}
          placeholder={user.bio === null ? "자기소개를 입력하세요." : user.bio}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ flexBasis: 60 }}>주요위치</Text>
          <View
            style={{
              flex: 1,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LocationItem label={location} />
              <TouchableOpacity onPress={handleSelectLocation}>
                <AntDesgin
                  name="pluscircleo"
                  size={30}
                  color="#fff"
                  style={{ backgroundColor: "#5892FF", borderRadius: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#5892FF",
          justifyContent: "center",
          height: 50,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignSelf: "flex-start",
    padding: 10,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconOverlay: {
    position: "absolute",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 100,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 10,
    right: 20,
    bottom: 20,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  submit: {
    width: "100%",
    height: "10%",

    position: "absolute",
    bottom: 0,

    backgroundColor: "#16459E",

    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileEdit;
