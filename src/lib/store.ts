import { createStore, action, Action } from "easy-peasy";
import { TSongsTable } from "../types";

export interface StoreModel {
  activeSongs: TSongsTable["songs"][];
  activeSong: null | TSongsTable["songs"];
  changeActiveSongs: Action<StoreModel, TSongsTable["songs"][]>;
  changeActiveSong: Action<StoreModel, TSongsTable["songs"]>;
}

export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
});
