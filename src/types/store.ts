import { TBurgerIngredientsSlice } from "../services/slices/burgerIngredients";
import { TBurgerConstructorSlice } from "../services/slices/burgerConstructor";
import { TOrderDetailsSlice } from "../services/slices/orderDetails";
import { TResetPassword } from "../services/slices/resetPassword";
import { TForgotPasswordSlice } from "../services/slices/forgotPassword";
import { TAuthSlice } from "../services/slices/auth";

type TStore = TBurgerIngredientsSlice &
  TBurgerConstructorSlice &
  TOrderDetailsSlice &
  TResetPassword &
  TForgotPasswordSlice &
  TAuthSlice;

export default TStore;
