const baseUrl = new URL("https://norma.nomoreparties.space/api/");

export const ingredientsApiUrl = new URL("ingredients", baseUrl);
export const orderApiUrl = new URL("orders", baseUrl);

export const forgotPasswordUrl = new URL("password-reset", baseUrl);
export const resetPasswordUrl = new URL("password-reset/reset", baseUrl);

const authUrl = new URL("auth", baseUrl);
export const registerUrl = new URL("register", authUrl);
export const loginUrl = new URL("login", authUrl);
export const logoutUrl = new URL("logout", authUrl);
export const tokenUrl = new URL("token", authUrl);
     



 export const getIngredientsData = async () => {
  const res = await fetch(ingredientsApiUrl);
  return checkResponse(res);
};

export const sendOrderData = async (ingredients) => {
  const res = await fetch(orderApiUrl, {
    method: "POST",
    body: JSON.stringify({ ingredients }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return checkResponse(res);
};

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
};


