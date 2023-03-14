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
} from "../../pages";
import ProtectedRoute from "../../hoc/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import { cleanIngredientDetails } from "../../services/slices/ingredientDetails";
import Modal from "../Modal/Modal";
import IngredientsDetails from "../Modal/IngredientDetails";
import OrderDetails from "../Modal/OrderDetails";
import { useEffect } from "react";
import { fetchBurgerIngredients } from "../../services/slices/burgerIngredients";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  const handleModalClose = () => {
    navigate(-1);
    dispatch(cleanIngredientDetails());
  };

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
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="*" element={<NotFound404Page />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal closeModal={handleModalClose}>
                <IngredientsDetails modalUse />
              </Modal>
            }
          />
          <Route
            path="/order-details"
            element={
              <ProtectedRoute>
                <Modal closeModal={handleModalClose}>
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
