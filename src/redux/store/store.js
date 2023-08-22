import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "../slice/restaurantSlice";

export const store = configureStore({
    reducer:{
        restaurants: restaurantSlice,
    }
})