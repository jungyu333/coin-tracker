import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const isShowState = atom({
  key: "isShowState",
  default: true,
});
