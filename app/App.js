import "react-native-gesture-handler";

import { RecoilRoot } from "recoil";
import Routing from "./Routing";
import Carousel from "./carousel/Carousel";

export default function App() {
  return (
    <RecoilRoot>
      <Carousel />
    </RecoilRoot>
  );
}
