import axios from "axios";
import { host } from "../utils/constants";
import { getCookieValue } from "../utils/authUtils";
import { checkError } from "./constants";

export const createMenuAsync = async (menu) => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.post(
      host + `api/Menu/create`,
      {
        menu,
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

export const getMenuAsunc = async (restaurantId) => {
  let response;
  const accessToken = getCookieValue("access_token");
  try {
    response = await axios.get(host + `api/Menu/get/` + restaurantId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return checkError(error);
  }
};

export const deleteFoodAsync = async (foodId ) =>{
  let response ;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.delete(
      host+`api/Food/delete/`+foodId,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ) 
    return response.data; 
  } catch (error) {
    return checkError(error);
  }
}

export const addFoodAsync = async (food) =>{
  try {
    const accessToken = getCookieValue("access_token");
    let response = await axios.post(
      host+`api/Food/add`,
      {
        ...food
      },
      {
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
    )

    return response.data
  } catch (error) {
    return checkError(error);
  }
}

export const updateFoodAsync = async (food)=>{
  try {
    const accessToken = getCookieValue("access_token");
    let response  = await axios.put(
      host+`api/Food/update/`+food.id,
      {
        ...food
      },
      {
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    return checkError(error);
  }
}

