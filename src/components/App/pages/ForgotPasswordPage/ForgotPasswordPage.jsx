import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ForgotPasswordPage.module.css";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchForgotPassword } from "../../../../services/slices/forgotPassword";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../../../hooks/useForm";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgotPasswordSuccess, authenticated } = useSelector((state) => ({
    forgotPasswordSuccess: state?.forgotPassword?.forgotPasswordSuccess,
    authenticated: Boolean(state?.auth?.user?.name),
  }));

  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  const { form, onChange } = useForm({ email: "" });

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchForgotPassword({ email: form.email }));
    },
    [form]
  );
  useEffect(() => {
    forgotPasswordSuccess &&
      navigate("/reset-password", { state: { from: "/forgot-password" } });
  }, [forgotPasswordSuccess]);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <p className="text text_type_main-default">Восстановление пароля</p>
        <EmailInput
          type={"text"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={form.email}
          name={"email"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <div className="pt-10 text text_type_main-small text_color_inactive">
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="small"
          onClick={(e) => navigate("/login")}
          extraClass="p-2"
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
