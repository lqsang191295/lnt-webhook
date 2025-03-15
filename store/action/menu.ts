import { createAction } from "@reduxjs/toolkit";
import { Item } from "../types/menu";

// Định nghĩa các action
export const setSelectedMenu = createAction<Item>("menu/setMenu");
