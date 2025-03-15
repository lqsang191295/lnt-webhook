import { createReducer } from "@reduxjs/toolkit";
import { setDataUser } from "../action/user";

interface UserState {
  name: string;
  avatar: string;
  email: string;
}

const initialState: UserState = {
  name: "",
  avatar: "",
  email: "",
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDataUser, (state, action) => {
    state.name = action.payload.name;
    state.avatar = action.payload.avatar;
    state.email = action.payload.email;
  });
});

export default userReducer;
