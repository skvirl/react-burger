import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '../slices/burgerIngredients';
import burgerConstructorReducer from '../slices/burgerConstructor';
import ingredientDetailsReducer from '../slices/ingredientDetails';
import orderDetailsReducer from '../slices/orderDetails';
 
const store =  configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
  },
});


export default store;