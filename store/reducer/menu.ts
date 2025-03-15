import { createReducer } from "@reduxjs/toolkit";
import { setSelectedMenu } from "../action/menu";
import { Item } from "@/store/types/menu";

interface MenuState {
  selectedMenu: Item;
}

const initialState: MenuState = {
  selectedMenu: {
    title: "",
    url: "",
  },
};

const menuReducer = createReducer(initialState, (builder) => {
  builder.addCase(setSelectedMenu, (state, action) => {
    state.selectedMenu = action.payload;
  });
});

export default menuReducer;
