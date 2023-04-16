import { configureStore , ActionCreatorWithPayload} from '@reduxjs/toolkit';
import createSocketMiddleware from '../middleware/socketMiddleware';
import {connect, disconnect,wsMessage,wsClose } from "../actions/orderFeed";


import burgerIngredientsReducer from '../slices/burgerIngredients';
import burgerConstructorReducer from '../slices/burgerConstructor';
import orderDetailsReducer from '../slices/orderDetails';
import resetPasswordReducer from '../slices/resetPassword';
import forgotPasswordReducer from '../slices/forgotPassword';
import authReducer from '../slices/auth';
import { orderFeedReducer } from '../reducers/orderFeed'; 
 
const store = configureStore({
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
    getDefaultMiddleware().concat(createSocketMiddleware({connect, disconnect,wsMessage,wsClose })),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;