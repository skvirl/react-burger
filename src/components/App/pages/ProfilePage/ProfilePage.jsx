import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfilePage.module.css";
import {  useState,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfilePage = () => {
  const [form, setValue] = useState({ name: "", password: "", email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
      <form className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={form.name}
          name={"name"}
          icon={"EditIcon"}
        />

        <EmailInput
          type={"text"}
          placeholder={"Логин"}
          onChange={onChange}
          value={form.email}
          name={"email"}
          icon={"EditIcon"}
        />

        <PasswordInput
          placeholder={"Пароль"}
          value={form.password}
          name="password"
          onChange={onChange}
          icon={"EditIcon"}
        />
      </form>
  );
};

export default ProfilePage;
