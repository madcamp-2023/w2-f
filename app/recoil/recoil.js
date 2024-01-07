import { atom, selector } from "recoil";
import axios from "axios";

import { URI } from "./constant";

export const userState = atom({
  key: "user",
  default: null,
});
