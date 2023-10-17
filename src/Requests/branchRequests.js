import axios from "axios";
import { host } from "../utils/constants";
import { getCookieValue, refreshAccessToken } from "../utils/authUtils";
import { checkError } from "./constants";

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
    return checkError(error);
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
    return checkError(error);
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
    return checkError(error);
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
    return response.data;
  } catch (error) {
    return checkError(error);
  }
};
