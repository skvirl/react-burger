import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./RegisterPage.module.css";
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
 
  let submit = useCallback(
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
        <p className="text text_type_main-default">Регистрация</p>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
 />
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
        <Button htmlType="button" type="primary" size="medium" onClick={submit}>
          Зарегистрироваться
        </Button>


      </form>
      <div className="pt-10 text text_type_main-small text_color_inactive">
          Ужу зарегистрированы?
          <Button htmlType="button" type="secondary" size="small" onClick={e=>navigate('/login')} >
            Нажми на меня
          </Button>
        </div>
    </div>
  );
};

export default RegisterPage;
