import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  BurgerConstructorPage,
  NotFound404Page,
  LoginPage,
  ProfilePage,
  IngredientsPage,
  ForgotPasswordPage,
  RegisterPage,
  ResetPasswordPage,
  Layout,
} from "./pages";

export default function App() {
  const router = (
    <Route path="/" element={<Layout />} errorElement={<NotFound404Page />}>
      <Route index element={<BurgerConstructorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/ingredients/:id" element={<IngredientsPage />} />
      <Route path="*" element={<NotFound404Page />} />
     </Route>
  );

  return (
    <RouterProvider
      router={createBrowserRouter(createRoutesFromElements(router))}
    />
  );
}
