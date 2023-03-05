import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ResetPasswordPage.module.css";
 import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const RegisterPage = () => {
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
   
  const navigate = useNavigate();
 
  let login = useCallback(
    (e) => {
      e.preventDefault();
      console.log(form);
      //   auth.signIn(form);
    },
    [
      //auth,
      form,
    ]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <p className="text text_type_main-default">Восстановление пароля</p>
        <PasswordInput
          placeholder="Введите новый пароль"
          value={form.password}
          name="password"
          onChange={onChange}
        />
         <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={form.num}
          name={"email"}
         />
         <Button htmlType="button" type="primary" size="medium" onClick={login}>
          Сохранить
        </Button>


      </form>
      <div className="pt-10 text text_type_main-small text_color_inactive">
          Вспомнили пароль?
          <Button htmlType="button" type="secondary" size="small" onClick={e=>navigate('/login')} >
            Войти
          </Button>
        </div>
    </div>
  );
};

export default RegisterPage;
