import { configureStore } from '@reduxjs/toolkit';
import socketMiddleware from '../middleware/socketMiddleware';

import burgerIngredientsReducer from '../slices/burgerIngredients';
import burgerConstructorReducer from '../slices/burgerConstructor';
import orderDetailsReducer from '../slices/orderDetails';
import resetPasswordReducer from '../slices/resetPassword';
import forgotPasswordReducer from '../slices/forgotPassword';
import authReducer from '../slices/auth';
import orderFeedReducer   from '../slices/orderFeed'; 

const store =  configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    auth: authReducer,
    orderFeed: orderFeedReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all')),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;