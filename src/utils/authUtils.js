export async function refreshAccessToken() {
  let refresh_token = getCookieValue("refresh_token");
  let access_token = getCookieValue("access_token");
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
          refreshToken: refresh_token,
        }),
      }
    );

    if (response.ok) {
    
      const data = await response.json();      
      setCookie("access_token", data.accessToken, 1);
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

export function getCookieValue(cookieName) {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return null;
}

export function setCookie(name, value, daysToExpire) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
  document.cookie = `${name}=${cookieValue}; path=/`;
}
