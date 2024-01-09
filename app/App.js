import "react-native-gesture-handler";

import { RecoilRoot } from "recoil";
import Routing from "./Routing";
import SelectLocation from "./components/SelectLocation";

export default function App() {
  return (
    <RecoilRoot>
      {/* <SelectLocation /> */}
      <Routing />
    </RecoilRoot>
  );
}
