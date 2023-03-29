import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { useCallback, FormEventHandler, useEffect } from "react";
import { fetchResetPassword } from "../../services/slices/resetPassword";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RootState } from "../../services/store";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    location?.state?.from !== "/forgot-password" && navigate("/");
  }, []);

  const dispatch = useAppDispatch();

  const getStoreData = (state: RootState) => ({
    resetPasswordSuccess: state?.resetPassword?.resetPasswordSuccess,
    resetPasswordMessage: state?.resetPassword?.resetPasswordMessage,
    authenticated: Boolean(state?.auth?.user?.name),
  });
  const { resetPasswordSuccess, resetPasswordMessage, authenticated } =
    useAppSelector(getStoreData);

  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  const { form, onChange } = useForm({ num: "", password: "" });

  const submit: FormEventHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(
        fetchResetPassword({
          password: String(form.password),
          token: String(form.num),
        })
      );
    },
    [form]
  );

  return (
    <div className={styles.container}>
      {resetPasswordSuccess ? (
        <div className="text text_type_main-default">
          {resetPasswordMessage}
        </div>
      ) : (
        <>
          <form className={styles.form} onSubmit={submit}>
            <p className="text text_type_main-default">Восстановление пароля</p>
            <PasswordInput
              placeholder={"Введите новый пароль"}
              value={String(form.password)}
              name="password"
              onChange={onChange}
            />

            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={onChange}
              value={String(form.num)}
              name={"num"}
            />
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </form>
          <div className="pt-10 text text_type_main-small text_color_inactive">
            Вспомнили пароль?
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              extraClass="p-2"
              onClick={(e) => navigate("/login")}
            >
              Войти
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
