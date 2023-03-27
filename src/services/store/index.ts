import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '../slices/burgerIngredients';
import burgerConstructorReducer from '../slices/burgerConstructor';
import ingredientDetailsReducer from '../slices/ingredientDetails';
import orderDetailsReducer from '../slices/orderDetails';
import resetPasswordReducer from '../slices/resetPassword';
import forgotPasswordReducer from '../slices/forgotPassword';
import authReducer from '../slices/auth';
 
const store =  configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    auth: authReducer,
  },
});


export default store;