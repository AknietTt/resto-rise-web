import axios from "axios";
import { getCookieValue } from "../utils/authUtils";
import { host } from "../utils/constants";
import { checkError } from "./constants";

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
    return checkError(error);
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
    return checkError(error);
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
    return checkError(error);
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
    return checkError(error);
  }
};
