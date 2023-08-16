export async function refreshAccessToken() {

  let refreshToken =  localStorage.getItem('refresh_token');
  let access_token = localStorage.getItem('access_token');
  
  try {
    const response = await fetch(
      "https://localhost:7242/api/Account/refresh-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken: access_token,
          refreshToken: refreshToken,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.accessToken);
      return true;
    } else {
      console.error("Failed to refresh token.");
      return false;
    }
  } catch (error) {
    console.error("An error occurred while refreshing token.", error);
    return false;
  }
}
