import { atom } from "recoil";

export const socketState = atom({
  key: "socketState",
  default: undefined, //  the initial socket state here
});

export const anomaliesState = atom({
  key: "anomaliesState",
  default: [], //  the initial anomalies state here
});

export const notificationsState = atom({
  key: "notificationsState",
  default: [], //  the initial notifications state here
});
