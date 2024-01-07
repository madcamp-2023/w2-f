import "react-native-gesture-handler";

import { RecoilRoot } from "recoil";
import Routing from "./Routing";

export default function App() {
  //TODO:
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     (async () => {
  //       let { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status === "granted") {
  //         let location = await Location.getCurrentPositionAsync({});
  //         // location.coords.latitude와 location.coords.longitude로
  //         // 유저의 현 위치를 가져올 수 있다.

  //         console.log(location);
  //       }
  //     })();
  //   }
  // }, [isLoggedIn]);

  return (
    <RecoilRoot>
      <Routing />
    </RecoilRoot>
  );
}
