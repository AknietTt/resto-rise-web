import axios from "axios";
import { host } from "../utils/constants";
import { getCookieValue, refreshAccessToken } from "../utils/authUtils";

export const getAllBranchesAsync = async (restaurantId) => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.get(
      host + `api/Branch/restaurant/${restaurantId}/branches`,
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

export const createBranchAsync = async (branch) => {
  const restaurantId = +branch.restaurantId;

  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.post(
      host + `api/Branch/create`,
      {
        ...branch,
        restaurantId,
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

export const deleteBranchAsync = async (branchId) => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.delete(host + `api/Branch/delete/` + branchId, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

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

export const updateBranchAsync = async (branch) => {
  let response;
  try {
    const accessToken = getCookieValue("access_token");
    response = await axios.put(
      host + `api/Branch/update/` + branch.id,
      {
        ...branch,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
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
