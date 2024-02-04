import { atom } from "recoil";

export const socketState = atom({
  key: "socketState",
  default: undefined, //  the initial socket state here
});
