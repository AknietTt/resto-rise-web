import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRestaurantsAsync ,RestaurantsDeleteAsync , createRestaurantAsync,editRestaurantAsync} from "../../Requests/restaurantRequests";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async function ({ userId }, { rejectWithValue }) {
    try {
      let response =  await getAllRestaurantsAsync(userId);
      if(response?.status === 401){
        return await getAllRestaurantsAsync(userId);
      }
      return response;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  "restaurant/createRestaurant",
  async function (restaurant, {rejectWithValue,dispatch}){
    try {
      let response = await createRestaurantAsync(restaurant)
      if(response?.status === 401){
        response = await createRestaurantAsync(restaurant);
      }
      dispatch(addRestaurant(restaurant))
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
)

export const deleteRestaurant = createAsyncThunk(
  "restaurant/deleteRestaurant" ,
  async function ({restaurantId},{rejectWithValue,dispatch}){
    try {
      let response = await RestaurantsDeleteAsync(restaurantId)
      if(response?.status === 401){
        response = await RestaurantsDeleteAsync(restaurantId)
      }
      dispatch(removeRestaurant({restaurantId}))
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRestaurant = createAsyncThunk(
  "restaurant/editRestaurants",
  async function (restaurant,{rejectWithValue, dispatch}){
    try {
      const response =  await editRestaurantAsync(restaurant)
      if(response?.status === 401){
       await  editRestaurantAsync(restaurant)
      }
      dispatch(editRestaurant(restaurant))
    } catch (error) {
      rejectWithValue(error)
    }
  }
)
const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    status: null,
    error: null,
  },
  reducers: {
    addRestaurant(state, action) {
      state.restaurants.push({
        name: action.payload.name,
        description: action.payload.description,
        image: action.payload.image,
      });
    },
    removeRestaurant(state, action) {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload.restaurantId);
    },
    editRestaurant(state, action) {
      const updatedRestaurant = action.payload.restaurant;

      const restaurantIndex = state.restaurants.findIndex(
        (restaurant) => restaurant.id === updatedRestaurant.id
      );
    
      if (restaurantIndex !== -1) {
        state.restaurants[restaurantIndex] = updatedRestaurant;
      }
    }
  },
  extraReducers: {
    [fetchRestaurants.pending]: (state, action) => {
      state.status = "pending";
      state.error = null;
    },
    [fetchRestaurants.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.restaurants = action.payload;
    },
    [fetchRestaurants.rejected]: setError,
  },
});

const { removeRestaurant,addRestaurant , editRestaurant} = restaurantSlice.actions;

export default restaurantSlice.reducer;
