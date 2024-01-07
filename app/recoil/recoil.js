import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const postRefreshState = atom({
  key: "postRefreshState",
  default: false,
});
