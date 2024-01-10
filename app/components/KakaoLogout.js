import { Button, View } from "react-native";
import { useRecoilValue } from "recoil";
import { accessTokenState } from "../recoil/recoil";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { URI } from "../recoil/constant";

export default function KakaoLogout() {
  const AUTHORIZE_CODE = useRecoilValue(accessTokenState);
  const navigation = useNavigation();

  console.log(AUTHORIZE_CODE);

  const handleLogout = async () => {
    console.log(AUTHORIZE_CODE, "logout");

    // 서버에 로그아웃 요청
    await axios
      .post(URI + "/user/logout", {
        AUTHORIZE_CODE: AUTHORIZE_CODE,
      })
      .then((response) => {
        console.log("?");
        // 성공적으로 로그아웃 처리된 후, 로컬 상태 초기화
        setUser({});
        // 필요한 경우 로그인 화면으로 리디렉션
        navigation.navigate("PostHome"); // 로그인 화면으로 돌아가는 라우트를 적절히 설정하세요.
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <View>
      {AUTHORIZE_CODE && <Button title="Logout" onPress={handleLogout} />}
    </View>
  );
}
