import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../slice/restaurantSlice";
import branchSlice from "../slice/branchSlice";
import authSlice from "../slice/authSlice";
import menuSlice from "../slice/menuSlice";

export const store = configureStore({
    reducer:{
        restaurants: restaurantSlice,
        branches: branchSlice,
        user: authSlice,
        menu: menuSlice
    }
})