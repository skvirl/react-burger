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

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgotPasswordSuccess } = useSelector((state) => ({
    forgotPasswordSuccess: state?.forgotPassword?.forgotPasswordSuccess,
  }));

  const [form, setValue] = useState({ email: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let submit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(fetchForgotPassword({ email: form.email }));
    },
    [form]
  );
  useEffect(() => {
    forgotPasswordSuccess && navigate("/reset-password",{state:{from: '/forgot-password' }});
  }, [forgotPasswordSuccess]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <p className="text text_type_main-default">Восстановление пароля</p>
        <EmailInput
          type={"text"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={form.email}
          name={"email"}
        />
        <Button htmlType="button" type="primary" size="medium" onClick={submit}>
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
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;
