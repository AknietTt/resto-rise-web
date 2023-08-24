import axios from "axios";
import { getCookieValue, refreshAccessToken } from "../utils/authUtils";
import { host } from "../utils/constants";

export const getAllRestaurantsAsync = async (userId) => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.get(
      `${host}api/Restaurant/getAll?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        return error.response;
      }
    }
    throw error;
  }
};

export const RestaurantsDeleteAsync = async (restaurantId) => {
  const accessToken = getCookieValue("access_token");
  let response;
  try {
    response = await axios.delete(
      host + `api/Restaurant/delete?restaurantId=${restaurantId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        return error.response;
      }
    }
    throw error;
  }
};

export const createRestaurantAsync = async (restaurant) => {
  let response;
  const accessToken = getCookieValue("access_token");
  try {
    response = await axios.post(
      host + "api/Restaurant/add",
      {
        ...restaurant,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        return error.response;
      }
    }
    throw error;
  }
};

export const editRestaurantAsync = async (restaurant) => {
  let response;
  const accessToken = getCookieValue("access_token");
  try {
    response = await axios.put(
      host + "api/Restaurant/update/" + restaurant.id,
      {
        ...restaurant,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const refreshTokenSuccess = await refreshAccessToken();
      if (refreshTokenSuccess) {
        return error.response;
      }
    }
    throw error;
  }
};
