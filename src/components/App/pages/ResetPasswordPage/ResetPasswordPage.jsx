import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../../../../services/slices/resetPassword";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetPasswordSuccess,resetPasswordMessage } = useSelector((state) => ({
    resetPasswordSuccess: state?.resetPassword?.resetPasswordSuccess,
    resetPasswordMessage: state?.resetPassword?.resetPasswordMessage,
  }));

  const [form, setValue] = useState({ num: "", password: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

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
    {resetPasswordSuccess ? <div className="text text_type_main-default">resetPasswordMessage</div> :  (<><form className={styles.form}>
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
        <Button htmlType="button" type="primary" size="medium" onClick={submit}>
          Сохранить
        </Button>
      </form>
      <div className="pt-10 text text_type_main-small text_color_inactive">
        Вспомнили пароль?
        <Button
          htmlType="button"
          type="secondary"
          size="small"
          extraClass="p-1"
          onClick={(e) => navigate("/login")}
        >
          Войти
        </Button>
      </div></>)}
    </div>
  );
};

export default RegisterPage;
