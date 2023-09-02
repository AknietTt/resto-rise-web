import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFoodAsync, createMenuAsync, deleteFoodAsync, getMenuAsunc, updateFoodAsync } from "../../Requests/menuRequests";

export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async function (restaurantId, { rejectWithValue, dispatch }) {
    try {
      let response = await getMenuAsunc(restaurantId);
      if (response?.status === 401) {
        response = await getMenuAsunc(restaurantId);
      }
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const updateFood = createAsyncThunk(
  "menu/updateFood",
  async function (food , { rejectWithValue, dispatch }){
    try {
      console.log(food);
      let response = await updateFoodAsync(food);
      if(response?.status === 401){
        response = await updateFoodAsync(food)
      }

      dispatch(update(food))
    } catch (error) {
      rejectWithValue(error)
    }
  }

)
export const createMenu = createAsyncThunk(
  "menu/addMenu",
  async function (foods, { rejectWithValue, dispatch }) {
    let response;
    try {
      response = await createMenuAsync(foods);
      if (response?.status === 401) {
        response = await createMenuAsync(foods);
      }

      dispatch(addMenu(response));
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const addFood = createAsyncThunk(
  "menu/addFood",
  async function (food , {rejectWithValue, dispatch}){
      try {
        let response = await  addFoodAsync(food)
        if(response?.status === 401 ){
          response = await addFoodAsync(food)
        }
        dispatch(createFood(food))
      } catch (error) {
        rejectWithValue(error)
      }
  }
)
export const deleteFood = createAsyncThunk(
  "menu/deleteFood",
  async function (foodId , {rejectWithValue , dispatch}){
    try {
      const response = await deleteFoodAsync(foodId)
      if(response?.status === 401 ){
        response = await deleteFoodAsync(foodId)
      }
      console.log(foodId);
     dispatch(remove(foodId))
      return response;
    } catch (error) {
      rejectWithValue(error)
    }
  }
)

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const initialState = {
  menu: [],
  status: "idle",
  error: null,
};
const menuSlice = createSlice({
  name: "manu",
  initialState,
  reducers: {
    addMenu(state, action) {
      state.menu = action.payload;
    },
    createFood(state , action) {
      state.menu.push(action.payload)
    },
    update(state , action){
      const updatedMenu = action.payload.food;

      const foodIndex = state.menu.findIndex(
        (menu) => menu.id === updatedMenu.id
      );

      if (foodIndex !== -1) {
        state.menu[foodIndex] = updatedMenu;
      }
    },
    remove(state, action) {
      console.log(action.payload.foodId);

      state.menu = state.menu.filter(
        (food) => food.id !== action.payload.foodId
      );
    }
  },
  extraReducers: {
    [fetchMenu.pending]: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    [fetchMenu.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.menu = action.payload;
    },
    [fetchMenu.rejected]: setError,
  },
});

const { addMenu,remove,createFood,update } = menuSlice.actions;

export default menuSlice.reducer