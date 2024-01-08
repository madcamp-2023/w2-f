import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import LabelInput from "./LabelInput";

import { userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";
import LocationModal from "./LocationModal";

const ProfileEdit = () => {
  const user = useRecoilValue(userState);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [imageUrl, setImageUrl] = useState(user.image);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const [showEOptions, setShowEOptions] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSubmit = () => {
    //TODO: POST, userState 변경
    Alert.alert("프로필 업데이트!");

    axios
      .patch(URI + "/user", {
        id: user.id,
        bio: bio,
        image: imageUrl,
        location: location,
        name: name,
      })
      .then((response) => {
        console.log(response.data);
      });
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
        <LabelInput
          label="주요위치"
          value={location}
          onChangeText={setLocation}
          placeholder={
            user.location === null ? "주요위치를 선택하세요." : user.location
          }
        />
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Text style={{ flexBasis: 60 }}>주요 위치</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Pressable
              onPress={() => {
                setShowEOptions(true);
                console.log("!");
              }}
            >
              <Text>E</Text>
            </Pressable>
            <Pressable onPress={() => setShowEOptions(true)}>
              <Text>W</Text>
            </Pressable>
            <Pressable onPress={() => setShowEOptions(true)}>
              <Text>N</Text>
            </Pressable>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              {eOptions.map((option) => (
                <Pressable
                  key={option}
                  onPress={() => {
                    setLocation(option);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </Modal>
        </View> */}
        <Button title="수정하기" onPress={handleSubmit} />
      </View>
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
    marginBottom: 20,
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
});

export default ProfileEdit;
