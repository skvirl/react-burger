import { configureStore } from '@reduxjs/toolkit';
import burgerIngredientsReducer from '../slices/burgerIngredients';
import burgerConstructorReducer from '../slices/burgerConstructor';
import orderDetailsReducer from '../slices/orderDetails';
import resetPasswordReducer from '../slices/resetPassword';
import forgotPasswordReducer from '../slices/forgotPassword';
import authReducer from '../slices/auth';
 
const store =  configureStore({
  reducer: {
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    resetPassword: resetPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;