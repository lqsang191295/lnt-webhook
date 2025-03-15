import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducer/menu";
import userReducer from "./reducer/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
