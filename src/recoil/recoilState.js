import { atom } from "recoil";

export const socketState = atom({
  key: "socketState",
  default: null, //  the initial socket state here
});
