import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
import { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../../../services/slices/auth";
import { cachedAuthData } from "../../../../utils/data";

import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage = () => {
  const [form, setValue] = useState({
    email: cachedAuthData.email,
    password: cachedAuthData.password,
  });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let fromPage = location?.state?.from?.pathname || "/";
  fromPage = (fromPage==='/profile/logout')?'/profile':fromPage;
  fromPage = (fromPage==='/order-details')?'/':fromPage;

  const { authenticated, authErrorMessage } = useSelector((state) => ({
    authenticated: Boolean(state?.auth?.user?.name),
    authErrorMessage: state?.auth?.errorMessage,
  }));
  
  useEffect(() => {
    authenticated && navigate(-1);
  }, []);

  useEffect(() => {
    authenticated && navigate(fromPage, { replace: true });
  }, [authenticated]);

  let submit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        fetchLogin({
          email: form.email,
          password: form.password,
        })
      );
     }
    ,
    [form]
  );

  return (
    <div className={styles.container}>
      {authErrorMessage ? (
        <div className="text text_type_main-default">{authErrorMessage}</div>
      ) : (
        <>
          <form className={styles.form}>
            <p className="text text_type_main-default">Вход</p>

            <EmailInput
              type={"text"}
              placeholder={"E-mail"}
              onChange={onChange}
              value={form.email}
              name={"email"}
            />
            <PasswordInput
              placeholder="Password"
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
              Войти
            </Button>
          </form>

          <div className="pt-10 text text_type_main-small text_color_inactive">
            Вы - новый пользователь?
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              onClick={(e) => navigate("/register")}
              extraClass="p-2"
            >
              Зарегистрироваться
            </Button>
          </div>
          <div className="  text text_type_main-small text_color_inactive">
            Забыли пароль?
            <Button
              htmlType="button"
              type="secondary"
              size="small"
              onClick={(e) => navigate("/forgot-password")}
              extraClass="p-2"
            >
              Восстановить пароль
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginPage;
