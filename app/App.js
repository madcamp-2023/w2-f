import "react-native-gesture-handler";

import { RecoilRoot } from "recoil";
import Routing from "./Routing";

export default function App() {
  return (
    <RecoilRoot>
      <Routing />
    </RecoilRoot>
  );
}
