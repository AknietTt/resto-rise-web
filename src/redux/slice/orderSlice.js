import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    order: {},
    status: "idle",
    error: null,
  }; 
const orderSlice = createSlice({
    name:"order",
    initialState, 
    reducers:{}
})



export default orderSlice.reducer;