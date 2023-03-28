import "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ProfilePage.module.css";
import { useEffect, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { fetchGetUser, fetchPatchUser } from "../../services/slices/auth";
import { getCookie } from "../../utils/cookies";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { storedName, storedEmail } = useAppSelector((state) => ({
    storedName: state?.auth?.user?.name,
    storedEmail: state?.auth?.user?.email,
  }));

  const [formModified, setFormModified] = useState(false);
  const { form, onChange, setFormValue } = useForm({
    name: storedName ? storedName : "",
    email: storedEmail ? storedEmail : "",
    password: "",
  });

  useEffect(() => {
    if (storedEmail) {
      dispatch(fetchGetUser({}));
    } else {
      setFormValue({
        name: storedName,
        email: storedEmail,
        password: "",
      });
    }
  }, [storedName]);

  useEffect(() => {
    setFormModified(
      form.name !== storedName ||
        form.email !== storedEmail ||
        form.password !== ""
    );
  }, [form]);

  const cancelChanges = () =>
    setFormValue({
      name: storedName ? storedName : "",
      email: storedEmail ? storedEmail : "",
      password: "",
    });

  const sendChanges = () => {
    dispatch(
      fetchPatchUser({
        userData: {
          name: String(form.name),
          email: String(form.email),
          password: String(form.password),
        },
        accessToken: getCookie("accessToken"),
      })
    );
  };

  return (
    <>
      <form className={styles.form} onSubmit={sendChanges}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={String(form.name)}
          name={"name"}
          icon={"EditIcon"}
        />

        <EmailInput
          placeholder={"Логин"}
          onChange={onChange}
          value={String(form.email)}
          name={"email"}
          isIcon={true}
        />

        <PasswordInput
          placeholder={"Пароль"}
          value={String(form.password)}
          name="password"
          onChange={onChange}
        />
        {formModified && (
          <div>
            <Button
              htmlType="submit"
              type="primary"
              size="small"
              extraClass="mt-5"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              type="primary"
              size="small"
              onClick={cancelChanges}
              extraClass="mt-5 ml-5"
            >
              Отменить
            </Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ProfilePage;
