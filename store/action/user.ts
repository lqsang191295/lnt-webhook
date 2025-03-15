import { createAction } from "@reduxjs/toolkit";
import { User } from "../types/user";

// Định nghĩa các action
export const setDataUser = createAction<User>("user/setData");
