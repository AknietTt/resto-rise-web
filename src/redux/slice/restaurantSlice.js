import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRestaurantsAsync ,RestaurantsDeleteAsync , createRestaurantAsync} from "../../Requests/restaurantRequests";

export const fetchRestaurants = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async function ({ userId }, { rejectWithValue }) {
    try {
      return await getAllRestaurantsAsync(userId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createRestaurant = createAsyncThunk(
  "restaurant/createRestaurant",
  async function (restaurant, {rejectWithValue,dispatch}){
    try {
      console.log(restaurant);
      dispatch(addRestaurant(restaurant))
      createRestaurantAsync(restaurant)
    } catch (error) {
      return rejectWithValue(error.message);
    } 
  }
)

export const deleteRestaurant = createAsyncThunk(
  "restaurant/deleteRestaurant" ,
  async function ({restaurantId},{rejectWithValue,dispatch}){
    try {
      console.log(restaurantId);
      RestaurantsDeleteAsync(restaurantId)
      dispatch(removeRestaurant({restaurantId}))
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    getRestaurants(state, action) {},
    editRestaurants(state, action) {},
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

const { removeRestaurant,addRestaurant} = restaurantSlice.actions;

export default restaurantSlice.reducer;
