// LoginForm.js
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Button,
  View,
  Modal,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import Avatar from "../assets/avatar5.png";

import KakaoLogin from "../components/KakaoLogin";
import { userState } from "../recoil/recoil";
import Routing from "../Routing";

export default function Page4() {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const handleLoginSuccess = (code) => {
    setLoginModalVisible(false);
  };

  const user = useRecoilValue(userState);

  if (!user) {
    return (
      <View style={styles.container}>
        <Image source={Avatar} style={styles.image} />

        <TouchableOpacity
          style={styles.kakaobtn}
          onPress={() => setLoginModalVisible(true)}
        >
          <Text style={styles.kakaoText}>Kakao Login</Text>
        </TouchableOpacity>

        <Modal visible={isLoginModalVisible}>
          <KakaoLogin onLoginSuccess={handleLoginSuccess} />
        </Modal>
      </View>
    );
  }

  return <Routing />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    heigh: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 200, // 원하는 너비
    height: 200, // 원하는 높이
  },

  kakaobtn: {
    backgroundColor: "#FEE500",
    width: 100,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 50,
  },

  kakaoText: {
    color: "white",
    fontWeight: "bold",
  },
});
