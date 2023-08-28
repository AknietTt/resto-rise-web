import axios from "axios";
import { host } from "../utils/constants";
import { getCookieValue, refreshAccessToken } from "../utils/authUtils";

export const registerUserAsync = async (user) => {
  let response;
  try {
    response = await axios.post(host + `api/Account/register-owner`, {
      ...user,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const loginUserAsync = async (user) => {
  let response;
  try {
    response = await axios.post(host + `api/Account/login`, { ...user });
    document.cookie = `access_token=${response.data.token}; path=/`;
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const userInfo = async () => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.get(host + `api/Account/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data
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
