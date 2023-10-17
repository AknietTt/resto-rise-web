import { refreshAccessToken } from "../utils/authUtils";

export async function checkError(error) {
  if (error.response && error.response.status === 401) {
    const refreshTokenSuccess = await refreshAccessToken();
    if (refreshTokenSuccess) {
      return error.response;
    }
  }
  throw error;
}
