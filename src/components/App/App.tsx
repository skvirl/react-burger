import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  BurgerConstructorPage,
  NotFound404Page,
  LoginPage,
  ProfilePage,
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  Layout,
  ProfileLayout,
  Logout,
  ProfileOrders,
  OrderFeed,
  OrderFeedDetails,
} from "../../pages";
import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import Modal from "../Modal/Modal";
import IngredientsDetails from "../Modal/IngredientDetails";
import OrderDetails from "../Modal/OrderDetails";
import { useEffect } from "react";
import { fetchBurgerIngredients } from "../../services/slices/burgerIngredients";
import { cleanOrderDetails } from "../../services/slices/orderDetails";
import { cleanConstructor } from "../../services/slices/burgerConstructor";
import { useAppDispatch } from "../../hooks/redux";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
  }, []);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<BurgerConstructorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={
              <ProtectedRoute anonymous>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute anonymous>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfilePage />} />
            <Route path="orders" element={<ProfileOrders />} />
            <Route path="logout" element={<Logout />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientsDetails />} />
          <Route path="/feed" element={<OrderFeed />} />
          <Route path="/feed/:id" element={<OrderFeedDetails />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                closeModal={() => {
                  navigate(-1);
                  // dispatch(cleanIngredientDetails());
                }}
              >
                <IngredientsDetails modalUse />
              </Modal>
            }
          />
          <Route
            path="/order-details"
            element={
              <ProtectedRoute>
                <Modal
                  closeModal={() => {
                    navigate(-1);
                    dispatch(cleanOrderDetails());
                    dispatch(cleanConstructor());
                  }}
                >
                  <OrderDetails modalUse />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}
