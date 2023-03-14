import { setCookie, getCookie } from "./cookies";

export const baseUrl = new URL("https://norma.nomoreparties.space/api/");

export const ingredientsApiUrl = new URL("ingredients", baseUrl);
export const orderApiUrl = new URL("orders", baseUrl);

export const forgotPasswordUrl = new URL("password-reset", baseUrl);
export const resetPasswordUrl = new URL("password-reset/reset", baseUrl);

export const registerUrl = new URL("auth/register", baseUrl);
export const loginUrl = new URL("auth/login", baseUrl);
export const logoutUrl = new URL("auth/logout", baseUrl);
export const tokenUrl = new URL("auth/token", baseUrl);
export const userUrl = new URL("auth/user", baseUrl);

export const request = (endpoint, options) => {
  return fetch(endpoint, options).then(checkResponse).then(checkSuccess);
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

export const tryToRefreshToken = async (errMessage) => {
  const jwtExpiredMes = "jwt expired";
  const refreshToken = getCookie("refreshToken");

  if (errMessage !== jwtExpiredMes || !refreshToken) return false;

  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      body: JSON.stringify({
        token: refreshToken,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (res.ok) {
      const { success, accessToken, refreshToken } = await res.json();
      if (success) {
        accessToken &&
          setCookie("accessToken", accessToken.split("Bearer ")[1]);
        refreshToken && setCookie("refreshToken", refreshToken);
      }
      return true;
    }

    const resBody = await res.json();
    throw new Error(`Server Error: ${res.status}. ${resBody?.message} `);
  } catch (error) {
    return false;
  }
};

export const requestWithTokenRefresh = (endpoint, options) => {
  return fetch(endpoint, options)
    .then(checkResponseAuth)
    .then(checkSuccessAuth);
};

export const checkResponseAuth = (res) => {
  if (!res.ok && res.status === 403) {
    try {
      return res.json();
    } catch (error) {
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    }
  } else if (res.ok) {

    return res.json();
  }

  return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
};

const checkSuccessAuth = (res) => {
  if (res && res.success) {

    return res;
  } else if (res && !res.success && tryToRefreshToken(res.message)) {

    return Promise.reject(`token refresh succes`);
  }

  return Promise.reject(`Ответ не success: ${res}`);
};
