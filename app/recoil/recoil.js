import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

export const postRefreshState = atom({
  key: "postRefreshState",
  default: false,
});

export const chatRefreshState = atom({
  key: "chatRefreshState",
  default: false,
});

export const postStatusState = atom({
  key: "postStatusState",
  default: "new",
});
