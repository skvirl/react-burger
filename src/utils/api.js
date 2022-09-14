


export const ingredientsApiUrl = "https://norma.nomoreparties.space/api/ingredients";
export const orderApiUrl = "https://norma.nomoreparties.space/api/orders";

export const getIngredientsData = async () => {
  const res = await fetch(ingredientsApiUrl);
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка ${res.status}`);
};

export const sendOrderData = async (ingredients) => {
  const res = await fetch(orderApiUrl,{
    method: 'POST', 
    body: JSON.stringify({ ingredients }), 
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }, 
  });
 
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Ошибка ${res.status}`);
};
