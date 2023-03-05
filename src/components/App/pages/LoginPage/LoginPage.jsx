import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./LoginPage.module.css";
 import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const LoginPage = () => {
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
        <p className="text text_type_main-default">Вход</p>

        <Input
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
        <Button htmlType="button" type="primary" size="medium" onClick={login}>
        Войти
        </Button>

      </form>

      <div className="pt-10 text text_type_main-small text_color_inactive">
          Вы новый пользователь?
          <Button htmlType="button" type="secondary" size="small" onClick={e=>navigate('/register')} >
            Зарегистрироваться
          </Button>
        </div>
        <div className="  text text_type_main-small text_color_inactive">
          Забыли пароль?
          <Button htmlType="button" type="secondary" size="small" onClick={e=>navigate('/forgot-password')} >
            Восстановить пароль
          </Button>
        </div>

    </div>
  );
};

export default LoginPage;