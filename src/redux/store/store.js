import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../slice/restaurantSlice";
import branchSlice from "../slice/branchSlice";
import authSlice from "../slice/authSlice";
import menuSlice from "../slice/menuSlice";
import orderSlice from "../slice/orderSlice";

export const store = configureStore({
    reducer:{
        restaurants: restaurantSlice,
        branches: branchSlice,
        user: authSlice,
        menu: menuSlice,
        order:orderSlice
    }
})