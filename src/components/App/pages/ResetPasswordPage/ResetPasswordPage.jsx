import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../../../../services/slices/resetPassword";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../../../hooks/useForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    location?.state?.from !== "/forgot-password" && navigate("/");
  }, []);

  const dispatch = useDispatch();
  const { resetPasswordSuccess, resetPasswordMessage, authenticated } =
    useSelector((state) => ({
      resetPasswordSuccess: state?.resetPassword?.resetPasswordSuccess,
      resetPasswordMessage: state?.resetPassword?.resetPasswordMessage,
      authenticated: Boolean(state?.auth?.user?.name),
    }));

  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  const { form, onChange } = useForm({ num: "", password: "" });

  let submit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        fetchResetPassword({
          password: form.password,
          token: form.num,
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
              value={form.password}
              name="password"
              onChange={onChange}
            />

            <Input
              type={"text"}
              placeholder={"Введите код из письма"}
              onChange={onChange}
              value={form.num}
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
