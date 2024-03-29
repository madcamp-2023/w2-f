import { View } from "react-native";
import { useRecoilState } from "recoil";
import { WebView } from "react-native-webview";
import axios from "axios";

import { accessTokenState, userState } from "../recoil/recoil";
import { URI } from "../recoil/constant";

import DefaultImage from "../assets/defaultImage.png";

const REST_API_KEY = "406d35070a2f8f7ca0e51a1e894ffdc6";
const REDIRECT_URI = "http://143.248.229.220:8081/auth/kakao/callback";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

export default function KakaoLogin({ onLoginSuccess }) {
  const [user, setUser] = useRecoilState(userState);

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const getCode = (url) => {
    const regex = /[?&]code=(.*?)(?:&|$)/;
    const match = regex.exec(url);
    if (match && match[1]) {
      const AUTHORIZE_CODE = match[1];

      onLoginSuccess(AUTHORIZE_CODE);
      setAccessToken(AUTHORIZE_CODE);

      setUser({
        id: 98,
        kakao_id: 3259680521,
        name: "정해준",
        image: DefaultImage,
        bio: "몰입...해야겠지",
        location: "KAIST 부설 나노종합기술원(E19)",
      });

      // axios
      //   .post(URI + "/user/login", {
      //     AUTHORIZE_CODE: AUTHORIZE_CODE,
      //   })
      //   .then((response) => {
      //     // Handle response from your backend
      //     const userData = response.data;
      //     const { bio, id, image, kakao_id, location, name } = userData;
      //     setUser({
      //       id: id,
      //       name: name,
      //       image: image,
      //       bio: bio,
      //       kakao_id: kakao_id,
      //       location: location,
      //     });
      //   })
      //   .catch((error) => {
      //     // Handle any errors from your backend
      //     console.error("Error posting to backend:", error);
      //   });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}
