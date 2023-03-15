import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister } from "../../services/slices/auth";
import { useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { cachedAuthData } from "../../utils/data";
import { useForm } from "../../hooks/useForm";
const RegisterPage = () => {
  const { form, onChange } = useForm(cachedAuthData);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authSuccess, authErrorMessage, authenticated } = useSelector(
    (state) => ({
      authSuccess: state?.auth?.success,
      authErrorMessage: state?.auth?.errorMessage,
      authenticated: Boolean(state?.auth?.user?.name),
    })
  );

  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  useEffect(() => {
    authSuccess && navigate("/");
  }, [authSuccess]);

  const submit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        fetchRegister({
          email: form.email,
          password: form.password,
          name: form.name,
        })
      );
    },
    [form]
  );

  return (
    <div className={styles.container}>
      {authErrorMessage ? (
        <div className="text text_type_main-default">{authErrorMessage}</div>
      ) : (
        <>
          <form className={styles.form}>
            <p className="text text_type_main-default">Регистрация</p>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              value={form.name}
              name={"name"}
            />

            <EmailInput
              type={"text"}
              placeholder={"E-mail"}
              onChange={onChange}
              value={form.email}
              name={"email"}
            />

            <PasswordInput
              placeholder={"Пароль"}
              value={form.password}
              name="password"
              onChange={onChange}
            />
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={submit}
            >
              Зарегистрироваться
            </Button>
          </form>
          <div className="pt-10 text text_type_main-small text_color_inactive">
            Ужу зарегистрированы?
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              onClick={(e) => navigate("/login")}
              extraClass="p-2"
            >
              Нажми на меня
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
